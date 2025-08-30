[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`DocSchema`](../interfaces/DocSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/structured.ts:49](https://github.com/inokawa/edix/blob/17eb027c6558be0f6b434fe5269f1a66a1077362/src/schema/structured.ts#L49)

Defines structured text schema.

## Type Parameters

### V

`V` *extends* `Record`\<`string`, [`EditableVoidSerializer`](../interfaces/EditableVoidSerializer.md)\<`any`\>\> = \{ \}

### M

`M` *extends* `boolean` = `false`

## Parameters

### \_\_namedParameters

#### multiline?

`M`

#### void?

`V` = `...`

## Returns

[`DocSchema`](../interfaces/DocSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>
