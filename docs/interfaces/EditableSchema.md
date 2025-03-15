[**API**](../API.md)

***

# Interface: EditableSchema\<T\>

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/5dda010c7d491e5c9162d0f17dc6178b28acc47b/src/core/schema/types.ts#L3)

## Type Parameters

• **T**

## Properties

### single

> **single**: `boolean`

Defined in: [schema/types.ts:4](https://github.com/inokawa/edix/blob/5dda010c7d491e5c9162d0f17dc6178b28acc47b/src/core/schema/types.ts#L4)

***

### data()

> **data**: (`snapshot`) => `T`

Defined in: [schema/types.ts:5](https://github.com/inokawa/edix/blob/5dda010c7d491e5c9162d0f17dc6178b28acc47b/src/core/schema/types.ts#L5)

#### Parameters

##### snapshot

`DomSnapshot`

#### Returns

`T`

***

### copy()

> **copy**: (`dataTransfer`, `snapshot`, `dom`) => `void`

Defined in: [schema/types.ts:6](https://github.com/inokawa/edix/blob/5dda010c7d491e5c9162d0f17dc6178b28acc47b/src/core/schema/types.ts#L6)

#### Parameters

##### dataTransfer

`DataTransfer`

##### snapshot

`DomSnapshot`

##### dom

`Node`

#### Returns

`void`

***

### paste()

> **paste**: (`dataTransfer`) => `string` \| `Node`

Defined in: [schema/types.ts:7](https://github.com/inokawa/edix/blob/5dda010c7d491e5c9162d0f17dc6178b28acc47b/src/core/schema/types.ts#L7)

#### Parameters

##### dataTransfer

`DataTransfer`

#### Returns

`string` \| `Node`
