[**API**](../API.md)

***

# Function: mapPosition()

> **mapPosition**(`position`, `op`, `stickBefore?`): `number`

Defined in: [doc/operation.ts:249](https://github.com/inokawa/editate/blob/a521ba6024711e4d344001f6ed11da96554d4213/src/doc/operation.ts#L249)

Remap a position through the given operation.

## Parameters

### position

`number`

### op

[`Operation`](../type-aliases/Operation.md)

### stickBefore?

`boolean`

`true` to keep the position in place when content is inserted at it, instead of moving it after the inserted content.

## Returns

`number`
