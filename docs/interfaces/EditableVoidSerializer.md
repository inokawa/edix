[**API**](../API.md)

***

# Interface: EditableVoidSerializer\<T\>

Defined in: [schema/structured.ts:5](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/structured.ts#L5)

## Type Parameters

• **T**

## Properties

### is()

> **is**: (`node`) => `boolean`

Defined in: [schema/structured.ts:6](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/structured.ts#L6)

#### Parameters

##### node

`HTMLElement`

#### Returns

`boolean`

***

### data()

> **data**: (`node`) => `T`

Defined in: [schema/structured.ts:7](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/structured.ts#L7)

#### Parameters

##### node

`HTMLElement`

#### Returns

`T`

***

### plain()

> **plain**: (`data`) => `string`

Defined in: [schema/structured.ts:8](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/structured.ts#L8)

#### Parameters

##### data

`T`

#### Returns

`string`
