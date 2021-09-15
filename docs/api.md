# @iota/mam.js

## Table of contents

### Functions

- [createChannel](api.md#createchannel)
- [channelRoot](api.md#channelroot)
- [createMessage](api.md#createmessage)
- [mamAttach](api.md#mamattach)
- [mamFetch](api.md#mamfetch)
- [decodeAddress](api.md#decodeaddress)
- [mamFetchAll](api.md#mamfetchall)
- [decodeMessages](api.md#decodemessages)
- [parseMessage](api.md#parsemessage)

### Interfaces

- [IMamChannelState](interfaces/IMamChannelState.md)
- [IMamFetchedMessage](interfaces/IMamFetchedMessage.md)
- [IMamMessage](interfaces/IMamMessage.md)

### Type aliases

- [MamMode](api.md#mammode)

### Classes

- [TrytesHelper](classes/TrytesHelper.md)

## Functions

### createChannel

▸ **createChannel**(`seed`, `security`, `mode`, `sideKey?`): [`IMamChannelState`](interfaces/IMamChannelState.md)

Create a new channel object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed for the channel. |
| `security` | `number` | The security level for the channel. |
| `mode` | [`MamMode`](api.md#mammode) | The mode for the channel. |
| `sideKey?` | `string` | The side key to use for restricted mode. |

#### Returns

[`IMamChannelState`](interfaces/IMamChannelState.md)

The new channel state.

___

### channelRoot

▸ **channelRoot**(`channelState`): `string`

Get the root of the channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelState` | [`IMamChannelState`](interfaces/IMamChannelState.md) | The channel state to get the root. |

#### Returns

`string`

The root.

___

### createMessage

▸ **createMessage**(`channelState`, `message`): [`IMamMessage`](interfaces/IMamMessage.md)

Prepare a message on the mam channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelState` | [`IMamChannelState`](interfaces/IMamChannelState.md) | The channel to prepare the message for. |
| `message` | `string` | The trytes to include in the message. |

#### Returns

[`IMamMessage`](interfaces/IMamMessage.md)

The prepared message, the channel state will also be updated.

___

### mamAttach

▸ **mamAttach**(`client`, `mamMessage`, `tag?`): `Promise`<`Object`\>

Attach the mam message to the tangle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| `IClient` | The client or node endpoint to use for sending. |
| `mamMessage` | [`IMamMessage`](interfaces/IMamMessage.md) | The message to attach. |
| `tag?` | `string` | Optional tag for the transactions. |

#### Returns

`Promise`<`Object`\>

The transactions that were attached.

___

### mamFetch

▸ **mamFetch**(`client`, `root`, `mode`, `sideKey?`): `Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md) \| `undefined`\>

Fetch a mam message from a channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| `IClient` | The client or node endpoint to use for fetching. |
| `root` | `string` | The root within the mam channel to fetch the message. |
| `mode` | [`MamMode`](api.md#mammode) | The mode to use for fetching. |
| `sideKey?` | `string` | The sideKey if mode is restricted. |

#### Returns

`Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md) \| `undefined`\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

### decodeAddress

▸ **decodeAddress**(`root`, `mode`): `string`

Decodes the root to its associated address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | `string` | The root to device. |
| `mode` | [`MamMode`](api.md#mammode) | The mode for the channel. |

#### Returns

`string`

The decoded address.

___

### mamFetchAll

▸ **mamFetchAll**(`client`, `root`, `mode`, `sideKey?`, `limit?`): `Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md)[]\>

Fetch all the mam message from a channel.
If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
It is preferable to specify the limit so you read the data in chunks, then if you read and get the
same amount of messages as your limit you should probably read again.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `string` \| `IClient` | The client or node endpoint to use for fetching. |
| `root` | `string` | The root within the mam channel to fetch the message. |
| `mode` | [`MamMode`](api.md#mammode) | The mode to use for fetching. |
| `sideKey?` | `string` | The sideKey if mode is restricted. |
| `limit?` | `number` | Limit the number of messages retrieved. |

#### Returns

`Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md)[]\>

The array of retrieved messages.

___

### decodeMessages

▸ **decodeMessages**(`messages`, `root`, `sideKey?`): `Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md) \| `undefined`\>

Decode messages from an address to try and find a MAM message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messages` | `IMessage`[] | The objects returned from the fetch. |
| `root` | `string` | The root within the mam channel to fetch the message. |
| `sideKey?` | `string` | The sideKey if mode is restricted. |

#### Returns

`Promise`<[`IMamFetchedMessage`](interfaces/IMamFetchedMessage.md) \| `undefined`\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

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
| `nextRoot` | `string` | The next root. |
| `message` | `string` | The decoded message. |

## Type aliases

### MamMode

Ƭ **MamMode**: ``"public"`` \| ``"private"`` \| ``"restricted"``

The modes for MAM.
