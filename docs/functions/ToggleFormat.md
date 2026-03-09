[**API**](../API.md)

***

# Function: ToggleFormat()

> **ToggleFormat**\<`T`\>(`this`, `key`, `range`): `void`

Defined in: [commands.ts:103](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/commands.ts#L103)

Toggle formatting in the selection or specified range.

## Type Parameters

### T

`T` *extends* `DocNode`

## Parameters

### this

[`Editor`](../interfaces/Editor.md)\<`T`\>

### key

`ToggleableKey`\<`Omit`\<`InferNode`\<`T`\>, `"text"`\>\>

### range

`PositionRange` = `...`

## Returns

`void`
