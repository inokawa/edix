import { StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import { editable } from "../../src";

export default {
  component: editable,
};

const style: React.CSSProperties = {
  width: "300px",
  height: "200px",
  background: "white",
};

const Row = ({ text, segmenter }: { text: string; segmenter: any }) => {
  const tokens = segmenter.segment(text);
  const nodes: React.ReactElement[] = [];
  for (const { segment, index, isWordLike } of tokens) {
    nodes.push(
      <span
        key={index}
        style={{
          background: isWordLike ? "palegreen" : undefined,
          outline: "solid 1px green",
        }}
      >
        {segment}
      </span>
    );
  }
  return <div>{text ? nodes : <br />}</div>;
};

export const Segmenter: StoryObj = {
  render: () => {
    type Granularity = "grapheme" | "word" | "sentence";
    const [text, setText] = useState(
      "すもももももももものうち。\n\n吾輩 （ わがはい ） は猫である。名前はまだ無い。"
    );

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setText,
      });
    }, []);

    const [locale, setLocale] = useState("ja");
    const [granularity, setGranularity] = useState<Granularity>("word");

    const hasSegmenter = !!Intl?.Segmenter;

    if (!hasSegmenter) {
      return <div>{"Intl.Segmenter is not supported in this browser."}</div>;
    }

    const segmenter = new Intl.Segmenter(locale, {
      granularity,
    });

    return (
      <div>
        <div>
          <input value={locale} onChange={(e) => setLocale(e.target.value)} />
          <select
            value={granularity}
            onChange={(e) => setGranularity(e.target.value as Granularity)}
          >
            <option value={"grapheme"}>grapheme</option>
            <option value={"word"}>word</option>
            <option value={"sentence"}>sentence</option>
          </select>
        </div>
        <div ref={ref} style={style}>
          {text.split("\n").map((t, i) => (
            <Row key={i} text={t} segmenter={segmenter} />
          ))}
        </div>
      </div>
    );
  },
};
