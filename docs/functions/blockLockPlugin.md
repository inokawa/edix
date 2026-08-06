[**API**](../API.md)

***

# Function: blockLockPlugin()

> **blockLockPlugin**\<`T`\>(`editor`, `options`): `void`

Defined in: [plugins/blockLock.ts:23](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/plugins/blockLock.ts#L23)

A plugin to make specific blocks read-only.

Locked blocks can still be selected and copied, but operations editing them are cancelled,
except ones that unlock the block and ones targeting the root (e.g. undo / redo).

## Type Parameters

### T

`T` *extends* `DocNode`

## Parameters

### editor

[`Editor`](../interfaces/Editor.md)\<`T`\>

### options

#### isLocked

(`node`) => `boolean`

A function to check if the block is locked or not.

## Returns

`void`
