import type { StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createPlainEditor } from "../../src";
import { TextlintKernel, TextlintMessage } from "@textlint/kernel";
import { TextlintKernelOptions } from "@textlint/kernel/lib/src/textlint-kernel-interface";

import pluginText from "@textlint/textlint-plugin-text";
import ruleSentenceLength from "textlint-rule-sentence-length";
import ruleNoNfd from "textlint-rule-no-nfd";
import ruleNoInvalidControlCharacter from "@textlint-rule/textlint-rule-no-invalid-control-character";
import ruleNoZeroWidthSpaces from "textlint-rule-no-zero-width-spaces";
import noKangxiRadicals from "textlint-rule-no-kangxi-radicals";

const kernel = new TextlintKernel();
const options: TextlintKernelOptions = {
  ext: ".txt",
  plugins: [
    {
      pluginId: "text",
      plugin: pluginText,
    },
  ],
  rules: [
    {
      ruleId: "sentence-length",
      rule: ruleSentenceLength,
    },
    {
      ruleId: "no-nfd",
      rule: ruleNoNfd,
    },
    {
      ruleId: "no-invalid-control-character",
      rule: ruleNoInvalidControlCharacter,
    },
    {
      ruleId: "no-zero-width-spaces",
      rule: ruleNoZeroWidthSpaces,
    },
    {
      ruleId: "no-kangxi-radicals",
      rule: noKangxiRadicals,
    },
  ],
};

export default {
  component: createPlainEditor,
};

const style: React.CSSProperties = {
  width: "300px",
  background: "white",
};

const Mark = ({
  token,
  children,
}: {
  token: TextlintMessage[];
  children: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [tooltip, setTooltip] = useState<{
    top: number;
    left: number;
  } | null>(null);

  return (
    <span
      ref={ref}
      style={{
        textDecorationColor: "red",
        textDecorationLine: "underline",
      }}
      onMouseOver={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setTooltip({
          top: rect.top - rect.height * 2 /* FIXME */,
          left: rect.left,
        });
      }}
      onMouseOut={() => setTooltip(null)}
    >
      {children}
      {tooltip &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: tooltip.top,
              left: tooltip.left,
              background: "white",
              fontSize: 16,
              padding: 2,
              border: "solid 1px gray",
            }}
          >
            {token.map((t, i) => (
              <div key={i}>
                {i}: {t.message}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </span>
  );
};

export const WithTextlint: StoryObj = {
  render: () => {
    const [text, setText] = useState(
      "⾼齢者の活躍と地域における⽀えあいの\u0019推進\u0010。\nホ゜ケット エンシ゛ン\nテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト",
    );
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text,
        onChange: setText,
      }).input(ref.current);
    }, []);

    const [tokens, setTokens] = useState<TextlintMessage[]>([]);
    useEffect(() => {
      let aborted = false;
      (async () => {
        const res = await kernel.lintText(text, options);
        if (aborted) return;
        setTokens(res.messages);
      })();
      return () => {
        aborted = true;
      };
    }, [text]);

    const tokensByLine = tokens.reduce(
      (acc, t) => {
        const { line, column } = t.loc.start;
        if (!acc[line]) acc[line] = {};
        if (!acc[line][column]) acc[line][column] = [];
        acc[line][column].push(t);
        return acc;
      },
      {} as { [key: number]: { [column: number]: TextlintMessage[] } },
    );

    return (
      <div style={{ marginTop: 32 }}>
        <div ref={ref} style={style}>
          {text.split("\n").map((l, i) => {
            const texts: (React.ReactElement | string)[] = [];
            const tokensMap = tokensByLine[i + 1] || {};
            let prevEnd = 0;
            for (const token of Object.values(tokensMap)) {
              const start = token[0].loc.start.column - 1;
              const end = token[0].loc.end.column - 1;
              texts.push(l.slice(prevEnd, start));
              texts.push(
                <Mark key={start} token={token}>
                  {l.slice(start, end)}
                </Mark>,
              );
              prevEnd = end;
            }
            texts.push(l.slice(prevEnd));

            return <div key={i}>{l ? texts : <br />}</div>;
          })}
        </div>
      </div>
    );
  },
};
