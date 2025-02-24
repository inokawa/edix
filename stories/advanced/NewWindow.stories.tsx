import { StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import { editable, plainSchema } from "../../src";
import NewWindow from "react-new-window";

export default {
  component: editable,
};

const Content = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("This is new window!");
  useEffect(() => {
    if (!ref.current) return;
    return editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    });
  }, []);
  return (
    <div
      ref={ref}
      style={{
        background: "white",
      }}
    >
      {value.split("\n").map((r, i) => (
        <div key={i}>{r ? r : <br />}</div>
      ))}
    </div>
  );
};

export const Default: StoryObj = {
  name: "NewWindow",

  render: () => {
    const [isWindowOpened, setIsWindowOpened] = useState(false);
    return (
      <div>
        <button
          onClick={() => {
            setIsWindowOpened((prev) => !prev);
          }}
        >
          {isWindowOpened ? "close" : "open"} window
        </button>
        {isWindowOpened && (
          <NewWindow
            features={{ width: 400, height: 200 }}
            onUnload={() => {
              setIsWindowOpened(false);
            }}
          >
            <Content />
          </NewWindow>
        )}
      </div>
    );
  },
};
