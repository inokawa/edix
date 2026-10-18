import { expect, it } from "vitest";
import { createEditor } from "../editor.js";
import { NodeId, nodeIdPlugin } from "./nodeId.js";

it("insert text", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({ type: "insert_text", at: 1, text: "xyz" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("insert linebreak", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({ type: "insert_text", at: 1, text: "\n" });

  const [a, b, c] = editor.doc.children;
  expect(NodeId(editor, a!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, b!)).toBe(firstBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, c!)).toBe(secondBlockId);
  expect(NodeId(editor, c!.children[0]!)).toBe(secondTextId);
});

it("insert lines", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({ type: "insert_text", at: 1, text: "ABC\nDEFG" });

  const [a, b, c] = editor.doc.children;
  expect(NodeId(editor, a!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, b!)).toBe(firstBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, c!)).toBe(secondBlockId);
  expect(NodeId(editor, c!.children[0]!)).toBe(secondTextId);
});

it("delete text", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({ type: "delete", range: [1, 2] });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("delete linebreak", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor.apply({ type: "delete", range: [5, 6] });

  const [a] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
});

it("delete lines", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor.apply({ type: "delete", range: [4, 7] });

  const [a] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
});

it("replace text", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor
    .apply({ type: "delete", range: [1, 2] })
    .apply({ type: "insert_text", at: 1, text: "xyz" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("replace linebreak", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor
    .apply({ type: "delete", range: [5, 6] })
    .apply({ type: "insert_text", at: 5, text: "xyz" });

  const [a] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
});

it("insert text node", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({
    type: "insert_node",
    at: 1,
    fragment: [{ children: [{ text: "xyz" }] }],
  });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("insert void node", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({
    type: "insert_node",
    at: 1,
    fragment: [{ children: [{ foo: "bar" }] }],
  });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[1]!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[2]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("insert nodes", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({
    type: "insert_node",
    at: 1,
    fragment: [
      { children: [{ text: "ABC" }] },
      { children: [{ text: "DEFG" }] },
    ],
  });

  const [a, b, c] = editor.doc.children;
  expect(NodeId(editor, a!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, b!)).toBe(firstBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, c!)).toBe(secondBlockId);
  expect(NodeId(editor, c!.children[0]!)).toBe(secondTextId);
});

it("format text", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({ type: "format", range: [1, 2], key: "foo", value: "bar" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[1]!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[2]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("format lines", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = before;

  editor.apply({ type: "format", range: [1, 7], key: "foo", value: "bar" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[1]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, b!.children[1]!)).toBe(secondTextId);
});

it("delete text in nested block", () => {
  const editor = createEditor({
    doc: {
      children: [
        {
          children: [
            { children: [{ text: "abcde" }] },
            { children: [{ text: "fghij" }] },
          ],
        },
        { children: [{ children: [{ text: "klmno" }] }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [parent, sibling] = editor.doc.children;
  const [firstChild, secondChild] = parent!.children;
  const [
    parentId,
    firstChildId,
    firstChildTextId,
    secondChildId,
    secondChildTextId,
    siblingId,
    siblingChildId,
    siblingChildTextId,
  ] = [
    parent!,
    firstChild!,
    firstChild!.children[0]!,
    secondChild!,
    secondChild!.children[0]!,
    sibling!,
    sibling!.children[0]!,
    sibling!.children[0]!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({ type: "delete", range: [7, 8] });

  const [a, b] = editor.doc.children;
  const [aa, ab] = a!.children;
  expect(NodeId(editor, a!)).toBe(parentId);
  expect(NodeId(editor, aa!)).toBe(firstChildId);
  expect(NodeId(editor, aa!.children[0]!)).toBe(firstChildTextId);
  expect(NodeId(editor, ab!)).toBe(secondChildId);
  expect(NodeId(editor, ab!.children[0]!)).toBe(secondChildTextId);
  expect(NodeId(editor, b!)).toBe(siblingId);
  expect(NodeId(editor, b!.children[0]!)).toBe(siblingChildId);
  expect(NodeId(editor, b!.children[0]!.children[0]!)).toBe(siblingChildTextId);
});

it("move nodes before reading all of them", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
        { children: [{ text: "klmno" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second, third] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor.apply({
    type: "patch_node",
    path: [],
    key: "children",
    value: [third, first, second],
  });

  const [, b] = editor.doc.children;
  expect(NodeId(editor, b!)).toBe(firstBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(firstTextId);
});

it("restore replaced nodes", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const children = editor.doc.children;
  const [first, second] = children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({ type: "insert_text", at: 1, text: "\n" });
  const editedChildren = editor.doc.children;
  const newBlockId = NodeId(editor, editedChildren[0]!);
  const newTextId = NodeId(editor, editedChildren[0]!.children[0]!);

  editor.apply({
    type: "patch_node",
    path: [],
    key: "children",
    value: children,
  });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);

  editor.apply({
    type: "patch_node",
    path: [],
    key: "children",
    value: editedChildren,
  });

  const [c, d, e] = editor.doc.children;
  expect(NodeId(editor, c!)).toBe(newBlockId);
  expect(NodeId(editor, c!.children[0]!)).toBe(newTextId);
  expect(NodeId(editor, d!)).toBe(firstBlockId);
  expect(NodeId(editor, d!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, e!)).toBe(secondBlockId);
  expect(NodeId(editor, e!.children[0]!)).toBe(secondTextId);
});

it("set attr", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const [firstBlockId, firstTextId, secondBlockId, secondTextId] = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));

  editor.apply({ type: "patch_node", path: [0], key: "foo", value: "bar" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
  expect(NodeId(editor, b!)).toBe(secondBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(secondTextId);
});

it("insert text into empty block", () => {
  const editor = createEditor({
    doc: { children: [{ children: [{ text: "" }] }] },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor.apply({ type: "insert_text", at: 0, text: "xyz" });

  const [a] = editor.doc.children;
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
});

it("delete all", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "abcde" }] },
        { children: [{ text: "fghij" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const [firstBlockId, firstTextId] = [first!, first!.children[0]!].map((n) =>
    NodeId(editor, n),
  );

  editor.apply({ type: "delete", range: [0, 11] });

  const [a] = editor.doc.children;
  expect(editor.doc.children).toHaveLength(1);
  expect(NodeId(editor, a!)).toBe(firstBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(firstTextId);
});

it("insert linebreak at block start", () => {
  const editor = createEditor({
    doc: { children: [{ children: [{ text: "abcde" }] }] },
  }).exec(nodeIdPlugin);
  const [first] = editor.doc.children;
  const before = [first!, first!.children[0]!].map((n) => NodeId(editor, n));
  const [firstBlockId, firstTextId] = before;

  editor.apply({ type: "insert_text", at: 0, text: "\n" });

  const [a, b] = editor.doc.children;
  expect(NodeId(editor, a!)).not.toBeOneOf(before);
  expect(NodeId(editor, a!.children[0]!)).not.toBeOneOf(before);
  expect(NodeId(editor, b!)).toBe(firstBlockId);
  expect(NodeId(editor, b!.children[0]!)).toBe(firstTextId);
});

it("delete linebreak after empty block", () => {
  const editor = createEditor({
    doc: {
      children: [
        { children: [{ text: "" }] },
        { children: [{ text: "abcde" }] },
      ],
    },
  }).exec(nodeIdPlugin);
  const [first, second] = editor.doc.children;
  const before = [
    first!,
    first!.children[0]!,
    second!,
    second!.children[0]!,
  ].map((n) => NodeId(editor, n));
  const [, , secondBlockId, secondTextId] = before;

  editor.apply({ type: "delete", range: [0, 1] });

  const [a] = editor.doc.children;
  expect(editor.doc.children).toHaveLength(1);
  expect(NodeId(editor, a!)).toBe(secondBlockId);
  expect(NodeId(editor, a!.children[0]!)).toBe(secondTextId);
});
