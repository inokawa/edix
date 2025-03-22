[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:97](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/editable.ts#L97)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:101](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/editable.ts#L101)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editable.ts:106](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/editable.ts#L106)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
