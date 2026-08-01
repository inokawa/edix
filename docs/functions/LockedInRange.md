[**API**](../API.md)

***

# Function: LockedInRange()

> **LockedInRange**(`editor`, `range?`): `boolean`

Defined in: [plugins/blockLock.ts:126](https://github.com/inokawa/editate/blob/23457c97437b4d055c99e179979ffe00cd982206/src/plugins/blockLock.ts#L126)

Check if the selection or specified range touches a locked block, which means editing operations on it will be cancelled.

## Parameters

### editor

[`Editor`](../interfaces/Editor.md)

### range?

`Range` = `...`

## Returns

`boolean`
