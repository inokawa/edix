[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:92](https://github.com/inokawa/edix/blob/209c0f8699b6c4859eabf76831797001cc56c947/src/core/editable.ts#L92)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:96](https://github.com/inokawa/edix/blob/209c0f8699b6c4859eabf76831797001cc56c947/src/core/editable.ts#L96)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editable.ts:101](https://github.com/inokawa/edix/blob/209c0f8699b6c4859eabf76831797001cc56c947/src/core/editable.ts#L101)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
