import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { StoryObj } from "@storybook/react-vite";
import {
  createEditor,
  htmlPaste,
  htmlCopy,
  plainCopy,
  plainPaste,
  ToggleFormat,
  singlelinePlugin,
  internalCopy,
  internalPaste,
  nodeId,
} from "../../src";
import * as v from "valibot";

export default {
  component: createEditor,
};

const basicSchema = v.array(
  v.array(
    v.strictObject({
      text: v.string(),
    }),
  ),
);

export const Basic: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof basicSchema>;
    const [doc, setDoc] = useState<Doc>([
      [{ text: "Hello world." }],
      [{ text: "こんにちは。" }],
      [{ text: "👍❤️🧑‍🧑‍🧒" }],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: basicSchema,
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [
          internalPaste(),
          htmlPaste<Doc>((text) => ({ text })),
          plainPaste(),
        ],
        onChange: setDoc,
      }).input(ref.current);
    }, []);

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          border: "solid 1px darkgray",
          padding: 8,
        }}
      >
        {doc.map((r) => (
          <div key={nodeId(r)}>
            {r.map((n) => (
              <span key={nodeId(n)}>{n.text || <br />}</span>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

const richTextSchema = v.strictObject({
  text: v.string(),
  bold: v.optional(v.boolean()),
  italic: v.optional(v.boolean()),
  underline: v.optional(v.boolean()),
  strike: v.optional(v.boolean()),
});

const richSchema = v.array(v.array(richTextSchema));

const Text = ({ node }: { node: v.InferOutput<typeof richTextSchema> }) => {
  const Element = node.bold ? "strong" : "span";
  const style: CSSProperties = {};
  if (node.italic) {
    style.fontStyle = "italic";
  }
  if (node.underline) {
    style.textDecoration = "underline";
  }
  if (node.strike) {
    style.textDecoration = style.textDecoration
      ? `${style.textDecoration} line-through`
      : "line-through";
  }
  return <Element style={style}>{node.text || <br />}</Element>;
};

export const RichText: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof richSchema>;
    const [doc, setDoc] = useState<Doc>([
      [
        { text: "Hello", bold: true },
        { text: " " },
        { text: "World", italic: true },
        { text: "." },
      ],
      [{ text: "こんにちは。" }],
      [{ text: "👍❤️🧑‍🧑‍🧒" }],
    ]);

    const editor = useMemo(
      () =>
        createEditor({
          doc: doc,
          schema: richSchema,
          copy: [internalCopy(), plainCopy()],
          paste: [internalPaste(), plainPaste()],
          onChange: setDoc,
        }),
      [],
    );

    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);

    return (
      <div>
        <div>
          <button
            onClick={() => {
              editor.apply(ToggleFormat, "bold");
            }}
          >
            bold
          </button>
          <button
            onClick={() => {
              editor.apply(ToggleFormat, "italic");
            }}
          >
            italic
          </button>
          <button
            onClick={() => {
              editor.apply(ToggleFormat, "underline");
            }}
          >
            underline
          </button>
          <button
            onClick={() => {
              editor.apply(ToggleFormat, "strike");
            }}
          >
            strike
          </button>
        </div>
        <div
          ref={ref}
          style={{
            backgroundColor: "white",
            border: "solid 1px darkgray",
            padding: 8,
          }}
        >
          {doc.map((r) => (
            <div key={nodeId(r)}>
              {r.map((n) => (
                <Text key={nodeId(n)} node={n} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

const tagSchema = v.array(
  v.array(
    v.union([
      v.strictObject({
        type: v.literal("text"),
        text: v.string(),
      }),
      v.strictObject({
        type: v.literal("tag"),
        label: v.string(),
        value: v.string(),
      }),
    ]),
  ),
);

export const Tag: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof tagSchema>;
    const [doc, setDoc] = useState<Doc>([
      [
        { type: "text", text: "Hello " },
        { type: "tag", label: "Apple", value: "1" },
        { type: "text", text: " world " },
        { type: "tag", label: "Orange", value: "2" },
      ],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: tagSchema,
        plugins: [singlelinePlugin()],
        copy: [
          internalCopy(),
          plainCopy<Doc>((node) => ("text" in node ? node.text : node.label)),
        ],
        paste: [internalPaste(), plainPaste()],
        onChange: setDoc,
      }).input(ref.current);
    }, []);

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          padding: 8,
        }}
      >
        {doc[0].map((t) =>
          t.type === "tag" ? (
            <span
              key={nodeId(t)}
              contentEditable={false}
              data-tag-value={t.value}
              style={{
                background: "slategray",
                color: "white",
                fontSize: 12,
                padding: 4,
                borderRadius: 8,
              }}
            >
              {t.label}
            </span>
          ) : (
            <span key={nodeId(t)}>{t.text || <br />}</span>
          ),
        )}
      </div>
    );
  },
};

const imageSchema = v.array(
  v.array(
    v.union([
      v.strictObject({
        type: v.literal("text"),
        text: v.string(),
      }),
      v.strictObject({
        type: v.literal("image"),
        src: v.string(),
      }),
    ]),
  ),
);

export const Image: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof imageSchema>;
    const [doc, setDoc] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "image",
          src: "https://loremflickr.com/320/240/cats?lock=1",
        },
        {
          type: "text",
          text: " world ",
        },
        {
          type: "image",
          src: "https://loremflickr.com/320/240/cats?lock=2",
        },
      ],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: imageSchema,
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [
          internalPaste(),
          htmlPaste<Doc>(
            (text) => ({ type: "text", text }),
            [
              (e) => {
                if (e.tagName === "IMG") {
                  return {
                    type: "image",
                    src: (e as HTMLImageElement).src,
                  };
                }
              },
            ],
          ),
          plainPaste(),
        ],
        onChange: setDoc,
      }).input(ref.current);
    }, []);

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          padding: 8,
        }}
      >
        {doc.map((r) => (
          <div key={nodeId(r)}>
            {r.map((t) =>
              t.type === "image" ? (
                <img key={nodeId(t)} src={t.src} style={{ maxWidth: 200 }} />
              ) : (
                <span key={nodeId(t)}>{t.text || <br />}</span>
              ),
            )}
          </div>
        ))}
      </div>
    );
  },
};

