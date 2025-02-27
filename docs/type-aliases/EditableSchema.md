[**API**](../API.md)

***

# Type Alias: EditableSchema\<T\>

> **EditableSchema**\<`T`\>: `object`

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/3b39c30ee6a7ee9a5e705005551e6fd2e6c7ae38/src/core/schema/types.ts#L3)

## Type Parameters

• **T**

## Type declaration

### single

> **single**: `boolean`

### data()

> **data**: (`snapshot`) => `T`

#### Parameters

##### snapshot

`DomSnapshot`

#### Returns

`T`

### copy()

> **copy**: (`dataTransfer`, `snapshot`, `dom`) => `void`

#### Parameters

##### dataTransfer

`DataTransfer`

##### snapshot

`DomSnapshot`

##### dom

`Node`

#### Returns

`void`

### paste()

> **paste**: (`dataTransfer`) => `Node` \| `string`

#### Parameters

##### dataTransfer

`DataTransfer`

#### Returns

`Node` \| `string`
