# Class: TrytesHelper

Helper functions for use with trytes.

## Table of contents

### Properties

- [ALPHABET](TrytesHelper.md#alphabet)

### Methods

- [isHash](TrytesHelper.md#ishash)
- [isTag](TrytesHelper.md#istag)
- [isTrytes](TrytesHelper.md#istrytes)
- [toTrits](TrytesHelper.md#totrits)
- [fromTrits](TrytesHelper.md#fromtrits)
- [tritsValue](TrytesHelper.md#tritsvalue)
- [fromAscii](TrytesHelper.md#fromascii)
- [toAscii](TrytesHelper.md#toascii)
- [objectToTrytes](TrytesHelper.md#objecttotrytes)
- [objectFromTrytes](TrytesHelper.md#objectfromtrytes)
- [stringToTrytes](TrytesHelper.md#stringtotrytes)
- [stringFromTrytes](TrytesHelper.md#stringfromtrytes)
- [packTrytes](TrytesHelper.md#packtrytes)
- [unpackTrytes](TrytesHelper.md#unpacktrytes)

### Constructors

- [constructor](TrytesHelper.md#constructor)

## Properties

### ALPHABET

▪ `Static` **ALPHABET**: `string` = `"9ABCDEFGHIJKLMNOPQRSTUVWXYZ"`

All the characters that can be used in trytes.

## Methods

### isHash

▸ `Static` **isHash**(`trytes`): `boolean`

Is the string trytes length 81.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to test. |

#### Returns

`boolean`

True if it is trytes 81 chars long.

___

### isTag

▸ `Static` **isTag**(`trytes`): `boolean`

Is the string trytes length 27.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to test. |

#### Returns

`boolean`

True if it is trytes 27 chars long.

___

### isTrytes

▸ `Static` **isTrytes**(`trytes`): `boolean`

Is the string trytes of any length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to test. |

#### Returns

`boolean`

True if it is trytes.

___

### toTrits

▸ `Static` **toTrits**(`value`): `Int8Array`

Create a trits array from trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Trytes used to create trits. |

#### Returns

`Int8Array`

The trits array.

___

### fromTrits

▸ `Static` **fromTrits**(`trits`): `string`

Get trytes from trits array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trits` | `Int8Array` | The trits to convert to trytes. |

#### Returns

`string`

Trytes.

___

### tritsValue

▸ `Static` **tritsValue**(`trits`): `number`

Convert trits to an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trits` | `Int8Array` | The trits to convert. |

#### Returns

`number`

The trits converted to number.

___

### fromAscii

▸ `Static` **fromAscii**(`value`): `string`

Convert a string value into trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | The value to convert into trytes. |

#### Returns

`string`

The trytes representation of the value.

___

### toAscii

▸ `Static` **toAscii**(`trytes`): `string`

Convert trytes into a string value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to convert into a string value. |

#### Returns

`string`

The string value converted from the trytes.

___

### objectToTrytes

▸ `Static` **objectToTrytes**(`obj`): `string`

Convert an object to Trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `unknown` | The obj to encode. |

#### Returns

`string`

The encoded trytes value.

___

### objectFromTrytes

▸ `Static` **objectFromTrytes**<`T`\>(`trytes`): `undefined` \| `T`

Convert an object from Trytes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to decode. |

#### Returns

`undefined` \| `T`

The decoded object.

___

### stringToTrytes

▸ `Static` **stringToTrytes**(`str`): `string`

Convert a string to Trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to encode. |

#### Returns

`string`

The encoded trytes value.

___

### stringFromTrytes

▸ `Static` **stringFromTrytes**(`trytes`): `undefined` \| `string`

Convert a string from Trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to decode. |

#### Returns

`undefined` \| `string`

The decoded string.

___

### packTrytes

▸ `Static` **packTrytes**(`trytes`): `Uint8Array`

Pack trytes into bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trytes` | `string` | The trytes to pack. |

#### Returns

`Uint8Array`

The packed trytes.

___

### unpackTrytes

▸ `Static` **unpackTrytes**(`packed`): `string`

Unpack bytes into trytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packed` | `Uint8Array` | The packed trytes to unpack. |

#### Returns

`string`

The unpacked trytes.

## Constructors

### constructor

• **new TrytesHelper**()
