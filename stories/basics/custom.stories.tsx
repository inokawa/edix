import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { editable, EditableHandle } from "../../src";

export default {
  component: editable,
};

export const Tag: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type EditableNode =
      | { type: "text"; value: string }
      | { type: "tag"; label: string; value: string };
    const [value, setValue] = useState<EditableNode[]>([
      { type: "text", value: "Hello " },
      { type: "tag", label: "Apple", value: "1" },
      { type: "text", value: " world " },
      { type: "tag", label: "Orange", value: "2" },
    ]);

    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[]>(ref.current, {
        serializer: {
          data: (snap) => {
            // singleline
            return snap[0].reduce((acc, t) => {
              if (typeof t === "string") {
                acc.push({ type: "text", value: t });
              } else if ((t as HTMLElement).contentEditable === "false") {
                acc.push({
                  type: "tag",
                  label: t.textContent!,
                  value: (t as HTMLElement).dataset.tagValue!,
                });
              }
              return acc;
            }, [] as EditableNode[]);
          },
        },
        onChange: setValue,
      });
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
              <span key={j}>{t.value}</span>
            )
          )
        ) : (
          <br />
        )}
      </div>
    );
  },
};

export const Image: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type EditableNode =
      | { type: "text"; value: string }
      | { type: "image"; src: string };
    const [value, setValue] = useState<EditableNode[][]>([
      [
        {
          type: "text",
          value: "Hello ",
        },
        {
          type: "image",
          src: "https://loremflickr.com/320/240/cats?lock=1",
        },
        {
          type: "text",
          value: " world ",
        },
        {
          type: "image",
          src: "https://loremflickr.com/320/240/cats?lock=2",
        },
      ],
    ]);
    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: (snap) => {
            return snap.map((r) => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({ type: "text", value: t });
                } else if (t.tagName === "IMG") {
                  acc.push({ type: "image", src: (t as HTMLImageElement).src });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          },
        },
        onChange: setValue,
      });
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
                  <img key={j} src={t.src} />
                ) : (
                  <span key={j}>{t.value}</span>
                )
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

export const Video: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);

    type EditableNode =
      | { type: "text"; value: string }
      | { type: "video"; src: string };
    const [value, setValue] = useState<EditableNode[][]>([
      [
        {
          type: "text",
          value: "Hello ",
        },
        {
          type: "video",
          src: "https://download.samplelib.com/mp4/sample-5s.mp4",
        },
        {
          type: "text",
          value: " world ",
        },
      ],
    ]);
    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: (snap) => {
            return snap.map((r) => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({ type: "text", value: t });
                } else if (t.tagName === "VIDEO") {
                  acc.push({
                    type: "video",
                    src: (t.childNodes[0] as HTMLSourceElement).src,
                  });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          },
        },
        onChange: setValue,
      });
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
                  <span key={j}>{t.value}</span>
                )
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
    const editorRef = useRef<EditableHandle | null>(null);

    type EditableNode =
      | { type: "text"; value: string }
      | { type: "youtube"; id: string };
    const [value, setValue] = useState<EditableNode[][]>([
      [
        {
          type: "text",
          value: "Hello ",
        },
        {
          type: "youtube",
          id: "IqKz0SfHaqI",
        },
        {
          type: "text",
          value: " Youtube",
        },
      ],
    ]);
    useEffect(() => {
      if (!ref.current) return;
      return (editorRef.current = editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: (snap) => {
            return snap.map((r) => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({ type: "text", value: t });
                } else if (!!(t as HTMLElement).dataset.youtubeNode) {
                  acc.push({
                    type: "youtube",
                    id: (t as HTMLElement).dataset.youtubeId!,
                  });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          },
        },
        onChange: setValue,
      }));
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
                    <span key={j}>{t.value}</span>
                  )
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
