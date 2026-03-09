[**API**](../API.md)

***

# Function: htmlPaste()

> **htmlPaste**\<`T`\>(`serializeText`, `serializers`): [`PasteExtension`](../type-aliases/PasteExtension.md)

Defined in: [extensions/paste/html.ts:9](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/extensions/paste/html.ts#L9)

An extension to handle pasting / dropping from HTML.

## Type Parameters

### T

`T` *extends* `DocNode`

## Parameters

### serializeText

(`t`) => `Extract`\<`InferNode`\<`T`\>, `TextNode`\>

### serializers

(`node`) => `void` \| `Exclude`\<`InferNode`\<`T`\>, `TextNode`\>[] = `[]`

## Returns

[`PasteExtension`](../type-aliases/PasteExtension.md)
