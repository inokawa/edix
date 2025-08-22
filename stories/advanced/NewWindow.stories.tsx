import { StoryObj } from "@storybook/react-vite";
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createEditor, plainSchema } from "../../src";
import { createPortal } from "react-dom";

export default {
  component: createEditor,
};

const Content = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("This is new window!");
  useEffect(() => {
    if (!ref.current) return;
    return createEditor({
      doc: value,
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    }).input(ref.current);
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

const NewWindow = ({
  children,
  onUnload,
}: {
  children: ReactNode;
  onUnload: () => void;
}) => {
  const [container, setContainer] = useState<Element | null>(null);
  useLayoutEffect(() => {
    const externalWindow = window.open(
      "",
      "",
      "width=600,height=400,left=200,top=200"
    );

    if (!externalWindow) return;

    const container = externalWindow.document.createElement("div");

    externalWindow.document.body.appendChild(container);
    externalWindow.addEventListener("unload", onUnload, { once: true });

    setContainer(container);

    return () => {
      externalWindow?.close();
    };
  }, []);

  return container ? createPortal(children, container) : null;
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
