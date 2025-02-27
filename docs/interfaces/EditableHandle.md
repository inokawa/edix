[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:90](https://github.com/inokawa/edix/blob/f0cba21efc7fe6a2310e4e8cc68ba696c9ddc746/src/core/editable.ts#L90)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:94](https://github.com/inokawa/edix/blob/f0cba21efc7fe6a2310e4e8cc68ba696c9ddc746/src/core/editable.ts#L94)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editable.ts:99](https://github.com/inokawa/edix/blob/f0cba21efc7fe6a2310e4e8cc68ba696c9ddc746/src/core/editable.ts#L99)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
