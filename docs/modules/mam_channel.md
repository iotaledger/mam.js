[@iota/mam.js](../README.md) / mam/channel

# Module: mam/channel

## Table of contents

### Functions

- [channelRoot](mam_channel.md#channelroot)
- [createChannel](mam_channel.md#createchannel)
- [createMessage](mam_channel.md#createmessage)

## Functions

### channelRoot

▸ **channelRoot**(`channelState`): `string`

Get the root of the channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelState` | [`IMamChannelState`](../interfaces/models_IMamChannelState.IMamChannelState.md) | The channel state to get the root. |

#### Returns

`string`

The root.

___

### createChannel

▸ **createChannel**(`seed`, `security`, `mode`, `sideKey?`): [`IMamChannelState`](../interfaces/models_IMamChannelState.IMamChannelState.md)

Create a new channel object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed for the channel. |
| `security` | `number` | The security level for the channel. |
| `mode` | [`MamMode`](models_mamMode.md#mammode) | The mode for the channel. |
| `sideKey?` | `string` | The side key to use for restricted mode. |

#### Returns

[`IMamChannelState`](../interfaces/models_IMamChannelState.IMamChannelState.md)

The new channel state.

___

### createMessage

▸ **createMessage**(`channelState`, `message`): [`IMamMessage`](../interfaces/models_IMamMessage.IMamMessage.md)

Prepare a message on the mam channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelState` | [`IMamChannelState`](../interfaces/models_IMamChannelState.IMamChannelState.md) | The channel to prepare the message for. |
| `message` | `string` | The trytes to include in the message. |

#### Returns

[`IMamMessage`](../interfaces/models_IMamMessage.IMamMessage.md)

The prepared message, the channel state will also be updated.
