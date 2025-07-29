[**API**](../API.md)

***

# Interface: DocSchema\<T\>

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L3)

## Type Parameters

### T

`T`

## Properties

### single

> **single**: `boolean`

Defined in: [schema/types.ts:4](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L4)

***

### js()

> **js**: (`doc`) => `T`

Defined in: [schema/types.ts:5](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L5)

#### Parameters

##### doc

`DocFragment`

#### Returns

`T`

***

### void()

> **void**: (`element`) => `void` \| `Record`\<`string`, `unknown`\>

Defined in: [schema/types.ts:6](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L6)

#### Parameters

##### element

`Element`

#### Returns

`void` \| `Record`\<`string`, `unknown`\>

***

### copy()

> **copy**: (`dataTransfer`, `doc`, `dom`) => `void`

Defined in: [schema/types.ts:7](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L7)

#### Parameters

##### dataTransfer

`DataTransfer`

##### doc

`DocFragment`

##### dom

() => `Node`

#### Returns

`void`

***

### paste()

> **paste**: (`dataTransfer`, `readDom`) => `DocFragment`

Defined in: [schema/types.ts:8](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/types.ts#L8)

#### Parameters

##### dataTransfer

`DataTransfer`

##### readDom

(`node`) => `DocFragment`

#### Returns

`DocFragment`
