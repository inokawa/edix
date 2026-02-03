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

export const Multiline: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof basicSchema>;
    const [value, setValue] = useState<Doc>([
      [{ text: "Hello world." }],
      [{ text: "こんにちは。" }],
      [{ text: "👍❤️🧑‍🧑‍🧒" }],
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: basicSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>((text) => ({ text })), plainPaste()],
        onChange: setValue,
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
        {value.map((r, i) => (
          <div key={i}>
            {r.length ? r.map((n, j) => <span key={j}>{n.text}</span>) : <br />}
          </div>
        ))}
      </div>
    );
  },
};

const Text = (props: {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}) => {
  const Element = props.bold ? "strong" : "span";
  const style: CSSProperties = {};
  if (props.italic) {
    style.fontStyle = "italic";
  }
  if (props.underline) {
    style.textDecoration = "underline";
  }
  if (props.strike) {
    style.textDecoration = style.textDecoration
      ? `${style.textDecoration} line-through`
      : "line-through";
  }
  return <Element style={style}>{props.text}</Element>;
};

const richSchema = v.array(
  v.array(
    v.strictObject({
      text: v.string(),
      bold: v.optional(v.boolean()),
      italic: v.optional(v.boolean()),
      underline: v.optional(v.boolean()),
      strike: v.optional(v.boolean()),
    }),
  ),
);

export const RichText: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = v.InferOutput<typeof richSchema>;
    const [value, setValue] = useState<Doc>([
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
          doc: value,
          schema: richSchema,
          onChange: setValue,
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
          {value.map((r, i) => (
            <div key={i}>
              {r.length ? (
                r.map((n, j) => (
                  <Text
                    key={j}
                    text={n.text}
                    bold={n.bold}
                    italic={n.italic}
                    underline={n.underline}
                    strike={n.strike}
                  />
                ))
              ) : (
                <br />
              )}
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
    const [value, setValue] = useState<Doc>([
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
        doc: value,
        schema: tagSchema,
        singleline: true,
        copy: [
          htmlCopy(),
          plainCopy<Doc>((node) => ("text" in node ? node.text : node.label)),
        ],
        paste: [
          htmlPaste<Doc>(
            (text) => ({ type: "text", text }),
            [
              (e) => {
                if (e.contentEditable === "false") {
                  return {
                    type: "tag",
                    label: e.textContent!,
                    value: e.dataset.tagValue!,
                  };
                }
              },
            ],
          ),
          plainPaste(),
        ],
        onChange: setValue,
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
        {value[0].length ? (
          value[0].map((t, j) =>
            t.type === "tag" ? (
              <span
                key={j}
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
              <span key={j}>{t.text}</span>
            ),
          )
        ) : (
          <br />
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
    const [value, setValue] = useState<Doc>([
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
        doc: value,
        schema: imageSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
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
        onChange: setValue,
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
        {value.map((r, i) => (
          <div key={i}>
            {r.length ? (
              r.map((t, j) =>
                t.type === "image" ? (
                  <img key={j} src={t.src} style={{ maxWidth: 200 }} />
                ) : (
                  <span key={j}>{t.text}</span>
                ),
              )
            ) : (
              <br />
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
    const [value, setValue] = useState<Doc>([
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
        doc: value,
        schema: videoSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
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
        onChange: setValue,
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
        {value.map((r, i) => (
          <div key={i}>
            {r.length ? (
              r.map((t, j) =>
                t.type === "video" ? (
                  // safari needs contentEditable="false"
                  <video
                    key={j}
                    width={400}
                    controls
                    contentEditable="false"
                    suppressContentEditableWarning
                  >
                    <source src={t.src} />
                  </video>
                ) : (
                  <span key={j}>{t.text}</span>
                ),
              )
            ) : (
              <br />
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
    const [value, setValue] = useState<Doc>([
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
        doc: value,
        schema: youtubeSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
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
        onChange: setValue,
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
          {value.map((r, i) => (
            <div key={i}>
              {r.length ? (
                r.map((t, j) =>
                  t.type === "youtube" ? (
                    <Youtube key={j} id={t.id} />
                  ) : (
                    <span key={j}>{t.text}</span>
                  ),
                )
              ) : (
                <br />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
