/**
 * @vitest-environment jsdom
 */
import { expect, it } from "vitest";
import {
  createParser,
  defaultIsBlockNode,
  findPosition,
  serializePosition,
  type DomPoint,
} from "./index.js";
import type { DomPosition, Path } from "../doc/types.js";
import { isElementNode, isTextNode } from "./utils.js";
import { isHiddenNode } from "./parser.js";

// https://w3c.github.io/contentEditable/#dfn-legal-caret-positions

const document = window.document;
const parser = createParser(document, defaultIsBlockNode);

const allowedAttrs = ["contentEditable"] as const;

const h = <
  T extends
    | keyof HTMLElementTagNameMap
    | keyof SVGElementTagNameMap
    | keyof MathMLElementTagNameMap,
>(
  type: T,
  children: (HTMLElement | string)[] = [],
  props?: Record<(typeof allowedAttrs)[number], string>,
): HTMLElement => {
  const node = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([k, v]) => {
      (node as any)[k] = v;
    });
  }

  children.forEach((c) => {
    if (typeof c === "string") {
      node.appendChild(document.createTextNode(c));
    } else {
      node.appendChild(c);
    }
  });

  return node;
};

const posAt = (node: Node, path: Path, offset: number): DomPoint => {
  for (const p of path) {
    node = node.childNodes[p]!;
  }
  if (isElementNode(node) && isHiddenNode(node)) {
    throw new Error(`${elToString(node)} is hidden`);
  }
  return [node, offset];
};

const indexOf = (node: Node): number => {
  let i = 0;
  while ((node = node.previousSibling!)) {
    i++;
  }
  return i;
};

const toRange = (pos: DomPoint): DomPoint => {
  if (isElementNode(pos[0]) && pos[0].parentNode) {
    const [node, offset] = pos;
    let index = indexOf(node);
    if (offset >= 1) {
      index++;
    }
    return [node.parentNode!, index];
  } else {
    return pos;
  }
};

const elToString = (element: Element): string => {
  let tag = element.tagName.toLowerCase();
  const results: string[] = [];

  const attrs: string[] = [];
  for (const key of allowedAttrs) {
    const value = (element as any)[key];
    if (value != null) {
      attrs.push(`${key}=${value}`);
    }
  }
  if (attrs.length !== 0) {
    tag += `.${attrs.join("/")}`;
  }

  for (const node of element.childNodes) {
    if (isElementNode(node)) {
      results.push(elToString(node));
    } else if (isTextNode(node)) {
      results.push(`"${node.data.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`);
    }
  }
  if (results.length === 0) {
    return tag;
  }
  return `${tag}[${results.join(",")}]`;
};

