[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:118](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L118)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:122](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L122)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### command()

> **command**: \<`A`\>(`fn`, ...`args`) => `void`

Defined in: [editable.ts:128](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L128)

Dispatches editing command.

#### Type Parameters

##### A

`A` *extends* `unknown`[]

#### Parameters

##### fn

[`EditableCommand`](../type-aliases/EditableCommand.md)\<`A`\>

command function

##### args

...`A`

arguments of command

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editable.ts:133](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/editable.ts#L133)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
