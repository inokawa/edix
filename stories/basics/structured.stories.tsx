import React, { useEffect, useRef, useState } from "react";
import type { StoryObj } from "@storybook/react-vite";
import {
  createEditor,
  htmlPaste,
  type InferNode,
  schema,
  type InferDoc,
  htmlCopy,
  plainCopy,
  plainPaste,
} from "../../src";

export default {
  component: createEditor,
};

const basicSchema = schema({ multiline: true });

export const Multiline: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = InferDoc<typeof basicSchema>;
    const [value, setValue] = useState<Doc>([
      [{ type: "text", text: "Hello world." }],
      [{ type: "text", text: "こんにちは。" }],
      [{ type: "text", text: "👍❤️🧑‍🧑‍🧒" }],
    ]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: basicSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste(), plainPaste()],
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

const tagSchema = schema<{ tag: { label: string; value: string } }>({});

export const Tag: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = InferDoc<typeof tagSchema>;
    const [value, setValue] = useState<Doc>([
      { type: "text", text: "Hello " },
      { type: "tag", data: { label: "Apple", value: "1" } },
      { type: "text", text: " world " },
      { type: "tag", data: { label: "Orange", value: "2" } },
    ]);

    type DocNode = InferNode<typeof tagSchema>;

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: tagSchema,
        copy: [
          htmlCopy(),
          plainCopy<DocNode>((node) =>
            "text" in node ? node.text : node.data.label,
          ),
        ],
        paste: [
          htmlPaste<DocNode>([
            (e) => {
              if (e.contentEditable === "false") {
                return {
                  type: "tag",
                  data: {
                    label: e.textContent!,
                    value: e.dataset.tagValue!,
                  },
                };
              }
            },
          ]),
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
        {value.length ? (
          value.map((t, j) =>
            t.type === "tag" ? (
              <span
                key={j}
                contentEditable={false}
                data-tag-value={t.data.value}
                style={{
                  background: "slategray",
                  color: "white",
                  fontSize: 12,
                  padding: 4,
                  borderRadius: 8,
                }}
              >
                {t.data.label}
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

const imageSchema = schema<{ image: { src: string } }, true>({
  multiline: true,
});

export const Image: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = InferDoc<typeof imageSchema>;
    const [value, setValue] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "image",
          data: { src: "https://loremflickr.com/320/240/cats?lock=1" },
        },
        {
          type: "text",
          text: " world ",
        },
        {
          type: "image",
          data: { src: "https://loremflickr.com/320/240/cats?lock=2" },
        },
      ],
    ]);

    type DocNode = InferNode<typeof imageSchema>;

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: imageSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
          htmlPaste<DocNode>([
            (e) => {
              if (e.tagName === "IMG") {
                return {
                  type: "image",
                  data: {
                    src: (e as HTMLImageElement).src,
                  },
                };
              }
            },
          ]),
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
                  <img key={j} src={t.data.src} style={{ maxWidth: 200 }} />
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

const videoSchema = schema<{ video: { src: string } }, true>({
  multiline: true,
});

export const Video: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type Doc = InferDoc<typeof videoSchema>;
    const [value, setValue] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "video",
          data: { src: "https://download.samplelib.com/mp4/sample-5s.mp4" },
        },
        {
          type: "text",
          text: " world ",
        },
      ],
    ]);
    type DocNode = InferNode<typeof videoSchema>;

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: videoSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
          htmlPaste<DocNode>([
            (e) => {
              if (e.tagName === "VIDEO") {
                return {
                  type: "video",
                  data: {
                    src: (e.childNodes[0] as HTMLSourceElement).src,
                  },
                };
              }
            },
          ]),
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
                    <source src={t.data.src} />
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

const youtubeSchema = schema<{ youtube: { id: string } }, true>({
  multiline: true,
});

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

    type Doc = InferDoc<typeof youtubeSchema>;
    const [value, setValue] = useState<Doc>([
      [
        {
          type: "text",
          text: "Hello ",
        },
        {
          type: "youtube",
          data: { id: "IqKz0SfHaqI" },
        },
        {
          type: "text",
          text: " Youtube",
        },
      ],
    ]);

    type DocNode = InferNode<typeof youtubeSchema>;

    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: youtubeSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [
          htmlPaste<DocNode>([
            (e) => {
              if (!!e.dataset.youtubeNode) {
                return {
                  type: "youtube",
                  data: {
                    id: e.dataset.youtubeId!,
                  },
                };
              }
            },
          ]),
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
                    <Youtube key={j} id={t.data.id} />
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
