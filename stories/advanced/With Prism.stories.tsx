import type { StoryObj } from "@storybook/react-vite";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPlainEditor, nodeIdPlugin, NodeId } from "../../src";
import Prism, { type Token } from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";

interface Segment {
  text: string;
  className?: string;
}

const flattenTokens = (
  tokens: (string | Token)[],
  className: string | undefined,
  out: Segment[],
) => {
  for (const t of tokens) {
    if (typeof t === "string") {
      out.push({ text: t, className });
    } else {
      const alias = Array.isArray(t.alias) ? t.alias.join(" ") : t.alias;
      const cls = `token ${t.type}${alias ? ` ${alias}` : ""}`;
      if (typeof t.content === "string") {
        out.push({ text: t.content, className: cls });
      } else {
        flattenTokens(
          Array.isArray(t.content) ? t.content : [t.content],
          cls,
          out,
        );
      }
    }
  }
};

const tokenizeLines = (text: string): Segment[][] => {
  const flat: Segment[] = [];
  flattenTokens(Prism.tokenize(text, Prism.languages.jsx!), undefined, flat);
  const lines: Segment[][] = [[]];
  for (const seg of flat) {
    seg.text.split("\n").forEach((part, i) => {
      if (i > 0) {
        lines.push([]);
      }
      if (part) {
        lines[lines.length - 1]!.push({ text: part, className: seg.className });
      }
    });
  }
  return lines;
};

export default {
  component: createPlainEditor,
};

export const WithPrism: StoryObj = {
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

    const ref = useRef<HTMLPreElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);

    return (
      <pre ref={ref} className="language-jsx" style={{ padding: 4 }}>
        {tokenizeLines(text).map((line, i) => (
          <div key={NodeId(editor, doc.children[i]!)}>
            {line.length ? (
              line.map((seg, j) => (
                <span key={j} className={seg.className}>
                  {seg.text}
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
