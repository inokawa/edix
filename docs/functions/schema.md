[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`EditableSchema`](../interfaces/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...) extends (...) ? (...) : (...) \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...)\[(...)\] extends EditableVoidSerializer\<(...)\> ? D : never \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/structured.ts:45](https://github.com/inokawa/edix/blob/01d58ece64bb1beb7c3cb038988926f097264356/src/core/schema/structured.ts#L45)

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

[`EditableSchema`](../interfaces/EditableSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...) extends (...) ? (...) : (...) \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: (...)\[(...)\] extends EditableVoidSerializer\<(...)\> ? D : never \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>
