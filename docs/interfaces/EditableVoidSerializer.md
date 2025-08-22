[**API**](../API.md)

***

# Interface: EditableVoidSerializer\<T\>

Defined in: [schema/structured.ts:8](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/structured.ts#L8)

## Type Parameters

### T

`T`

## Properties

### is()

> **is**: (`node`) => `boolean`

Defined in: [schema/structured.ts:9](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/structured.ts#L9)

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### data()

> **data**: (`node`) => `T`

Defined in: [schema/structured.ts:10](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/structured.ts#L10)

#### Parameters

##### node

`HTMLElement`

#### Returns

`T`

***

### plain()

> **plain**: (`data`) => `string`

Defined in: [schema/structured.ts:11](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/structured.ts#L11)

#### Parameters

##### data

`T`

#### Returns

`string`
