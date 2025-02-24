[**API**](../API.md)

***

# Type Alias: EditableSchema\<T\>

> **EditableSchema**\<`T`\>: `object`

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/85c2a124fd44a8c8104340867b78a503a4b370d2/src/core/schema/types.ts#L3)

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
