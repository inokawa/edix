[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`DocSchema`](../interfaces/DocSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/structured.ts:49](https://github.com/inokawa/edix/blob/431c5fd4f91f9cb402acd852f95a41766a4cc2e5/src/schema/structured.ts#L49)

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
