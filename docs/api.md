## Functions

<dl>
<dt><a href="#createChannel">createChannel(seed, security, mode, sideKey)</a> ⇒</dt>
<dd><p>Create a new channel object.</p>
</dd>
<dt><a href="#channelRoot">channelRoot(channelState)</a> ⇒</dt>
<dd><p>Get the root of the channel.</p>
</dd>
<dt><a href="#createMessage">createMessage(channelState, message)</a> ⇒</dt>
<dd><p>Prepare a message on the mam channel.</p>
</dd>
<dt><a href="#mamAttach">mamAttach(api, mamMessage, depth, mwm, tag)</a> ⇒</dt>
<dd><p>Attach the mam message to the tangle.</p>
</dd>
<dt><a href="#mamFetch">mamFetch(api, root, mode, sideKey)</a> ⇒</dt>
<dd><p>Fetch a mam message from a channel.</p>
</dd>
<dt><a href="#mamFetchAll">mamFetchAll(api, root, mode, sideKey, limit)</a> ⇒</dt>
<dd><p>Fetch all the mam message from a channel.
If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
It is preferable to specify the limit so you read the data in chunks, then if you read and get the
same amount of messages as your limit you should probably read again.</p>
</dd>
<dt><a href="#mamFetchCombined">mamFetchCombined(api, channels)</a> ⇒</dt>
<dd><p>Fetch the next message from a list of channels.</p>
</dd>
<dt><a href="#parseMessage">parseMessage(payload, root, channelKey)</a> ⇒</dt>
<dd><p>Parse the trytes back to the original message.</p>
</dd>
</dl>

<a name="createChannel"></a>

## createChannel(seed, security, mode, sideKey) ⇒
Create a new channel object.

**Kind**: global function  
**Returns**: The new channel state.  

| Param | Description |
| --- | --- |
| seed | The seed for the channel. |
| security | The security level for the channel. |
| mode | The mode for the channel. |
| sideKey | The side key to use for restricted mode. |

<a name="channelRoot"></a>

## channelRoot(channelState) ⇒
Get the root of the channel.

**Kind**: global function  
**Returns**: The root.  

| Param | Description |
| --- | --- |
| channelState | The channel state to get the root. |

<a name="createMessage"></a>

## createMessage(channelState, message) ⇒
Prepare a message on the mam channel.

**Kind**: global function  
**Returns**: The prepared message, the channel state will also be updated.  

| Param | Description |
| --- | --- |
| channelState | The channel to prepare the message for. |
| message | The trytes to include in the message. |

<a name="mamAttach"></a>

## mamAttach(api, mamMessage, depth, mwm, tag) ⇒
Attach the mam message to the tangle.

**Kind**: global function  
**Returns**: The transactions that were attached.  

| Param | Description |
| --- | --- |
| api | The api to use for attaching. |
| mamMessage | The message to attach. |
| depth | The depth to perform the attach. |
| mwm | The mwm to perform the attach. |
| tag | Optional tag for the transactions. |

<a name="mamFetch"></a>

## mamFetch(api, root, mode, sideKey) ⇒
Fetch a mam message from a channel.

**Kind**: global function  
**Returns**: The decoded message and the nextRoot if successful, undefined if no messages found,throws exception if transactions found on address are invalid.  

| Param | Description |
| --- | --- |
| api | The api to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |

<a name="mamFetchAll"></a>

## mamFetchAll(api, root, mode, sideKey, limit) ⇒
Fetch all the mam message from a channel.If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.It is preferable to specify the limit so you read the data in chunks, then if you read and get thesame amount of messages as your limit you should probably read again.

**Kind**: global function  
**Returns**: The array of retrieved messages.  

| Param | Description |
| --- | --- |
| api | The api to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |
| limit | Limit the number of messages retrieved. |

<a name="mamFetchCombined"></a>

## mamFetchCombined(api, channels) ⇒
Fetch the next message from a list of channels.

**Kind**: global function  
**Returns**: The decoded messages and the nextRoot if successful for each channel, undefined if no messages found,throws exception if transactions found on address are invalid.  

| Param | Description |
| --- | --- |
| api | The api to use for fetching. |
| channels | The list of channel details to check for new messages. |

<a name="parseMessage"></a>

## parseMessage(payload, root, channelKey) ⇒
Parse the trytes back to the original message.

**Kind**: global function  
**Returns**: The decoded message.  

| Param | Description |
| --- | --- |
| payload | The trytes to decode. |
| root | The root for the message. |
| channelKey | The key used to encode the data. |