{
  const doc = h("div", []);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[], 0],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("br")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    // firefox
    [
      [[], 0],
      [[], 0],
    ],
    [
      [[], 1],
      [[], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello", h("br")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello", h("br"), "world"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[2], 0],
      [[], 5],
    ],
    [
      [[2], 5],
      [[], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello\nworld"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[0], 10],
      [[], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello", "\n", "world"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[2], 0],
      [[], 5],
    ],
    [
      [[2], 5],
      [[], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("img")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[], 0],
    ],
    [
      [[], 1],
      [[], 1],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("img"), "Hello"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[], 0],
    ],
    [
      [[], 1],
      [[], 1],
    ],
    [
      [[1], 0],
      [[], 1],
    ],
    [
      [[1], 5],
      [[], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello", h("img")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[], 1],
      [[], 5],
    ],
    [
      [[], 2],
      [[], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", ["Hello", h("img"), "world"]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[], 1],
      [[], 5],
    ],
    [
      [[], 2],
      [[], 6],
    ],
    [
      [[2], 0],
      [[], 6],
    ],
    [
      [[2], 5],
      [[], 11],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("span", ["void"], { contentEditable: "false" })]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[], 0],
    ],
    [
      [[], 1],
      [[], 1],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("span", ["void"], { contentEditable: "false" }),
    "Hello",
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[], 0],
    ],
    [
      [[], 1],
      [[], 1],
    ],
    [
      [[1], 0],
      [[], 1],
    ],
    [
      [[1], 5],
      [[], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    "Hello",
    h("span", ["void"], { contentEditable: "false" }),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[], 1],
      [[], 5],
    ],
    [
      [[], 2],
      [[], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    "Hello",
    h("span", ["void"], { contentEditable: "false" }),
    "world",
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[], 0],
    ],
    [
      [[0], 5],
      [[], 5],
    ],
    [
      [[], 1],
      [[], 5],
    ],
    [
      [[], 2],
      [[], 6],
    ],
    [
      [[2], 0],
      [[], 6],
    ],
    [
      [[2], 5],
      [[], 11],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("template"), "Hello", h("template")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[1], 0],
      [[], 0],
    ],
    [
      [[1], 5],
      [[], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", [])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[], 0],
      [[0], 0],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", [h("br")])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello", h("br")])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello", h("br"), "world"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0, 2], 0],
      [[0], 5],
    ],
    [
      [[0, 2], 5],
      [[0], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello", "\n", "world"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0, 2], 0],
      [[0], 5],
    ],
    [
      [[0, 2], 5],
      [[0], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello\nworld"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0, 0], 10],
      [[0], 10],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", [h("img")])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[0], 0],
    ],
    [
      [[0], 1],
      [[0], 1],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", [h("img"), "Hello"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[0], 0],
    ],
    [
      [[0], 1],
      [[0], 1],
    ],
    [
      [[0, 1], 0],
      [[0], 1],
    ],
    [
      [[0, 1], 5],
      [[0], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello", h("img")])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0], 1],
      [[0], 5],
    ],
    [
      [[0], 2],
      [[0], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("div", ["Hello", h("img"), "world"])]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0], 1],
      [[0], 5],
    ],
    [
      [[0], 2],
      [[0], 6],
    ],
    [
      [[0, 2], 0],
      [[0], 6],
    ],
    [
      [[0, 2], 5],
      [[0], 11],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("div", [h("span", ["void"], { contentEditable: "false" })]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[0], 0],
    ],
    [
      [[0], 1],
      [[0], 1],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("div", [h("span", ["void"], { contentEditable: "false" }), "Hello"]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0], 0],
      [[0], 0],
    ],
    [
      [[0], 1],
      [[0], 1],
    ],
    [
      [[0, 1], 0],
      [[0], 1],
    ],
    [
      [[0, 1], 5],
      [[0], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("div", ["Hello", h("span", ["void"], { contentEditable: "false" })]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0], 1],
      [[0], 5],
    ],
    [
      [[0], 2],
      [[0], 6],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("div", [
      "Hello",
      h("span", ["void"], { contentEditable: "false" }),
      "world",
    ]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[0], 1],
      [[0], 5],
    ],
    [
      [[0], 2],
      [[0], 6],
    ],
    [
      [[0, 2], 0],
      [[0], 6],
    ],
    [
      [[0, 2], 5],
      [[0], 11],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [h("template"), "Hello", h("template")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[1], 0],
      [[], 0],
    ],
    [
      [[1], 5],
      [[], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("div", ["Hello"]),
    h("div", [h("br")]),
    h("div", ["world"]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0], 0],
      [[0], 0],
    ],
    [
      [[0, 0], 5],
      [[0], 5],
    ],
    [
      [[1], 0],
      [[1], 0],
    ],
    [
      [[1, 0], 0],
      [[1], 0],
    ],
    [
      [[2, 0], 0],
      [[2], 0],
    ],
    [
      [[2, 0], 5],
      [[2], 5],
    ],
    // firefox
    [
      [[], 0],
      [[0], 0],
    ],
    [
      [[1], 1],
      [[1], 0],
    ],
    [
      [[], 3],
      [[2], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("ul", [h("li", ["Hello"]), h("li", ["world"]), h("li", ["world"])]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
    [
      [[0, 2, 0], 0],
      [[2], 0], // TODO fix
    ],
    [
      [[0, 2, 0], 5],
      [[2], 5], // TODO fix
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("table", [
      h("tbody", [
        h("tr", [h("td", ["Hello"]), h("td", ["world"])]),
        h("tr", [h("td", ["Hello"]), h("td", ["world"])]),
      ]),
    ]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0, 0, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 0, 0, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 0, 0, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 0, 0, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
    [
      [[0, 0, 1, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 0, 1, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 0, 1, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 0, 1, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("table", [
      h("thead", [h("tr", [h("th", ["Hello"]), h("th", ["world"])])]),
      h("tbody", [h("tr", [h("td", ["Hello"]), h("td", ["world"])])]),
    ]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 0, 0, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 0, 0, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 0, 0, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 0, 0, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
    [
      [[0, 1, 0, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 1, 0, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 1, 0, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 1, 0, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

{
  const doc = h("div", [
    h("table", [
      h("colgroup", [h("col"), h("col")]),
      h("tbody", [h("tr", [h("td", ["Hello"]), h("td", ["world"])])]),
    ]),
  ]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[0, 1, 0, 0, 0], 0],
      [[0], 0], // TODO fix
    ],
    [
      [[0, 1, 0, 0, 0], 5],
      [[0], 5], // TODO fix
    ],
    [
      [[0, 1, 0, 1, 0], 0],
      [[1], 0], // TODO fix
    ],
    [
      [[0, 1, 0, 1, 0], 5],
      [[1], 5], // TODO fix
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

// {
//   const doc = h("div", [h("div", ["Hello"]), h("hr")]);

//   it.for<[DomPosition, DomPosition]>([
//     [
//       [[0, 0], 0],
//       [[0], 0],
//     ],
//     [
//       [[0, 0], 5],
//       [[0], 5],
//     ],
//     [
//       [[], 1],
//       [[0], 5],
//     ],
//     [
//       [[], 2],
//       [[0], 6],
//     ],
//   ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
//     const domPos = posAt(doc, ...p);
//     const pos = serializePosition(doc, parser, ...domPos);
//     expect(pos).toEqual(expectedPos);
//     const domPos2 = toRange(findPosition(doc, parser, pos));
//     expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
//   });
// }

// {
//   const doc = h("div", [h("hr"), h("div", ["Hello"])]);

//   it.for<[DomPosition, DomPosition]>([
//     [
//       [[], 0],
//       [[0], 0],
//     ],
//     [
//       [[], 1],
//       [[1], 0],
//     ],
//     [
//       [[1], 0],
//       [[1], 0],
//     ],
//     [
//       [[1], 5],
//       [[1], 5],
//     ],
//   ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
//     const domPos = posAt(doc, ...p);
//     const pos = serializePosition(doc, parser, ...domPos);
//     expect(pos).toEqual(expectedPos);
//     const domPos2 = toRange(findPosition(doc, parser, pos));
//     expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
//   });
// }

// {
//   const doc = h("div", [h("div", ["Hello"]), h("hr"), h("div", ["world"])]);

//   it.for<[DomPosition, DomPosition]>([
//     [
//       [[0, 0], 0],
//       [[0], 0],
//     ],
//     [
//       [[0, 0], 5],
//       [[0], 5],
//     ],
//     [
//       [[], 1],
//       [[0], 5],
//     ],
//     [
//       [[], 2],
//       [[0], 6],
//     ],
//     [
//       [[2, 0], 0],
//       [[0], 6],
//     ],
//     [
//       [[2, 0], 5],
//       [[0], 11],
//     ],
//   ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
//     const domPos = posAt(doc, ...p);
//     const pos = serializePosition(doc, parser, ...domPos);
//     expect(pos).toEqual(expectedPos);
//     const domPos2 = toRange(findPosition(doc, parser, pos));
//     expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
//   });
// }

{
  const doc = h("div", [h("template"), h("div", ["Hello"]), h("template")]);

  it.for<[DomPosition, DomPosition]>([
    [
      [[1, 0], 0],
      [[0], 0],
    ],
    [
      [[1, 0], 5],
      [[0], 5],
    ],
  ])(`${elToString(doc)}: $0 $1`, ([p, expectedPos]) => {
    const domPos = posAt(doc, ...p);
    const pos = serializePosition(doc, parser, ...domPos);
    expect(pos).toEqual(expectedPos);
    const domPos2 = toRange(findPosition(doc, parser, pos));
    expect(serializePosition(doc, parser, ...domPos2)).toEqual(pos);
  });
}

// Framework anchor nodes — comment / empty text nodes that frameworks (e.g.
// Svelte's `{#each}`) intersperse around the real blocks. A boundary must never
// stick to one: Firefox's Ctrl+A parks the end boundary on a trailing anchor,
// which previously climbed to the root and miscounted the inter-block
// separators (dropping the last character on delete).
{
  const comment = () => document.createComment("");
  const emptyText = () => document.createTextNode("");
  const build = (children: Node[]): HTMLElement => {
    const root = document.createElement("div");
    children.forEach((c) => root.appendChild(c));
    return root;
  };

  it("trailing empty-text anchor: Ctrl+A end resolves to end of last block", () => {
    const doc = build([h("p", ["Hello"]), h("p", ["world"]), emptyText()]);
    // Firefox Ctrl+A: (root, 0)..(root, childCount)
    expect(serializePosition(doc, parser, doc, 0)).toEqual([[0], 0]);
    expect(serializePosition(doc, parser, doc, 3)).toEqual([[1], 5]);
    // just before the trailing anchor is still the end of the document
    expect(serializePosition(doc, parser, doc, 2)).toEqual([[1], 5]);
    // round-trips through findPosition
    const domPos = toRange(findPosition(doc, parser, [[1], 5]));
    expect(serializePosition(doc, parser, ...domPos)).toEqual([[1], 5]);
  });

  it("trailing comment anchor: Ctrl+A end resolves to end of last block", () => {
    const doc = build([h("p", ["Hello"]), h("p", ["world"]), comment()]);
    expect(serializePosition(doc, parser, doc, 0)).toEqual([[0], 0]);
    expect(serializePosition(doc, parser, doc, 3)).toEqual([[1], 5]);
  });

  it("comments interspersed around every block", () => {
    const doc = build([
      comment(),
      h("p", ["Hello"]),
      comment(),
      h("p", ["world"]),
      comment(),
    ]);
    expect(serializePosition(doc, parser, doc, 0)).toEqual([[0], 0]);
    expect(serializePosition(doc, parser, doc, 5)).toEqual([[1], 5]);
    // boundary on the comment between the blocks -> start of the next block
    expect(serializePosition(doc, parser, doc, 2)).toEqual([[1], 0]);
  });

  it("empty-text anchor between blocks: caret on the anchor resolves forward", () => {
    const anchor = emptyText();
    const doc = build([h("p", ["Hello"]), anchor, h("p", ["world"])]);
    // caret parked directly on the anchor node (the click / phantom-caret case)
    expect(serializePosition(doc, parser, anchor, 0)).toEqual([[1], 0]);
    // and via the parent-relative offset
    expect(serializePosition(doc, parser, doc, 1)).toEqual([[1], 0]);
  });

  it("leading anchors resolve forward to the first block", () => {
    const doc = build([comment(), emptyText(), h("p", ["Hello"])]);
    expect(serializePosition(doc, parser, doc, 0)).toEqual([[0], 0]);
    // caret parked directly on the leading comment
    expect(serializePosition(doc, parser, doc.childNodes[0]!, 0)).toEqual([
      [0],
      0,
    ]);
  });
}
