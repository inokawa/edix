[**API**](../API.md)

***

# Interface: EditorOptions\<T\>

Defined in: [editor.ts:93](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L93)

Options of [createEditor](../functions/createEditor.md).

## Type Parameters

### T

`T`

## Properties

### schema

> **schema**: [`DocSchema`](DocSchema.md)\<`T`\>

Defined in: [editor.ts:97](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L97)

TODO

***

### doc

> **doc**: `T`

Defined in: [editor.ts:101](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L101)

Initial document state.

***

### isBlock()?

> `optional` **isBlock**: (`node`) => `boolean`

Defined in: [editor.ts:105](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L105)

TODO

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### onChange()

> **onChange**: (`doc`) => `void`

Defined in: [editor.ts:109](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L109)

Callback invoked when document state changes.

#### Parameters

##### doc

`T`

#### Returns

`void`

***

### onKeyDown()?

> `optional` **onKeyDown**: (`keyboard`) => `boolean` \| `void`

Defined in: [editor.ts:115](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L115)

Callback invoked when `keydown` events are dispatched.

Return `true` if you want to cancel the editor's default behavior.

#### Parameters

##### keyboard

[`KeyboardPayload`](../type-aliases/KeyboardPayload.md)

#### Returns

`boolean` \| `void`
