[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`EditableSchema`](../interfaces/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/structured.ts:46](https://github.com/inokawa/edix/blob/6c51a3045dd266d2df11ac3bf40a8c324611c95f/src/core/schema/structured.ts#L46)

Defines structured text schema.

## Type Parameters

• **V** *extends* `Record`\<`string`, [`EditableVoidSerializer`](../interfaces/EditableVoidSerializer.md)\<`any`\>\>

• **M** *extends* `boolean` = `false`

## Parameters

### \_\_namedParameters

#### multiline?

`M`

#### void

`V`

## Returns

[`EditableSchema`](../interfaces/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>
