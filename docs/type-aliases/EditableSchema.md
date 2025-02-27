[**API**](../API.md)

***

# Type Alias: EditableSchema\<T\>

> **EditableSchema**\<`T`\>: `object`

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/f0cba21efc7fe6a2310e4e8cc68ba696c9ddc746/src/core/schema/types.ts#L3)

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

### plain()

> **plain**: (`snapshot`) => `string`

#### Parameters

##### snapshot

`DomSnapshot`

#### Returns

`string`

### paste()

> **paste**: (`dataTransfer`) => `Node` \| `string`

#### Parameters

##### dataTransfer

`DataTransfer`

#### Returns

`Node` \| `string`
