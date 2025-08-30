[**API**](../API.md)

***

# Interface: Editor

Defined in: [editor.ts:121](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L121)

Methods of editor instance.

## Properties

### input()

> **input**: (`element`) => () => `void`

Defined in: [editor.ts:126](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L126)

A function to make DOM editable.

#### Parameters

##### element

`HTMLElement`

#### Returns

A function to stop subscribing DOM changes and restores previous DOM state.

> (): `void`

##### Returns

`void`

***

### command()

> **command**: \<`A`\>(`fn`, ...`args`) => `void`

Defined in: [editor.ts:132](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L132)

Dispatches editing command.

#### Type Parameters

##### A

`A` *extends* `unknown`[]

#### Parameters

##### fn

[`EditorCommand`](../type-aliases/EditorCommand.md)\<`A`\>

command function

##### args

...`A`

arguments of command

#### Returns

`void`

***

### readonly()

> **readonly**: (`value`) => `void`

Defined in: [editor.ts:137](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/editor.ts#L137)

Changes editor's read-only state.

#### Parameters

##### value

`boolean`

`true` to read-only. `false` to editable.

#### Returns

`void`
