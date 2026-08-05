import React, { useEffect, useRef, useState } from "react";
import type { StoryObj } from "@storybook/react-vite";
import { createPlainEditor } from "../../src";

export default {
  component: createPlainEditor,
};

// Describe a DOM node for the caret readout, flagging framework anchor nodes.
const describeNode = (node: Node | null): string => {
  if (!node) return "none";
  if (node.nodeType === Node.COMMENT_NODE) return "#comment (anchor)";
  if (node.nodeType === Node.TEXT_NODE) {
    const { data } = node as Text;
    return data.length === 0
      ? `#text "" (anchor)`
      : `#text ${JSON.stringify(data)}`;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    return `<${(node as Element).tagName.toLowerCase()}>`;
  }
  return `node(${node.nodeType})`;
};

const makeBlock = (line: string): HTMLElement => {
  const div = document.createElement("div");
  div.appendChild(
    line ? document.createTextNode(line) : document.createElement("br"),
  );
  return div;
};

/**
 * Rebuilds the host's blocks, interspersing real Svelte-style anchor nodes: a
 * leading comment and a trailing empty text node around every block, plus a
 * final trailing comment — exactly what `{#each}` rendering dynamic components
 * emits. Block nodes are kept in place while the block count is unchanged so the
 * caret survives typing; only the anchor nodes make these bugs reproduce.
 */
const renderBlocks = (host: HTMLElement, text: string): void => {
  const lines = text.split("\n");
  const blocks = host.querySelectorAll(":scope > div");
  if (blocks.length === lines.length) {
    lines.forEach((line, i) => {
      const block = blocks[i] as HTMLElement;
      if (line) block.textContent = line;
      else block.replaceChildren(document.createElement("br"));
    });
    return;
  }
  host.replaceChildren();
  for (const line of lines) {
    host.appendChild(document.createComment(""));
    host.appendChild(makeBlock(line));
    host.appendChild(document.createTextNode(""));
  }
  host.appendChild(document.createComment(""));
};

interface Info {
  text: string;
  blocks: number;
  domCaret: string;
}

/**
 * Shared host: a plaintext editate editor whose blocks are rendered imperatively
 * with framework anchor nodes between and after them (see `renderBlocks`). The
 * readouts (model text / block count / DOM caret) are the evidence, so each bug
 * is provable from the panel below the editor without a debugger.
 */
function AnchorEditor({
  initialText,
  steps,
  expected,
  bug,
  readout,
}: {
  initialText: string;
  steps: React.ReactNode;
  expected: React.ReactNode;
  bug: React.ReactNode;
  readout: (info: Info) => React.ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(initialText);
  const [domCaret, setDomCaret] = useState("none");
  const [lastInput, setLastInput] = useState("none");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    renderBlocks(host, initialText);
    const editor = createPlainEditor({ text: initialText, onChange: setText });
    const cleanup = editor.input(host);
    const onDomSel = () => {
      const sel = document.getSelection();
      const node = sel?.focusNode ?? null;
      setDomCaret(
        node && host.contains(node)
          ? `${describeNode(node)} @ ${sel!.focusOffset}`
          : "none",
      );
    };
    document.addEventListener("selectionchange", onDomSel);
    // Capture-phase probe: read what the browser hands editate for this delete
    // *before* editate's own (preventDefault-ing) beforeinput handler runs. A
    // `(collapsed)` range across the block boundary is the Firefox anchor-node
    // bug; a `(spanning)` range means the browser expressed the merge natively.
    const onInputProbe = (e: Event) => {
      const ie = e as InputEvent;
      const r = ie.getTargetRanges?.()[0];
      // Disambiguate the host <div> from a block <div> — describeNode prints
      // both as "<div>", which hides where the boundary actually landed.
      const desc = (n: Node | null): string =>
        n === host
          ? "<div host>"
          : n?.nodeType === Node.ELEMENT_NODE &&
              (n as Element).tagName === "DIV" &&
              n.parentNode === host
            ? "<div block>"
            : describeNode(n);
      // NB: `range.collapsed` is a *DOM* fact. editate keys off the range after
      // it's mapped into the document model, and a DOM-spanning range that only
      // covers anchor nodes + an empty block serializes to a *collapsed* model
      // range — which is the bug (see the `blocks` readout for the real verdict).
      setLastInput(
        !r
          ? `${ie.inputType}: no target range (Firefox couldn't express the delete)`
          : `${ie.inputType}: ${desc(r.startContainer)}@${r.startOffset}` +
            ` → ${desc(r.endContainer)}@${r.endOffset} — DOM ` +
            `${r.collapsed ? "collapsed" : "spanning"} (editate deletes only ` +
            `if this maps to a non-collapsed model range)`,
      );
    };
    host.addEventListener("beforeinput", onInputProbe, true);
    return () => {
      document.removeEventListener("selectionchange", onDomSel);
      host.removeEventListener("beforeinput", onInputProbe, true);
      cleanup();
    };
  }, []);

  // Re-render the blocks (with anchors) whenever the model text changes.
  useEffect(() => {
    if (hostRef.current) renderBlocks(hostRef.current, text);
  }, [text]);

  const info: Info = { text, blocks: text.split("\n").length, domCaret };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600 }}>
      <ol>{steps}</ol>
      <p>
        <b>Expected:</b> {expected}
        <br />
        <b>Bug:</b> {bug}
      </p>
      <div
        ref={hostRef}
        style={{
          backgroundColor: "white",
          border: "solid 1px darkgray",
          padding: 8,
          minHeight: 96,
          fontSize: 20,
        }}
      />
      <pre style={{ fontSize: 14 }}>{readout(info)}</pre>
      <pre style={{ fontSize: 12, color: "#666" }}>
        last beforeinput:{" "}
        <span data-testid="last-input">{lastInput}</span>
      </pre>
    </div>
  );
}

