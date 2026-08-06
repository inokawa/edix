[**API**](../API.md)

***

# Interface: Editor\<T\>

Defined in: [editor.ts:181](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L181)

The editor instance.

## Type Parameters

### T

`T` *extends* `DocNode` = `DocNode`

## Methods

### apply()

> **apply**(`op`): `this`

Defined in: [editor.ts:193](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L193)

Dispatches editing operations.

#### Parameters

##### op

[`Operation`](../type-aliases/Operation.md) \| [`Operation`](../type-aliases/Operation.md)[]

[Operation](../type-aliases/Operation.md)

#### Returns

`this`

***

### exec()

#### Call Signature

> **exec**\<`A`\>(`fn`, ...`args`): `this`

Defined in: [editor.ts:199](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L199)

Executes a function with editor bound as context.

##### Type Parameters

###### A

`A` *extends* `unknown`[]

##### Parameters

###### fn

`EditorCommandOrPlugin`\<`A`, `T`\>

EditorCommandOrPlugin or EditorQuery

###### args

...`A`

arguments of the function

##### Returns

`this`

#### Call Signature

> **exec**\<`A`, `V`\>(`fn`, ...`args`): `V`

Defined in: [editor.ts:203](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L203)

##### Type Parameters

###### A

`A` *extends* `unknown`[]

###### V

`V`

##### Parameters

###### fn

`EditorQuery`\<`A`, `V`, `T`\>

###### args

...`A`

##### Returns

`V`

***

### on()

> **on**\<`K`\>(`key`, `callback`): () => `void`

Defined in: [editor.ts:208](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L208)

A function to subscribe editor events.

#### Type Parameters

##### K

`K` *extends* keyof `EditorEventMap`

#### Parameters

##### key

`K`

##### callback

`EditorEventMap`\[`K`\]

#### Returns

cleanup function

() => `void`

***

### hook()

> **hook**\<`K`\>(`key`, `callback`): () => `void`

Defined in: [editor.ts:216](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L216)

A function to register editor hooks.

#### Type Parameters

##### K

`K` *extends* keyof `EditorHookMap`

#### Parameters

##### key

`K`

##### callback

`EditorHookMap`\[`K`\]

#### Returns

cleanup function

() => `void`

***

### get()

> **get**\<`V`\>(`key`): `V`

Defined in: [editor.ts:223](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L223)

Get a value from the context.

#### Type Parameters

##### V

`V`

#### Parameters

##### key

[`EditorContext`](../type-aliases/EditorContext.md)\<`V`\>

#### Returns

`V`

***

### set()

> **set**\<`V`\>(`key`, `value`): `this`

Defined in: [editor.ts:227](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L227)

Set a value for the context.

#### Type Parameters

##### V

`V`

#### Parameters

##### key

[`EditorContext`](../type-aliases/EditorContext.md)\<`V`\>

##### value

`V`

#### Returns

`this`

## Properties

### doc

> `readonly` **doc**: `T`

Defined in: [editor.ts:182](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L182)

***

### selection

> **selection**: `Selection`

Defined in: [editor.ts:183](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L183)

***

### readonly

> **readonly**: `boolean`

Defined in: [editor.ts:188](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L188)

The getter/setter for the editor's read-only state.
`true` to read-only. `false` to editable.

***

### input

> **input**: (`element`) => () => `void`

Defined in: [editor.ts:232](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/editor.ts#L232)

A function to make DOM editable.

#### Parameters

##### element

`HTMLElement`

#### Returns

A function to stop subscribing DOM changes and restores previous DOM state.

() => `void`
