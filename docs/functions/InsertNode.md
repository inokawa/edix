[**API**](../API.md)

***

# Function: InsertNode()

> **InsertNode**\<`T`\>(`this`, `node`, `position`): `void`

Defined in: [commands.ts:41](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/commands.ts#L41)

Insert node at the caret or specified position.

## Type Parameters

### T

`T` *extends* `DocNode`

## Parameters

### this

[`Editor`](../interfaces/Editor.md)\<`T`\>

### node

`Exclude`\<`InferNode`\<`T`\>, `TextNode`\>

### position

`Position` = `...`

## Returns

`void`
