[**API**](../API.md)

***

# Interface: DocSchema\<T\>

Defined in: [schema/types.ts:4](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L4)

## Type Parameters

### T

`T`

## Properties

### single

> **single**: `boolean`

Defined in: [schema/types.ts:5](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L5)

***

### js()

> **js**: (`doc`) => `T`

Defined in: [schema/types.ts:6](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L6)

#### Parameters

##### doc

`DocFragment`

#### Returns

`T`

***

### doc()

> **doc**: (`state`) => `DocFragment`

Defined in: [schema/types.ts:7](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L7)

#### Parameters

##### state

`T`

#### Returns

`DocFragment`

***

### copy()

> **copy**: (`dataTransfer`, `doc`, `element`) => `void`

Defined in: [schema/types.ts:8](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L8)

#### Parameters

##### dataTransfer

`DataTransfer`

##### doc

`DocFragment`

##### element

`Element`

#### Returns

`void`

***

### paste()

> **paste**: (`dataTransfer`, `config`) => `DocFragment`

Defined in: [schema/types.ts:13](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/types.ts#L13)

#### Parameters

##### dataTransfer

`DataTransfer`

##### config

`ParserConfig`

#### Returns

`DocFragment`
