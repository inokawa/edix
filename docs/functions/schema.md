[**API**](../API.md)

***

# Function: schema()

> **schema**\<`V`, `M`\>(`__namedParameters`): [`DocSchema`](../interfaces/DocSchema.md)\<`M` *extends* `true` ? (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[][] : (\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ type: K; data: ExtractVoidData\<(...)\[(...)\]\> \} \}\[keyof V\]\[K\] \} \| \{ `type`: `"text"`; `text`: `string`; \})[]\>

Defined in: [schema/structured.ts:48](https://github.com/inokawa/edix/blob/48ffe0d01c66f9540b747e27424142d5598f2bec/src/schema/structured.ts#L48)

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
