[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:97](https://github.com/inokawa/edix/blob/01d58ece64bb1beb7c3cb038988926f097264356/src/core/editable.ts#L97)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:101](https://github.com/inokawa/edix/blob/01d58ece64bb1beb7c3cb038988926f097264356/src/core/editable.ts#L101)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editable.ts:106](https://github.com/inokawa/edix/blob/01d58ece64bb1beb7c3cb038988926f097264356/src/core/editable.ts#L106)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
