[@iota/mam.js](../README.md) / mam/client

# Module: mam/client

## Table of contents

### Functions

- [decodeAddress](mam_client.md#decodeaddress)
- [decodeMessages](mam_client.md#decodemessages)
- [mamAttach](mam_client.md#mamattach)
- [mamFetch](mam_client.md#mamfetch)
- [mamFetchAll](mam_client.md#mamfetchall)

## Functions

### decodeAddress

▸ **decodeAddress**(`root`: *string*, `mode`: MamMode): *string*

Decodes the root to its associated address.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | *string* | The root to device. |
| `mode` | MamMode | The mode for the channel. |

**Returns:** *string*

The decoded address.

___

### decodeMessages

▸ **decodeMessages**(`messages`: IMessage[], `root`: *string*, `sideKey?`: *string*): *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md) \| undefined\>

Decode messages from an address to try and find a MAM message.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `messages` | IMessage[] | The objects returned from the fetch. |
| `root` | *string* | The root within the mam channel to fetch the message. |
| `sideKey?` | *string* | The sideKey if mode is restricted. |

**Returns:** *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md) \| undefined\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

### mamAttach

▸ **mamAttach**(`client`: IClient \| *string*, `mamMessage`: [*IMamMessage*](../interfaces/models_imammessage.imammessage.md), `tag?`: *string*): *Promise*<{}\>

Attach the mam message to the tangle.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | IClient \| *string* | The client or node endpoint to use for sending. |
| `mamMessage` | [*IMamMessage*](../interfaces/models_imammessage.imammessage.md) | The message to attach. |
| `tag?` | *string* | Optional tag for the transactions. |

**Returns:** *Promise*<{}\>

The transactions that were attached.

___

### mamFetch

▸ **mamFetch**(`client`: IClient \| *string*, `root`: *string*, `mode`: MamMode, `sideKey?`: *string*): *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md) \| undefined\>

Fetch a mam message from a channel.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | IClient \| *string* | The client or node endpoint to use for fetching. |
| `root` | *string* | The root within the mam channel to fetch the message. |
| `mode` | MamMode | The mode to use for fetching. |
| `sideKey?` | *string* | The sideKey if mode is restricted. |

**Returns:** *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md) \| undefined\>

The decoded message and the nextRoot if successful, undefined if no messages found,
throws exception if transactions found on address are invalid.

___

### mamFetchAll

▸ **mamFetchAll**(`client`: IClient \| *string*, `root`: *string*, `mode`: MamMode, `sideKey?`: *string*, `limit?`: *number*): *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md)[]\>

Fetch all the mam message from a channel.
If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
It is preferable to specify the limit so you read the data in chunks, then if you read and get the
same amount of messages as your limit you should probably read again.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | IClient \| *string* | The client or node endpoint to use for fetching. |
| `root` | *string* | The root within the mam channel to fetch the message. |
| `mode` | MamMode | The mode to use for fetching. |
| `sideKey?` | *string* | The sideKey if mode is restricted. |
| `limit?` | *number* | Limit the number of messages retrieved. |

**Returns:** *Promise*<[*IMamFetchedMessage*](../interfaces/models_imamfetchedmessage.imamfetchedmessage.md)[]\>

The array of retrieved messages.
