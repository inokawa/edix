[**API**](../API.md)

***

# Function: Format()

> **Format**\<`T`, `N`, `K`\>(`this`, `key`, `value`, `range`): `void`

Defined in: [commands.ts:83](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/commands.ts#L83)

Format content in the selection or specified range.

## Type Parameters

### T

`T` *extends* `DocNode`

### N

`N` *extends* `Omit`\<`InferNode`\<`T`\>, `"text"`\>

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### this

[`Editor`](../interfaces/Editor.md)\<`T`\>

### key

`K`

### value

`N`\[`K`\]

### range

`PositionRange` = `...`

## Returns

`void`
