[**API**](../API.md)

***

# Interface: Editor\<T\>

Defined in: [editor.ts:150](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L150)

The editor instance.

## Type Parameters

### T

`T` *extends* `DocNode` = `DocNode`

## Methods

### apply()

#### Call Signature

> **apply**(`tr`): `this`

Defined in: [editor.ts:163](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L163)

Dispatches editing operations.

##### Parameters

###### tr

[`Transaction`](../classes/Transaction.md)

[Transaction](../classes/Transaction.md) or EditorCommand

##### Returns

`this`

#### Call Signature

> **apply**\<`A`\>(`fn`, ...`args`): `this`

Defined in: [editor.ts:164](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L164)

##### Type Parameters

###### A

`A` *extends* `unknown`[]

##### Parameters

###### fn

`EditorCommand`\<`A`, `T`\>

###### args

...`A`

##### Returns

`this`

## Properties

### doc

> `readonly` **doc**: `T`

Defined in: [editor.ts:151](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L151)

***

### selection

> `readonly` **selection**: `SelectionSnapshot`

Defined in: [editor.ts:152](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L152)

***

### readonly

> **readonly**: `boolean`

Defined in: [editor.ts:157](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L157)

The getter/setter for the editor's read-only state.
`true` to read-only. `false` to editable.

***

### input()

> **input**: (`element`) => () => `void`

Defined in: [editor.ts:169](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/editor.ts#L169)

A function to make DOM editable.

#### Parameters

##### element

`HTMLElement`

#### Returns

A function to stop subscribing DOM changes and restores previous DOM state.

> (): `void`

##### Returns

`void`
