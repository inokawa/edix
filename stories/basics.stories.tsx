import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { editable, EditableHandle } from "../src";

export default {
  component: editable,
};

export const Text: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(
      "Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒"
    );
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
      });
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
        {value.split("\n").map((r, i) => (
          <div key={i}>{r ? r : <br />}</div>
        ))}
      </div>
    );
  },
};

export const Readonly: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(`Hello world.`);
    const [readonly, setReadonly] = useState(false);
    const handle = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return (handle.current = editable(ref.current, {
        onChange: setValue,
      }));
    }, []);
    return (
      <div>
        <div>
          <button
            onClick={() => {
              if (!handle.current) return;
              const value = !readonly;
              handle.current.readonly(value);
              setReadonly(value);
            }}
          >
            {readonly ? "editable" : "readonly"}
          </button>
        </div>
        <div
          ref={ref}
          style={{
            background: "white",
            color: readonly ? "gray" : undefined,
          }}
        >
          {value.split("\n").map((r, i) => (
            <div key={i}>{r ? r : <br />}</div>
          ))}
        </div>
      </div>
    );
  },
};

export const Rtl: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(`אחד !
two !
שְׁלוֹשָׁה !`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
      });
    }, []);
    return (
      <div
        ref={ref}
        style={{
          direction: "rtl",
          background: "white",
        }}
      >
        {value.split("\n").map((r, i) => (
          <div key={i}>{r ? r : <br />}</div>
        ))}
      </div>
    );
  },
};

export const Vertical: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] =
      useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
      });
    }, []);
    return (
      <div
        ref={ref}
        style={{
          writingMode: "vertical-rl",
          background: "white",
          height: 400,
        }}
      >
        {value.split("\n").map((r, i) => (
          <div key={i}>{r ? r : <br />}</div>
        ))}
      </div>
    );
  },
};

export const Highlight: StoryObj = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );
    const [searchText, setSearchText] = useState("dolor");

    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
      });
    }, []);

    const reg = new RegExp(`(${searchText})`);

    return (
      <div>
        <div>
          <label htmlFor="search">input search word: </label>
          <input
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div ref={ref} style={{ background: "white" }}>
          {value.split("\n").map((r, i) => (
            <div key={i}>
              {r ? (
                r.split(reg).map((t, j) => (
                  <span
                    key={j}
                    style={{
                      background: t === searchText ? "yellow" : undefined,
                    }}
                  >
                    {t}
                  </span>
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

  return (
    <video width={400} controls>
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
              {r
                .split(/(\[.+?\])/)
                .map((t, j) =>
                  t.startsWith("[") ? (
                    <Youtube key={j} id={t.slice(1, t.length - 1)} />
                  ) : (
                    <span key={j}>{t}</span>
                  )
                )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
