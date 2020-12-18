**[@iota/mam-chrysalis.js](README.md)**

> Globals

# @iota/mam-chrysalis.js

## Index

### Classes

* [TextHelper](classes/texthelper.md)
* [TrytesHelper](classes/tryteshelper.md)

### Interfaces

* [IMamChannelState](interfaces/imamchannelstate.md)
* [IMamFetchedMessage](interfaces/imamfetchedmessage.md)
* [IMamMessage](interfaces/imammessage.md)

### Functions

* [channelRoot](README.md#channelroot)
* [createChannel](README.md#createchannel)
* [createMessage](README.md#createmessage)
* [decodeAddress](README.md#decodeaddress)
* [decodeMessages](README.md#decodemessages)
* [mamAttach](README.md#mamattach)
* [mamFetch](README.md#mamfetch)
* [mamFetchAll](README.md#mamfetchall)
* [parseMessage](README.md#parsemessage)

## Functions

### channelRoot

▸ **channelRoot**(`channelState`: [IMamChannelState](interfaces/imamchannelstate.md)): string

Get the root of the channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channelState` | [IMamChannelState](interfaces/imamchannelstate.md) | The channel state to get the root. |

**Returns:** string

The root.

___

### createChannel

▸ **createChannel**(`seed`: string, `security`: number, `mode`: MamMode, `sideKey?`: undefined \| string): [IMamChannelState](interfaces/imamchannelstate.md)

Create a new channel object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`seed` | string | The seed for the channel. |
`security` | number | The security level for the channel. |
`mode` | MamMode | The mode for the channel. |
`sideKey?` | undefined \| string | The side key to use for restricted mode. |

**Returns:** [IMamChannelState](interfaces/imamchannelstate.md)

The new channel state.

___

### createMessage

▸ **createMessage**(`channelState`: [IMamChannelState](interfaces/imamchannelstate.md), `message`: string): [IMamMessage](interfaces/imammessage.md)

Prepare a message on the mam channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channelState` | [IMamChannelState](interfaces/imamchannelstate.md) | The channel to prepare the message for. |
`message` | string | The trytes to include in the message. |

**Returns:** [IMamMessage](interfaces/imammessage.md)

The prepared message, the channel state will also be updated.

___

### decodeAddress

▸ **decodeAddress**(`root`: string, `mode`: MamMode): string

Decodes the root to its associated address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`root` | string | The root to device. |
`mode` | MamMode | The mode for the channel. |

**Returns:** string

The decoded address.

___

### decodeMessages

▸ **decodeMessages**(`messages`: IMessage[], `root`: string, `sideKey?`: undefined \| string): Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md) \| undefined\>

Decode messages from an address to try and find a MAM message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`messages` | IMessage[] | The objects returned from the fetch. |
`root` | string | The root within the mam channel to fetch the message. |
`sideKey?` | undefined \| string | The sideKey if mode is restricted. |

**Returns:** Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md) \| undefined\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

### mamAttach

▸ **mamAttach**(`client`: IClient, `mamMessage`: [IMamMessage](interfaces/imammessage.md), `tag?`: undefined \| string): Promise<{ message: IMessage ; messageId: string  }\>

Attach the mam message to the tangle.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | IClient | The client to use for sending. |
`mamMessage` | [IMamMessage](interfaces/imammessage.md) | The message to attach. |
`tag?` | undefined \| string | Optional tag for the transactions. |

**Returns:** Promise<{ message: IMessage ; messageId: string  }\>

The transactions that were attached.

___

### mamFetch

▸ **mamFetch**(`client`: IClient, `root`: string, `mode`: MamMode, `sideKey?`: undefined \| string): Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md) \| undefined\>

Fetch a mam message from a channel.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | IClient | The client to use for fetching. |
`root` | string | The root within the mam channel to fetch the message. |
`mode` | MamMode | The mode to use for fetching. |
`sideKey?` | undefined \| string | The sideKey if mode is restricted. |

**Returns:** Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md) \| undefined\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

### mamFetchAll

▸ **mamFetchAll**(`client`: IClient, `root`: string, `mode`: MamMode, `sideKey?`: undefined \| string, `limit?`: undefined \| number): Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md)[]\>

Fetch all the mam message from a channel.
If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
It is preferable to specify the limit so you read the data in chunks, then if you read and get the
same amount of messages as your limit you should probably read again.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | IClient | The client to use for fetching. |
`root` | string | The root within the mam channel to fetch the message. |
`mode` | MamMode | The mode to use for fetching. |
`sideKey?` | undefined \| string | The sideKey if mode is restricted. |
`limit?` | undefined \| number | Limit the number of messages retrieved. |

**Returns:** Promise<[IMamFetchedMessage](interfaces/imamfetchedmessage.md)[]\>

The array of retrieved messages.

___

### parseMessage

▸ **parseMessage**(`payload`: string, `root`: string, `channelKey?`: undefined \| string): object

Parse the trytes back to the original message.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | string | The trytes to decode. |
`root` | string | The root for the message. |
`channelKey?` | undefined \| string | The key used to encode the data. |

**Returns:** object

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The decoded message. |
`nextRoot` | string | The next root. |

The decoded message.