/**
 * Repro: Ctrl+A then Backspace leaves the last character behind.
 *
 * Firefox's Ctrl+A selects `(root, 0)..(root, childCount)`, so the end boundary
 * lands on the trailing anchor node after the last block. `serializePosition`
 * then climbs to the root and miscounts the inter-block separators, shifting the
 * delete range one short — the final character is never removed.
 *
 * Firefox-specific (Chrome/WebKit put the Ctrl+A boundary inside the last
 * block). Watch the `editor text` readout after the steps: empty is correct, a
 * single leftover character is the bug.
 */
export const SelectAllDeletesLastCharacter: StoryObj = {
  render: () => (
    <AnchorEditor
      initialText={"First block\nSecond block"}
      steps={
        <>
          <li>Click into the text to focus it.</li>
          <li>
            Press <b>Ctrl/Cmd+A</b> to select the whole document.
          </li>
          <li>
            Press <b>Backspace</b>.
          </li>
        </>
      }
      expected={
        <>
          the editor is empty (<code>""</code>).
        </>
      }
      bug={<>the last character survives, stuck on the trailing anchor node.</>}
      readout={({ text }) => (
        <>
          editor text: <span data-testid="text">{JSON.stringify(text)}</span>
          {"\n\n"}
          <b>
            {text.length === 0
              ? "✅ empty — fixed"
              : "after Ctrl+A + Backspace, any leftover text here is the bug"}
          </b>
        </>
      )}
    />
  ),
};

/**
 * Repro: Backspace in an *empty* block won't merge it into the previous one.
 *
 * The empty block matters: with text on both sides of the boundary Firefox can
 * anchor a spanning `deleteContentBackward` range to the real text nodes and
 * merges natively, so the bug hides. In an empty block (just a `<br>`) the only
 * neighbours across the boundary are anchor nodes, so Firefox can't express a
 * spanning range and instead reports a *collapsed* one inside the empty block —
 * the editor sees nothing to delete and the blocks never merge. The fix falls
 * back to deleting one position backward.
 *
 * Firefox-specific. Watch the `blocks` readout (should drop 2 → 1) and the
 * `last beforeinput` line (a `(collapsed …)` range is the bug).
 */
export const BackspaceAtBlockStartWontMerge: StoryObj = {
  render: () => (
    <AnchorEditor
      initialText={"First\n"}
      steps={
        <>
          <li>
            Click into the <b>empty second line</b> (below &ldquo;First&rdquo;).
          </li>
          <li>
            Press <b>Backspace</b>.
          </li>
        </>
      }
      expected={
        <>
          the empty block is removed, leaving one block: <code>"First"</code>.
        </>
      }
      bug={
        <>
          nothing happens — the empty block stays. Firefox reports a{" "}
          <i>collapsed</i> delete range inside the empty block (no text boundary
          to span to), so editate sees nothing to delete.
        </>
      }
      readout={({ text, blocks }) => (
        <>
          editor text: <span data-testid="text">{JSON.stringify(text)}</span>
          {"\n"}blocks: <span data-testid="blocks">{blocks}</span>
          {"\n\n"}
          <b>
            {blocks === 1
              ? "✅ merged — fixed"
              : "2 blocks after Backspace in the empty block is the bug"}
          </b>
        </>
      )}
    />
  ),
};

/**
 * Repro: clicking in the empty area below the text parks the caret on a phantom
 * line.
 *
 * A trailing anchor node sits after the last block. Clicking the empty space
 * below the text lands the native caret inside that anchor; the model offset is
 * still correct, but the visible caret renders on a phantom line beneath the
 * content. The fix re-anchors the DOM caret back into the real block.
 *
 * Most visible in Firefox. Watch the `DOM caret` readout after clicking below
 * the text: it should point at the block's `#text`, not a `#comment`/`#text ""`
 * anchor.
 */
export const ClickBelowShowsPhantomCaret: StoryObj = {
  render: () => (
    <AnchorEditor
      initialText={"A simple paragraph."}
      steps={
        <>
          <li>
            Open this story in <b>Firefox</b>.
          </li>
          <li>
            Click in the <b>empty area below</b> the line of text (not on the
            text itself).
          </li>
        </>
      }
      expected={<>the caret sits at the end of the text.</>}
      bug={
        <>
          the caret appears on an empty line below the text — it is parked on
          the trailing anchor node.
        </>
      }
      readout={({ domCaret }) => (
        <>
          DOM caret: <span data-testid="dom-caret">{domCaret}</span>
          {"\n\n"}
          <b>
            {domCaret.includes("(anchor)")
              ? "❌ caret parked on an anchor node — bug reproduced"
              : "caret should land on the block's #text, not an anchor"}
          </b>
        </>
      )}
    />
  ),
};
