# edix

![npm](https://img.shields.io/npm/v/edix) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/edix) [![check](https://github.com/inokawa/edix/actions/workflows/check.yml/badge.svg)](https://github.com/inokawa/edix/actions/workflows/check.yml) [![demo](https://github.com/inokawa/edix/actions/workflows/demo.yml/badge.svg)](https://github.com/inokawa/edix/actions/workflows/demo.yml)

> An experimental, framework agnostic, small (~2.5kB) [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) state manager.

## Motivation

TODO

## Demo

- [React Storybook](https://inokawa.github.io/edix/)
- [Framework examples](#other-examples)

## Install

```sh
npm install edix
```

## Getting started

1. Define your contents declaratively. There are rules you have to follow:

   - Direct children of the root are treated as rows. They must be elements, not text.
   - You must render `<br/>` in empty row (limitation of contenteditable).
   - (TODO)

2. Call `editable` on mount, with `HTMLElement` which is the root of editable contents.
3. Update your state with `onChange`, which will be called on edit.
4. Call return value of `editable` on unmount for cleanup.

Here is an example for React.

```tsx
import { useState, useEffect, useRef } from "react";
import { editable } from "edix";

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Hello world.");

  useEffect(() => {
    // 2. init
    const cleanup = editable(ref.current, {
      onChange: (v) => {
        // 3. update state
        setValue(v);
      },
    });
    return () => {
      // 4. cleanup
      cleanup();
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

- [React](./examples/react)
- [Vue](./examples/vue)
- [Svelte](./examples/svelte)
- [Solid](./examples/solid)
- [Angular](./examples/angular)
- [Preact](./examples/preact)
- [Qwik](./examples/qwik)

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

- [rich-textarea](https://github.com/inokawa/rich-textarea) (my early work)
- [use-editable](https://github.com/FormidableLabs/use-editable)
- Some great text editor libraries ([prosemirror](https://prosemirror.net/), [lexical](https://github.com/facebook/lexical), [slate](https://github.com/ianstormtaylor/slate), etc.)
- Proposed [EditContext API](https://github.com/w3c/edit-context)
- Proposed [Richer Text Fields](https://open-ui.org/components/richer-text-fields.explainer/) in [Open UI](https://open-ui.org/)
