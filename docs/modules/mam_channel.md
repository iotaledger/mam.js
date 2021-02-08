[@iota/mam-chrysalis.js](../README.md) / mam/channel

# Module: mam/channel

## Table of contents

### Functions

- [channelRoot](mam_channel.md#channelroot)
- [createChannel](mam_channel.md#createchannel)
- [createMessage](mam_channel.md#createmessage)

## Functions

### channelRoot

▸ **channelRoot**(`channelState`: [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md)): *string*

Get the root of the channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channelState` | [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md) | The channel state to get the root.   |

**Returns:** *string*

The root.

___

### createChannel

▸ **createChannel**(`seed`: *string*, `security`: *number*, `mode`: MamMode, `sideKey?`: *string*): [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md)

Create a new channel object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`seed` | *string* | The seed for the channel.   |
`security` | *number* | The security level for the channel.   |
`mode` | MamMode | The mode for the channel.   |
`sideKey?` | *string* | The side key to use for restricted mode.   |

**Returns:** [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md)

The new channel state.

___

### createMessage

▸ **createMessage**(`channelState`: [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md), `message`: *string*): [*IMamMessage*](../interfaces/models_imammessage.imammessage.md)

Prepare a message on the mam channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channelState` | [*IMamChannelState*](../interfaces/models_imamchannelstate.imamchannelstate.md) | The channel to prepare the message for.   |
`message` | *string* | The trytes to include in the message.   |

**Returns:** [*IMamMessage*](../interfaces/models_imammessage.imammessage.md)

The prepared message, the channel state will also be updated.
