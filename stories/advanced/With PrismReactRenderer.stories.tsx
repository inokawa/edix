import type { StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import { createEditor, plainSchema } from "../../src";
import { Highlight, themes } from "prism-react-renderer";

export default {
  component: createEditor,
};

export const WithPrismReactRenderer: StoryObj = {
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
}`
    );

    const ref = useRef<HTMLPreElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: text,
        schema: plainSchema({ multiline: true }),
        onChange: setText,
      }).input(ref.current);
    }, []);

    return (
      <Highlight theme={themes.dracula} code={text} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre ref={ref} className={className} style={{ ...style, padding: 4 }}>
            {tokens.map((line, i) => {
              line = line.filter((token) => !token.empty);
              return (
                <div {...getLineProps({ line, key: i })}>
                  {line.length ? (
                    line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))
                  ) : (
                    <br />
                  )}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  },
};
