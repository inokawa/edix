import type { StoryObj } from "@storybook/react-vite";
import React, {
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import * as v from "valibot";
import {
  ClearHistory,
  createEditor,
  Delete,
  getNodeSize,
  type InferVoidNode,
  InsertNode,
  InsertText,
  keymapPlugin,
  plainTransferPlugin,
  ReplaceDoc,
  selectionRectPlugin,
  sliceText,
} from "../../src";

export default {
  component: createEditor,
};

const promptSchema = v.strictObject({
  children: v.array(
    v.strictObject({
      children: v.array(
        v.union([
          v.strictObject({ text: v.string() }),
          v.strictObject({
            type: v.picklist(["mention", "command"]),
            name: v.string(),
          }),
        ]),
      ),
    }),
  ),
});
type PromptDoc = v.InferOutput<typeof promptSchema>;
type PromptToken = InferVoidNode<PromptDoc>;

const TRIGGERS: Record<string, { type: PromptToken["type"]; items: string[] }> =
  {
    "@": {
      type: "mention",
      items: [
        "README.md",
        "package.json",
        "src/editor.ts",
        "src/commands.ts",
        "docs/API.md",
      ],
    },
    "/": {
      type: "command",
      items: ["summarize", "review", "translate", "explain", "fix"],
    },
  };
const PREFIX: Record<PromptToken["type"], string> = {
  mention: "@",
  command: "/",
};
const TRIGGER_REG = /(?:^|\s)([@/])([\w.-]*)$/;
const MAX_LIST_LENGTH = 6;

const Token = ({ type, name }: PromptToken) => (
  <span
    contentEditable={false}
    style={{
      borderRadius: "3px",
      ...(type === "mention"
        ? { background: "#EAF5F9", color: "#4276AA" }
        : { background: "#F3EEFB", color: "#7A55B8" }),
    }}
  >
    {PREFIX[type]}
    {name}
  </span>
);

const FileChips = ({
  files,
  onRemove,
}: {
  files: File[];
  onRemove?: (index: number) => void;
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
    {files.map((file, i) => (
      <span
        key={i}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 12,
          backgroundColor: "whitesmoke",
          border: "solid 1px lightgray",
          borderRadius: 4,
          padding: "2px 6px",
        }}
      >
        📄 {file.name}
        {onRemove && (
          <button
            style={{ border: "none", background: "none", padding: 0 }}
            onClick={() => {
              onRemove(i);
            }}
          >
            ✕
          </button>
        )}
      </span>
    ))}
  </div>
);

const Menu = ({
  items,
  selectedIndex,
  top,
  left,
  complete,
}: {
  items: string[];
  selectedIndex: number;
  top: number;
  left: number;
  complete: (index: number) => void;
}) => (
  <div
    style={{
      position: "fixed",
      top: top,
      left: left,
      minWidth: 160,
      fontSize: "12px",
      border: "solid 1px lightgray",
      borderRadius: "3px",
      background: "white",
      cursor: "pointer",
    }}
  >
    {items.map((c, i) => (
      <div
        key={c}
        style={{
          padding: "4px 8px",
          ...(selectedIndex === i && {
            color: "white",
            background: "#2A6AD3",
          }),
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          complete(i);
        }}
      >
        {c}
      </div>
    ))}
  </div>
);

const FLAT_BUTTON_STYLE: React.CSSProperties = {
  font: "12px sans-serif",
  padding: "3px 8px",
  borderRadius: 6,
  border: "solid 1px lightgray",
  backgroundColor: "white",
  color: "dimgray",
  cursor: "pointer",
};

