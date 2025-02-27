[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`EditableSchema`](../type-aliases/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...) extends (...) ? (...) : (...) \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...)\[(...)\] extends EditableVoidSerializer\<(...)\> ? D : never \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/custom.ts:45](https://github.com/inokawa/edix/blob/f0cba21efc7fe6a2310e4e8cc68ba696c9ddc746/src/core/schema/custom.ts#L45)

Defines structured text schema.

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
