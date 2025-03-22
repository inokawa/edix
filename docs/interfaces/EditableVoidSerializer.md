[**API**](../API.md)

***

# Interface: EditableVoidSerializer\<T\>

Defined in: [schema/structured.ts:5](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/structured.ts#L5)

## Type Parameters

• **T**

## Properties

### is()

> **is**: (`node`) => `boolean`

Defined in: [schema/structured.ts:6](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/structured.ts#L6)

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### data()

> **data**: (`node`) => `T`

Defined in: [schema/structured.ts:7](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/structured.ts#L7)

#### Parameters

##### node

`HTMLElement`

#### Returns

`T`

***

### plain()

> **plain**: (`data`) => `string`

Defined in: [schema/structured.ts:8](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/structured.ts#L8)

#### Parameters

##### data

`T`

#### Returns

`string`
