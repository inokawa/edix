[**API**](../API.md)

***

# Function: ToggleBlockAttr()

> **ToggleBlockAttr**\<`T`, `N`, `K`\>(`editor`, `key`, `onValue`, `offValue`, `offset?`): `void`

Defined in: [commands.ts:150](https://github.com/inokawa/editate/blob/6ccc8f579ec5b2bac90139fe1fe9a402ac5b9cd9/src/commands.ts#L150)

Toggle attr of block node at the caret or specified position.

## Type Parameters

### T

`T` *extends* `DocNode`

### N

`N` *extends* `DocNode` \| `object` & `DocNode`

### K

`K` *extends* `string`

## Parameters

### editor

[`Editor`](../interfaces/Editor.md)\<`T`\>

### key

`K`

### onValue

`ExtractAttrValue`\<`N`, `K`\>

### offValue

`ExtractAttrValue`\<`N`, `K`\>

### offset?

`number` = `...`

## Returns

`void`
