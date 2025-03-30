[**API**](../API.md)

***

# Interface: EditableHandle

Defined in: [editable.ts:97](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/editable.ts#L97)

Methods of editor instance.

## Properties

### dispose()

> **dispose**: () => `void`

Defined in: [editable.ts:101](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/editable.ts#L101)

Disposes editor and restores previous DOM state.

#### Returns

`void`

***

### command()

> **command**: \<`A`\>(`fn`, ...`args`) => `void`

Defined in: [editable.ts:107](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/editable.ts#L107)

Dispatches editing command.

#### Type Parameters

• **A** *extends* `unknown`[]

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

Defined in: [editable.ts:112](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/editable.ts#L112)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