const videoSchema = v.array(
  v.array(
    v.union([
      v.strictObject({
        type: v.literal("text"),
        text: v.string(),
      }),
      v.strictObject({
        type: v.literal("video"),
        src: v.string(),
      }),
    ]),
  ),
);

export const Video: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof videoSchema>;
    const [doc, setDoc] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "video",
          src: "https://download.samplelib.com/mp4/sample-5s.mp4",
        },
        {
          type: "text",
          text: " world ",
        },
      ],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: videoSchema,
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [
          internalPaste(),
          htmlPaste<Doc>(
            (text) => ({ type: "text", text }),
            [
              (e) => {
                if (e.tagName === "VIDEO") {
                  return {
                    type: "video",
                    src: (e.childNodes[0] as HTMLSourceElement).src,
                  };
                }
              },
            ],
          ),
          plainPaste(),
        ],
        onChange: setDoc,
      }).input(ref.current);
    }, []);

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          padding: 8,
        }}
      >
        {doc.map((r) => (
          <div key={nodeId(r)}>
            {r.map((t) =>
              t.type === "video" ? (
                // safari needs contentEditable="false"
                <video
                  key={nodeId(t)}
                  width={400}
                  controls
                  contentEditable="false"
                  suppressContentEditableWarning
                >
                  <source src={t.src} />
                </video>
              ) : (
                <span key={nodeId(t)}>{t.text || <br />}</span>
              ),
            )}
          </div>
        ))}
      </div>
    );
  },
};

const youtubeSchema = v.array(
  v.array(
    v.union([
      v.strictObject({
        type: v.literal("text"),
        text: v.string(),
      }),
      v.strictObject({
        type: v.literal("youtube"),
        id: v.string(),
      }),
    ]),
  ),
);

const Youtube = ({ id }: { id: string }) => {
  return (
    <iframe
      data-youtube-node
      data-youtube-id={id}
      width="560"
      height="315"
      src={"https://www.youtube.com/embed/" + id}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};

export const Iframe: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof youtubeSchema>;
    const [doc, setDoc] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "youtube",
          id: "IqKz0SfHaqI",
        },
        {
          type: "text",
          text: " Youtube",
        },
      ],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: youtubeSchema,
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [
          internalPaste(),
          htmlPaste<Doc>(
            (text) => ({ type: "text", text }),
            [
              (e) => {
                if (!!e.dataset.youtubeNode) {
                  return {
                    type: "youtube",
                    id: e.dataset.youtubeId!,
                  };
                }
              },
            ],
          ),
          plainPaste(),
        ],
        onChange: setDoc,
      }).input(ref.current);
    }, []);

    return (
      <div>
        {/* <div>
          <button
            onClick={() => {
              // TODO
              editorRef.current?.insert(" [IqKz0SfHaqI]");
            }}
          >
            insert
          </button>
        </div> */}
        <div
          ref={ref}
          style={{
            backgroundColor: "white",
            padding: 8,
          }}
        >
          {doc.map((r) => (
            <div key={nodeId(r)}>
              {r.map((t) =>
                t.type === "youtube" ? (
                  <Youtube key={nodeId(t)} id={t.id} />
                ) : (
                  <span key={nodeId(t)}>{t.text || <br />}</span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