export const PromptBox: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [doc, setDoc] = useState<PromptDoc>({
      children: [
        {
          children: [
            { text: "Ask about " },
            { type: "mention", name: "src/editor.ts" },
            { text: " — type @ or / to see suggestions." },
          ],
        },
        {
          children: [
            {
              text: "Drop or paste files anywhere on the box. Enter to send, Shift+Enter for a new line.",
            },
          ],
        },
      ],
    });
    const [focused, setFocused] = useState(false);
    const [files, setFiles] = useState<File[]>([new File([], "dummy.txt")]);
    const [messages, setMessages] = useState<
      { doc: PromptDoc; files: File[] }[]
    >([]);
    const [pos, setPos] = useState<{
      top: number;
      left: number;
      caret: number;
    } | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const match = pos && sliceText(doc, 0, pos.caret).match(TRIGGER_REG);
    const trigger = match ? TRIGGERS[match[1]!] : null;
    const query = match?.[2] ?? "";
    const filtered = (trigger?.items ?? [])
      .filter((c) => c.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, MAX_LIST_LENGTH);

    const complete = (i: number) => {
      const selected = filtered[i];
      if (!pos || !trigger || !selected) return;
      const start = pos.caret - query.length - 1;
      editor
        .exec(Delete, [start, pos.caret])
        .exec(InsertNode, { type: trigger.type, name: selected }, start)
        .exec(InsertText, " ");
      setPos(null);
      setSelectedIndex(0);
    };

    const addFiles = (list: FileList | null): boolean => {
      const added = [...(list ?? [])];
      if (added.length) {
        setFiles((prev) => [...prev, ...added]);
      }
      return added.length > 0;
    };

    const sendDisabled = !getNodeSize(doc) && !files.length;

    const submit = () => {
      if (sendDisabled) return;
      // Read the doc before clearing it, because the updater below may run after ReplaceDoc
      const sent = editor.doc;
      setMessages((prev) => [...prev, { doc: sent, files }]);
      setFiles([]);
      editor.exec(ReplaceDoc, [{ children: [{ text: "" }] }]);
      editor.selection = [0, 0];
      editor.exec(ClearHistory);
    };

    const onUp = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setSelectedIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    });
    const onDown = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setSelectedIndex((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1));
    });
    const onEnter = useEffectEvent(() => {
      if (pos && filtered.length) {
        complete(selectedIndex);
      } else {
        // Enter submits. Shift+Enter inserts a new line by the browser.
        submit();
      }
    });
    const onClose = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setPos(null);
      setSelectedIndex(0);
    });

    const editor = useMemo(() => {
      const e = createEditor({
        doc,
        schema: promptSchema,
      })
        .exec((editor) => {
          // Consume pasted / dropped files so that they are not inserted into the document. The box handles them instead.
          editor.hook("paste", (dataTransfer) =>
            dataTransfer.files.length ? true : null,
          );
        })
        .exec(plainTransferPlugin, {
          voidToString: (n) => PREFIX[n.type] + n.name,
        })
        .exec(keymapPlugin, {
          ArrowUp: onUp,
          ArrowDown: onDown,
          Enter: onEnter,
          Escape: onClose,
        })
        .exec(selectionRectPlugin, (getRect) => {
          const selectionStart = Math.min(...e.selection);
          if (TRIGGER_REG.test(sliceText(e.doc, 0, selectionStart))) {
            const r = getRect();
            setPos({
              top: r.top + r.height,
              left: r.left,
              caret: selectionStart,
            });
          } else {
            setPos(null);
          }
          setSelectedIndex(0);
        });
      e.on("change", () => {
        setDoc(e.doc);
      });
      return e;
    }, []);

    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);

    const chatRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
    }, [messages]);

    return (
      <div style={{ maxWidth: 480 }}>
        <div
          ref={chatRef}
          style={{
            height: 200,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "#F7F7F8",
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
          }}
        >
          {/* Stick messages to the bottom */}
          <div style={{ marginTop: "auto" }} />
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  maxWidth: "85%",
                  backgroundColor: "white",
                  border: "solid 1px #E3E3E3",
                  borderRadius: 12,
                  padding: "8px 12px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
                }}
              >
                {m.files.length > 0 && <FileChips files={m.files} />}
                <div>
                  {m.doc.children.map((r, j) => (
                    <div key={j} style={{ minHeight: "1em" }}>
                      {r.children.map((n, k) =>
                        "text" in n ? n.text : <Token key={k} {...n} />,
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onDragOver={(e) => {
            // Allow dropping files anywhere on the box, not only on the editor
            if (e.dataTransfer.types.includes("Files")) {
              e.preventDefault();
            }
          }}
          onDrop={(e) => {
            if (addFiles(e.dataTransfer.files)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            // Files pasted on the editor bubble here, consumed by the paste hook above
            addFiles(e.clipboardData.files);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "white",
            border: `solid 1px ${focused ? "#2A6AD3" : "darkgray"}`,
            boxShadow: focused ? "0 0 0 1px #2A6AD3" : undefined,
            borderRadius: 8,
            padding: 8,
          }}
        >
          {files.length > 0 && (
            <FileChips
              files={files}
              onRemove={(i) => {
                setFiles((prev) => prev.filter((_, j) => j !== i));
              }}
            />
          )}
          <div
            ref={ref}
            style={{
              padding: 4,
              minHeight: 40,
              maxHeight: 100,
              overflowY: "auto",
              outline: "none",
            }}
          >
            {doc.children.map((r, i) => (
              <div key={i}>
                {r.children.map((n, j) =>
                  "text" in n ? (
                    n.text || <br key={j} />
                  ) : (
                    <Token key={j} {...n} />
                  ),
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: "0 -8px -8px",
              padding: "6px 8px",
              borderTop: "solid 1px #EDEDED",
            }}
          >
            <label style={FLAT_BUTTON_STYLE}>
              +
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => {
                  addFiles(e.currentTarget.files);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            <button
              disabled={sendDisabled}
              onClick={submit}
              style={{
                ...FLAT_BUTTON_STYLE,
                marginLeft: "auto",
                border: "none",
                backgroundColor: sendDisabled ? "lightgray" : "#111",
                color: "white",
              }}
            >
              ↑
            </button>
          </div>
        </div>
        {pos &&
          filtered.length > 0 &&
          createPortal(
            <Menu
              top={pos.top}
              left={pos.left}
              items={filtered}
              selectedIndex={selectedIndex}
              complete={complete}
            />,
            document.body,
          )}
      </div>
    );
  },
};
