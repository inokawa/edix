[**API**](../API.md)

***

# Interface: EditableSchema\<T\>

Defined in: [schema/types.ts:3](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L3)

## Type Parameters

• **T**

## Properties

### single

> **single**: `boolean`

Defined in: [schema/types.ts:4](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L4)

***

### js()

> **js**: (`doc`) => `T`

Defined in: [schema/types.ts:5](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L5)

#### Parameters

##### doc

`DocFragment`

#### Returns

`T`

***

### void()

> **void**: (`element`) => `void` \| `Record`\<`string`, `unknown`\>

Defined in: [schema/types.ts:6](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L6)

#### Parameters

##### element

`Element`

#### Returns

`void` \| `Record`\<`string`, `unknown`\>

***

### copy()

> **copy**: (`dataTransfer`, `doc`, `dom`) => `void`

Defined in: [schema/types.ts:7](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L7)

#### Parameters

##### dataTransfer

`DataTransfer`

##### doc

`DocFragment`

##### dom

`Node`

#### Returns

`void`

***

### paste()

> **paste**: (`dataTransfer`) => `string` \| `Node`

Defined in: [schema/types.ts:8](https://github.com/inokawa/edix/blob/131b1e7d8f29930f3bf50bbd826431898e430ef2/src/core/schema/types.ts#L8)

#### Parameters

##### dataTransfer

`DataTransfer`

#### Returns

`string` \| `Node`
