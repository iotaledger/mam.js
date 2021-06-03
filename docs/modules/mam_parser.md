[@iota/mam.js](../README.md) / mam/parser

# Module: mam/parser

## Table of contents

### Functions

- [parseMessage](mam_parser.md#parsemessage)

## Functions

### parseMessage

▸ **parseMessage**(`payload`, `root`, `channelKey?`): `Object`

Parse the trytes back to the original message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `string` | The trytes to decode. |
| `root` | `string` | The root for the message. |
| `channelKey?` | `string` | The key used to encode the data. |

#### Returns

`Object`

The decoded message.

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The decoded message. |
| `nextRoot` | `string` | The next root. |
