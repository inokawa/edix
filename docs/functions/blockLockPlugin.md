[**API**](../API.md)

***

# Function: blockLockPlugin()

> **blockLockPlugin**\<`T`\>(`editor`, `options`): `void`

Defined in: [plugins/blockLock.ts:23](https://github.com/inokawa/editate/blob/fc2a276691616b582f8904cca31ccbe1682d98e2/src/plugins/blockLock.ts#L23)

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
