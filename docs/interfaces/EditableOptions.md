[**API**](../API.md)

***

# Interface: EditableOptions\<T\>

Defined in: [editable.ts:94](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L94)

Options of [editable](../functions/editable.md).

## Type Parameters

### T

`T`

## Properties

### schema

> **schema**: [`DocSchema`](DocSchema.md)\<`T`\>

Defined in: [editable.ts:98](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L98)

TODO

***

### isBlock()?

> `optional` **isBlock**: (`node`) => `boolean`

Defined in: [editable.ts:102](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L102)

TODO

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### onChange()

> **onChange**: (`value`) => `void`

Defined in: [editable.ts:106](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L106)

Callback invoked when document state changes.

#### Parameters

##### value

`T`

#### Returns

`void`

***

### onKeyDown()?

> `optional` **onKeyDown**: (`keyboard`) => `boolean` \| `void`

Defined in: [editable.ts:112](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L112)

Callback invoked when `keydown` events are dispatched.

Return `true` if you want to cancel the editor's default behavior.

#### Parameters

##### keyboard

[`KeyboardPayload`](../type-aliases/KeyboardPayload.md)

#### Returns

`boolean` \| `void`
