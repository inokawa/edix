[**API**](../API.md)

***

# Interface: EditableVoidSerializer\<T\>

Defined in: [schema/structured.ts:8](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/schema/structured.ts#L8)

## Type Parameters

### T

`T`

## Properties

### is()

> **is**: (`node`) => `boolean`

Defined in: [schema/structured.ts:9](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/schema/structured.ts#L9)

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### data()

> **data**: (`node`) => `T`

Defined in: [schema/structured.ts:10](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/schema/structured.ts#L10)

#### Parameters

##### node

`HTMLElement`

#### Returns

`T`

***

### plain()

> **plain**: (`data`) => `string`

Defined in: [schema/structured.ts:11](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/schema/structured.ts#L11)

#### Parameters

##### data

`T`

#### Returns

`string`
