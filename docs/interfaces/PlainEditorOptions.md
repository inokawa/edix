[**API**](../API.md)

***

# Interface: PlainEditorOptions

Defined in: [presets/plain.ts:8](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/presets/plain.ts#L8)

## Extends

- `Omit`\<[`EditorOptions`](EditorOptions.md)\<`PlainDoc`\>, `"doc"` \| `"schema"` \| `"onChange"`\>

## Properties

### text

> **text**: `string`

Defined in: [presets/plain.ts:15](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/presets/plain.ts#L15)

Initial document text.

***

### singleline?

> `optional` **singleline**: `boolean`

Defined in: [presets/plain.ts:19](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/presets/plain.ts#L19)

TODO

***

### onChange()

> **onChange**: (`text`) => `void`

Defined in: [presets/plain.ts:23](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/presets/plain.ts#L23)

Callback invoked when document changes.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### readonly?

> `optional` **readonly**: `boolean`

Defined in: [editor.ts:110](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L110)

The state editable or not.

#### Inherited from

`Omit.readonly`

***

### plugins?

> `optional` **plugins**: [`EditorPlugin`](EditorPlugin.md)[]

Defined in: [editor.ts:114](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L114)

TODO

#### Inherited from

`Omit.plugins`

***

### keyboard?

> `optional` **keyboard**: [`KeyboardHandler`](../type-aliases/KeyboardHandler.md)[]

Defined in: [editor.ts:120](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L120)

Functions to handle keyboard events.

Return `true` if you want to stop propagation.

#### Inherited from

`Omit.keyboard`

***

### copy?

> `optional` **copy**: \[[`CopyExtension`](../type-aliases/CopyExtension.md), `...rest: CopyExtension[]`\]

Defined in: [editor.ts:125](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L125)

Functions to handle copy events

#### Default

```ts
[plainCopy()]
```

#### Inherited from

`Omit.copy`

***

### paste?

> `optional` **paste**: \[[`PasteExtension`](../type-aliases/PasteExtension.md), `...rest: PasteExtension[]`\]

Defined in: [editor.ts:130](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L130)

Functions to handle paste / drop events

#### Default

```ts
[plainPaste()]
```

#### Inherited from

`Omit.paste`

***

### isBlock()?

> `optional` **isBlock**: (`node`) => `boolean`

Defined in: [editor.ts:134](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L134)

TODO

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

#### Inherited from

`Omit.isBlock`

***

### onError()?

> `optional` **onError**: (`message`) => `void`

Defined in: [editor.ts:144](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L144)

Callback invoked when errors happen.

#### Parameters

##### message

`string`

#### Returns

`void`

#### Default

```ts
console.error
```

#### Inherited from

`Omit.onError`
