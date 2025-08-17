# edix

![npm](https://img.shields.io/npm/v/edix) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/edix) [![check](https://github.com/inokawa/edix/actions/workflows/check.yml/badge.svg)](https://github.com/inokawa/edix/actions/workflows/check.yml) [![demo](https://github.com/inokawa/edix/actions/workflows/demo.yml/badge.svg)](https://github.com/inokawa/edix/actions/workflows/demo.yml)

> An experimental, framework agnostic, small (4kB+) [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) state manager.

## Motivation

Web editing is so hard even today. There are excellent libraries to make complex rich text editor, but they are too much for small purposes. Native [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element is accessible and easy to use, but it's hardly customizable.

[contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) attribute is a primitive for rich text editing, but as you may know it has [so many problems](https://github.com/grammarly/contenteditable). It has many edge case bugs, and has cross browser/OS/input device problems. And it doesn't work well with declarative frontend frameworks... However, at least the core of contenteditable is stable and it works in all browsers except the inconsistencies. This library aims to fill that gap, fix contenteditable to fit modern web development.

## Demo

- [React Storybook](https://inokawa.github.io/edix/)
- [Framework examples](#other-examples)

## Install

```sh
npm install edix
```

`typescript >=5.0` is recommended.

### Supported browsers

Browser versions supporting [beforeinput event](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforeinput_event#browser_compatibility) are supported.

Mobile browsers are also supported, but with some issues (https://github.com/inokawa/edix/issues/97).

## Getting started

1. Define your contents declaratively. There are rules you have to follow:

   - You must render `<br/>` in empty row (limitation of contenteditable).
   - If `multiline` option is
     - `false` or undefined, direct children of the root are treated as inline nodes.
     - `true`, direct children of the root are treated as rows. They must be elements, not text.
   - (TODO)

2. Call `editable` on mount, with `HTMLElement` which is the root of editable contents.
3. Update your state with `onChange`, which will be called on edit.
4. Call `dispose` on unmount for cleanup.

Here is an example for React.

### Single line

```tsx
import { useState, useEffect, useRef } from "react";
import { editable, plainSchema } from "edix";

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Hello world.");

  useEffect(() => {
    // 2. init
    const editor = editable(ref.current, {
      schema: plainSchema(),
      onChange: (v) => {
        // 3. update state
        setValue(v);
      },
    });
    return () => {
      // 4. cleanup
      editor.dispose();
    };
  }, []);

  // 1. render contents from state
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8,
      }}
    >
      {value ? value : <br />}
    </div>
  );
};
```

### Multi line

```tsx
import { useState, useEffect, useRef } from "react";
import { editable, plainSchema } from "edix";

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Hello world.");

  useEffect(() => {
    // 2. init
    const editor = editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: (v) => {
        // 3. update state
        setValue(v);
      },
    });
    return () => {
      // 4. cleanup
      editor.dispose();
    };
  }, []);

  // 1. render contents from state
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8,
      }}
    >
      {value.split("\n").map((t, i) => (
        <div key={i}>{t ? t : <br />}</div>
      ))}
    </div>
  );
};
```

### Other examples

- React ([Demo](https://inokawa.github.io/edix/react), [Source](./examples/react))
- Vue ([Demo](https://inokawa.github.io/edix/vue), [Source](./examples/vue))
- Svelte ([Demo](https://inokawa.github.io/edix/svelte), [Source](./examples/svelte))
- Solid ([Demo](https://inokawa.github.io/edix/solid), [Source](./examples/solid))
- Angular ([Demo](https://inokawa.github.io/edix/angular), [Source](./examples/angular))
- Preact ([Demo](https://inokawa.github.io/edix/preact), [Source](./examples/preact))
- Qwik ([Source](./examples/qwik))
- Vanilla ([Demo](https://inokawa.github.io/edix/vanilla), [Source](./examples/vanilla))

...and more! Contribution welcome!

## Documentation

- [API reference](./docs/API.md)

## Contribute

All contributions are welcome.
If you find a problem, feel free to create an [issue](https://github.com/inokawa/edix/issues) or a [PR](https://github.com/inokawa/edix/pulls). If you have a question, ask in [discussions](https://github.com/inokawa/edix/discussions).

### Making a Pull Request

1. Fork this repo.
2. Run `npm install`.
3. Commit your fix.
4. Make a PR and confirm all the CI checks passed.

## Inspirations

- Many great text editor libraries ([ProseMirror](https://prosemirror.net/), [Lexical](https://github.com/facebook/lexical), [Slate](https://github.com/ianstormtaylor/slate), [Quill](https://github.com/slab/quill), [Draft.js](https://github.com/facebookarchive/draft-js), etc.)
- [rich-textarea](https://github.com/inokawa/rich-textarea) (my early work)
- [use-editable](https://github.com/FormidableLabs/use-editable)
- [@react-libraries/markdown-editor](https://github.com/ReactLibraries/markdown-editor)
- [Textbus](https://github.com/textbus/textbus)
- [vistree](https://github.com/mizchi/vistree)
- Proposed [EditContext API](https://github.com/w3c/edit-context)
- Proposed [Richer Text Fields](https://open-ui.org/components/richer-text-fields.explainer/) in [Open UI](https://open-ui.org/)
