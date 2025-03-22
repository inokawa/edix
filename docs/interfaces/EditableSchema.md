[**API**](../API.md)

***

# Interface: EditableSchema\<T\>

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L3)

## Type Parameters

• **T**

## Properties

### single

> **single**: `boolean`

Defined in: [schema/types.ts:4](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L4)

***

### js()

> **js**: (`doc`) => `T`

Defined in: [schema/types.ts:5](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L5)

#### Parameters

##### doc

`DocFragment`

#### Returns

`T`

***

### void()

> **void**: (`element`) => `void` \| `Record`\<`string`, `unknown`\>

Defined in: [schema/types.ts:6](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L6)

#### Parameters

##### element

`Element`

#### Returns

`void` \| `Record`\<`string`, `unknown`\>

***

### copy()

> **copy**: (`dataTransfer`, `doc`, `dom`) => `void`

Defined in: [schema/types.ts:7](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L7)

#### Parameters

##### dataTransfer

`DataTransfer`

##### doc

`DocFragment`

##### dom

`Node`

#### Returns

`void`

***

### paste()

> **paste**: (`dataTransfer`) => `string` \| `Node`

Defined in: [schema/types.ts:8](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/types.ts#L8)

#### Parameters

##### dataTransfer

`DataTransfer`

#### Returns

`string` \| `Node`
