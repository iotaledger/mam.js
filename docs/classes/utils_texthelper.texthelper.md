[@iota/mam.js](../README.md) / [utils/textHelper](../modules/utils_texthelper.md) / TextHelper

# Class: TextHelper

[utils/textHelper](../modules/utils_texthelper.md).TextHelper

Helper functions for use with text.

## Table of contents

### Constructors

- [constructor](utils_texthelper.texthelper.md#constructor)

### Methods

- [decodeNonASCII](utils_texthelper.texthelper.md#decodenonascii)
- [encodeNonASCII](utils_texthelper.texthelper.md#encodenonascii)

## Constructors

### constructor

• **new TextHelper**()

## Methods

### decodeNonASCII

▸ `Static` **decodeNonASCII**(`value`): `undefined` \| `string`

Decode escaped Non ASCII characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` | The value to decode. |

#### Returns

`undefined` \| `string`

The decoded value.

___

### encodeNonASCII

▸ `Static` **encodeNonASCII**(`value`): `undefined` \| `string`

Encode Non ASCII characters to escaped characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` | The value to encode. |

#### Returns

`undefined` \| `string`

The encoded value.
