import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { editable, EditableHandle } from "../../src";

export default {
  component: editable,
};

const TAG_PREFIX = "[TAG:";

const TagComponent = ({ children }: { children: string }) => {
  return (
    <span
      contentEditable={false}
      style={{
        background: "slategray",
        color: "white",
        padding: 4,
        borderRadius: 8,
      }}
    >
      {children}
    </span>
  );
};

export const Tag: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [TAG:TAG1] world [TAG:TAG2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
        nodes: [
          {
            is: (e) => e.contentEditable === "false",
            serialize: (e) => e.textContent!,
          },
        ],
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
        {value.split("\n").map((r, i) => (
          <div key={i}>
            {r ? (
              r
                .split(/(\[.+?\])/)
                .map((t, j) =>
                  t.startsWith(TAG_PREFIX) ? (
                    <TagComponent key={j}>{t}</TagComponent>
                  ) : (
                    <span key={j}>{t}</span>
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

const IMAGE_PREFIX = "[image:";

const Img = ({ text }: { text: string }) => {
  const src = text.slice(IMAGE_PREFIX.length, text.length - 1);
  return <img src={src} />;
};

export const Image: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(
      "Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]"
    );
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [
          {
            is: "img",
            serialize: (e) => `[image:${(e as HTMLImageElement).src}]`,
          },
        ],
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
        {value.split("\n").map((r, i) => (
          <div key={i}>
            {r ? (
              r
                .split(/(\[.+?\])/)
                .map((t, j) =>
                  t.startsWith(IMAGE_PREFIX) ? (
                    <Img key={j} text={t} />
                  ) : (
                    <span key={j}>{t}</span>
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

const VIDEO_PREFIX = "[video:";

const VideoNode = ({ text }: { text: string }) => {
  const src = text.slice(VIDEO_PREFIX.length, text.length - 1);

  // safari needs contentEditable="false"
  return (
    <video width={400} controls contentEditable="false">
      <source src={src} />
    </video>
  );
};

export const Video: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(
      "Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world"
    );
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [
          {
            is: "video",
            serialize: (e) =>
              `[video:${(e.childNodes[0] as HTMLSourceElement).src}]`,
          },
        ],
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
        {value.split("\n").map((r, i) => (
          <div key={i}>
            {r ? (
              r
                .split(/(\[.+?\])/)
                .map((t, j) =>
                  t.startsWith(VIDEO_PREFIX) ? (
                    <VideoNode key={j} text={t} />
                  ) : (
                    <span key={j}>{t}</span>
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
    const [value, setValue] = useState("Hello [IqKz0SfHaqI] Youtube");
    const editorRef = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return (editorRef.current = editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [
          {
            is: (e) => !!e.dataset.youtubeNode,
            serialize: (e) => "[" + e.dataset.youtubeId + "]",
          },
        ],
      }));
    }, []);

    return (
      <div>
        <div>
          <button
            onClick={() => {
              editorRef.current?.insert(" [IqKz0SfHaqI]");
            }}
          >
            insert
          </button>
        </div>
        <div
          ref={ref}
          style={{
            backgroundColor: "white",
            padding: 8,
          }}
        >
          {value.split("\n").map((r, i) => (
            <div key={i}>
              {r ? (
                r
                  .split(/(\[.+?\])/)
                  .map((t, j) =>
                    t.startsWith("[") ? (
                      <Youtube key={j} id={t.slice(1, t.length - 1)} />
                    ) : (
                      <span key={j}>{t}</span>
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
