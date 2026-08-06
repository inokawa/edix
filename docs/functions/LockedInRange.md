[**API**](../API.md)

***

# Function: LockedInRange()

> **LockedInRange**(`editor`, `range?`): `boolean`

Defined in: [plugins/blockLock.ts:126](https://github.com/inokawa/editate/blob/fc2a276691616b582f8904cca31ccbe1682d98e2/src/plugins/blockLock.ts#L126)

Check if the selection or specified range touches a locked block, which means editing operations on it will be cancelled.

## Parameters

### editor

[`Editor`](../interfaces/Editor.md)

### range?

`Range` = `...`

## Returns

`boolean`
