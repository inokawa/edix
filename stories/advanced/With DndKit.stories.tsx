import React, { useEffect, useMemo, useRef, useState } from "react";
import type { StoryObj } from "@storybook/react-vite";
import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
  useDragDropMonitor,
  useDragOperation,
} from "@dnd-kit/react";
import { arrayMove } from "@dnd-kit/helpers";
import * as v from "valibot";
import {
  createEditor,
  internalTransferPlugin,
  plainTransferPlugin,
  ReplaceDoc,
} from "../../src";

export default {
  component: createEditor,
};

const dndSchema = v.strictObject({
  children: v.array(
    v.strictObject({
      type: v.optional(v.literal("heading")),
      children: v.array(v.strictObject({ text: v.string() })),
    }),
  ),
});
type Doc = v.InferOutput<typeof dndSchema>;
type Block = Doc["children"][number];

type DndData = { index: number; position?: "above" | "below" };

const textStyle = {
  fontSize: 16,
  lineHeight: 1.5,
  color: "#37352f",
};

const BlockView = ({
  block,
  dimmed,
  onMouseEnter,
}: {
  block: Block;
  dimmed?: boolean;
  onMouseEnter?: () => void;
}) => (
  <div
    onMouseEnter={onMouseEnter}
    style={{
      padding: "3px 2px",
      ...(block.type === "heading" && {
        fontSize: 30,
        fontWeight: 600,
        padding: "12px 2px 3px",
      }),
      ...(dimmed && { opacity: 0.35 }),
    }}
  >
    {block.children.map((n, j) => (
      <span key={j}>{n.text || <br />}</span>
    ))}
  </div>
);

const DropRow = ({ index }: { index: number }) => {
  const above = useDroppable<DndData>({
    id: `drop-${index}-above`,
    data: { index, position: "above" },
  });
  const below = useDroppable<DndData>({
    id: `drop-${index}-below`,
    data: { index, position: "below" },
  });

  return (
    <div
      style={{
        gridColumn: 2,
        gridRow: index + 1,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <div ref={above.ref} style={{ position: "absolute", inset: "0 0 50%" }} />
      <div ref={below.ref} style={{ position: "absolute", inset: "50% 0 0" }} />
      {(above.isDropTarget || below.isDropTarget) && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 3,
            borderRadius: 2,
            background: "rgba(35, 131, 226, 0.5)",
            ...(above.isDropTarget ? { top: -2 } : { bottom: -2 }),
          }}
        />
      )}
    </div>
  );
};

const BlockEditor = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [doc, setDoc] = useState<Doc>({
    children: [
      { type: "heading", children: [{ text: "Drag blocks to reorder" }] },
      {
        children: [
          {
            text: "Hover a block and drag the ⠿ handle on the left to move it.",
          },
        ],
      },
      { children: [{ text: "A short paragraph." }] },
      {
        children: [
          {
            text: "A longer paragraph that wraps across multiple lines, so you can see that the drag handle and the drop indicator follow the actual height of each block.",
          },
        ],
      },
      { children: [{ text: "The editor stays fully editable." }] },
    ],
  });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const editor = useMemo(() => {
    const e = createEditor({
      doc: doc,
      schema: dndSchema,
    })
      .exec(internalTransferPlugin)
      .exec(plainTransferPlugin);
    e.on("change", () => {
      setDoc(e.doc);
    });
    return e;
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    return editor.input(ref.current);
  }, []);

  const { source } = useDragOperation<DndData>();
  const activeIndex = source?.data.index ?? null;

  const { handleRef } = useDraggable<DndData>({
    id: "block",
    data: { index: hoverIndex ?? -1 },
    // measured only (DragOverlay mode never mutates the source element);
    // sizes the overlay to the hovered block
    element: hoverIndex != null ? ref.current?.children[hoverIndex] : undefined,
  });

  useDragDropMonitor<DndData>({
    onDragEnd: (event) => {
      const { source, target } = event.operation;
      if (event.canceled || !source || !target) return;
      const from = source.data.index;
      const insert =
        target.data.position === "above"
          ? target.data.index
          : target.data.index + 1;
      // arrayMove is a no-op when the drop position equals the current one
      const to = insert > from ? insert - 1 : insert;
      editor.exec(ReplaceDoc, arrayMove(editor.doc.children, from, to));
    },
  });

  return (
    <>
      <div
        onMouseLeave={() => {
          if (!source) setHoverIndex(null);
        }}
        style={{
          ...textStyle,
          display: "grid",
          gridTemplateColumns: "24px 1fr",
          maxWidth: 700,
          margin: "0 auto",
          padding: 24,
          background: "white",
        }}
      >
        {hoverIndex != null && (
          <button
            ref={handleRef}
            style={{
              gridColumn: 1,
              gridRow: hoverIndex + 1,
              alignSelf: "center",
              width: 20,
              height: 26,
              padding: 0,
              fontSize: 16,
              color: "rgba(55, 53, 47, 0.45)",
              background: "transparent",
              border: "none",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              // keep the caret in the editor
              e.preventDefault();
            }}
          >
            ⠿
          </button>
        )}
        <div
          ref={ref}
          style={{
            gridColumn: 2,
            gridRow: `1 / span ${doc.children.length}`,
            display: "grid",
            gridTemplateRows: "subgrid",
            outline: "none",
          }}
        >
          {doc.children.map((b, i) => (
            <BlockView
              key={i}
              block={b}
              dimmed={i === activeIndex}
              onMouseEnter={() => {
                if (!source) setHoverIndex(i);
              }}
            />
          ))}
        </div>
        {doc.children.map((_, i) => (
          <DropRow key={i} index={i} />
        ))}
      </div>
      <DragOverlay
        dropAnimation={null}
        // rendered in a portal, so it doesn't inherit the container's font
        style={{ ...textStyle, opacity: 0.85, background: "white" }}
      >
        {activeIndex != null && doc.children[activeIndex] && (
          <BlockView block={doc.children[activeIndex]} />
        )}
      </DragOverlay>
    </>
  );
};

export const WithDndKit: StoryObj = {
  render: () => (
    <DragDropProvider>
      <BlockEditor />
    </DragDropProvider>
  ),
};
