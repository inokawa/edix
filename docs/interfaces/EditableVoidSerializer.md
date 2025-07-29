[**API**](../API.md)

***

# Interface: EditableVoidSerializer\<T\>

Defined in: [schema/structured.ts:7](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/structured.ts#L7)

## Type Parameters

### T

`T`

## Properties

### is()

> **is**: (`node`) => `boolean`

Defined in: [schema/structured.ts:8](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/structured.ts#L8)

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### data()

> **data**: (`node`) => `T`

Defined in: [schema/structured.ts:9](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/structured.ts#L9)

#### Parameters

##### node

`HTMLElement`

#### Returns

`T`

***

### plain()

> **plain**: (`data`) => `string`

Defined in: [schema/structured.ts:10](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/structured.ts#L10)

#### Parameters

##### data

`T`

#### Returns

`string`
