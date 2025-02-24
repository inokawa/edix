[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`EditableSchema`](../type-aliases/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...) extends (...) ? (...) : (...) \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...)\[(...)\] extends EditableVoidSerializer\<(...)\> ? D : never \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/custom.ts:41](https://github.com/inokawa/edix/blob/85c2a124fd44a8c8104340867b78a503a4b370d2/src/core/schema/custom.ts#L41)

## Type Parameters

• **V** *extends* `Record`\<`string`, [`EditableVoidSerializer`](../interfaces/EditableVoidSerializer.md)\<`any`\>\>

• **M** *extends* `boolean` = `false`

## Parameters

### \_\_namedParameters

#### multiline

`M`

#### void

`V`

## Returns

[`EditableSchema`](../type-aliases/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...) extends (...) ? (...) : (...) \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...)\[(...)\] extends EditableVoidSerializer\<(...)\> ? D : never \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>
