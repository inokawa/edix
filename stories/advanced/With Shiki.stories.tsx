import type { StoryObj } from "@storybook/react-vite";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPlainEditor, nodeIdPlugin, NodeId } from "../../src";
import { createHighlighter, type Highlighter } from "shiki";

const THEME = "vitesse-dark";

export default {
  component: createPlainEditor,
};

export const WithShiki: StoryObj = {
  render: () => {
    const [text, setText] = useState(
      `import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    );

    const editor = useMemo(
      () => createPlainEditor({ text, onChange: setText }).exec(nodeIdPlugin),
      [],
    );
    // the lines are keyed by node id, so the doc is needed in addition to the text
    const [doc, setDoc] = useState(() => editor.doc);
    useEffect(() => editor.on("change", () => setDoc(editor.doc)), []);

    const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
    useEffect(() => {
      let disposed = false;
      createHighlighter({ themes: [THEME], langs: ["jsx"] }).then((h) => {
        if (disposed) {
          h.dispose();
          return;
        }
        setHighlighter(h);
      });
      return () => {
        disposed = true;
      };
    }, []);

    const ref = useRef<HTMLPreElement>(null);
    useEffect(() => {
      if (!highlighter || !ref.current) return;
      return editor.input(ref.current);
    }, [highlighter]);

    if (!highlighter) return null;

    const { tokens, bg, fg } = highlighter.codeToTokens(text, {
      lang: "jsx",
      theme: THEME,
    });

    return (
      <pre
        ref={ref}
        style={{
          background: bg,
          color: fg,
          padding: 4,
        }}
      >
        {tokens.map((line, i) => (
          <div key={NodeId(editor, doc.children[i]!)}>
            {line.length ? (
              line.map((t, j) => (
                <span key={j} style={{ color: t.color }}>
                  {t.content}
                </span>
              ))
            ) : (
              <br />
            )}
          </div>
        ))}
      </pre>
    );
  },
};
