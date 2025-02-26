[**API**](../API.md)

***

# Type Alias: EditableSchema\<T\>

> **EditableSchema**\<`T`\>: `object`

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/1310bb20e9f231a42c138bb5fc604641e3ec391b/src/core/schema/types.ts#L3)

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
