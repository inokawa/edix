[**API**](../API.md)

***

# Class: Transaction

Defined in: [doc/edit.ts:56](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L56)

## Accessors

### ops

#### Get Signature

> **get** **ops**(): readonly `Operation`[]

Defined in: [doc/edit.ts:64](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L64)

##### Returns

readonly `Operation`[]

## Constructors

### Constructor

> **new Transaction**(`ops?`): `Transaction`

Defined in: [doc/edit.ts:60](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L60)

#### Parameters

##### ops?

readonly `Operation`[]

#### Returns

`Transaction`

## Methods

### insertText()

> **insertText**(`start`, `text`): `this`

Defined in: [doc/edit.ts:68](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L68)

#### Parameters

##### start

`Position`

##### text

`string`

#### Returns

`this`

***

### insertFragment()

> **insertFragment**(`start`, `fragment`): `this`

Defined in: [doc/edit.ts:77](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L77)

#### Parameters

##### start

`Position`

##### fragment

readonly readonly `InlineNode`[][]

#### Returns

`this`

***

### delete()

> **delete**(`start`, `end`): `this`

Defined in: [doc/edit.ts:87](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L87)

#### Parameters

##### start

`Position`

##### end

`Position`

#### Returns

`this`

***

### attr()

> **attr**(`start`, `end`, `attr`): `this`

Defined in: [doc/edit.ts:96](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L96)

#### Parameters

##### start

`Position`

##### end

`Position`

##### attr

`Record`\<`string`, `unknown`\>

#### Returns

`this`

***

### select()

> **select**(`anchor?`, `focus?`): `this`

Defined in: [doc/edit.ts:107](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L107)

#### Parameters

##### anchor?

`Position`

##### focus?

`Position`

#### Returns

`this`

***

### transform()

> **transform**(`position`): `Position`

Defined in: [doc/edit.ts:116](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L116)

#### Parameters

##### position

`Position`

#### Returns

`Position`

## Properties

### unsafe

> **unsafe**: `boolean` = `false`

Defined in: [doc/edit.ts:58](https://github.com/inokawa/edix/blob/96295ed67f7c2da9a7e213e46ab3f24cac805db8/src/doc/edit.ts#L58)
