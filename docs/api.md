## Classes

<dl>
<dt><a href="#Blake2b">Blake2b</a></dt>
<dd><p>Class to help with Blake2B Signature scheme.</p>
</dd>
<dt><a href="#TextHelper">TextHelper</a></dt>
<dd><p>Helper functions for use with text.</p>
</dd>
<dt><a href="#TrytesHelper">TrytesHelper</a></dt>
<dd><p>Helper functions for use with trytes.</p>
</dd>
</dl>

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
<dt><a href="#mamAttach">mamAttach(client, mamMessage, tag)</a> ⇒</dt>
<dd><p>Attach the mam message to the tangle.</p>
</dd>
<dt><a href="#mamFetch">mamFetch(client, root, mode, sideKey)</a> ⇒</dt>
<dd><p>Fetch a mam message from a channel.</p>
</dd>
<dt><a href="#decodeAddress">decodeAddress(root, mode)</a> ⇒</dt>
<dd><p>Decodes the root to its associated address.</p>
</dd>
<dt><a href="#mamFetchAll">mamFetchAll(client, root, mode, sideKey, limit)</a> ⇒</dt>
<dd><p>Fetch all the mam message from a channel.
If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
It is preferable to specify the limit so you read the data in chunks, then if you read and get the
same amount of messages as your limit you should probably read again.</p>
</dd>
<dt><a href="#decodeMessages">decodeMessages(messages, root, sideKey)</a> ⇒</dt>
<dd><p>Decode messages from an address to try and find a MAM message.</p>
</dd>
<dt><a href="#parseMessage">parseMessage(payload, root, channelKey)</a> ⇒</dt>
<dd><p>Parse the trytes back to the original message.</p>
</dd>
</dl>

<a name="Blake2b"></a>

## Blake2b
Class to help with Blake2B Signature scheme.

**Kind**: global class  

* [Blake2b](#Blake2b)
    * [.SIZE_256](#Blake2b.SIZE_256)
    * [.sum256(data)](#Blake2b.sum256) ⇒

<a name="Blake2b.SIZE_256"></a>

### Blake2b.SIZE\_256
Blake2b 256.

**Kind**: static property of [<code>Blake2b</code>](#Blake2b)  
<a name="Blake2b.sum256"></a>

### Blake2b.sum256(data) ⇒
Perform Sum 256 on the data.

**Kind**: static method of [<code>Blake2b</code>](#Blake2b)  
**Returns**: The sum 256 of the data.  

| Param | Description |
| --- | --- |
| data | The data to operate on. |

<a name="TextHelper"></a>

## TextHelper
Helper functions for use with text.

**Kind**: global class  

* [TextHelper](#TextHelper)
    * [.encodeNonASCII(value)](#TextHelper.encodeNonASCII) ⇒
    * [.decodeNonASCII(value)](#TextHelper.decodeNonASCII) ⇒

<a name="TextHelper.encodeNonASCII"></a>

### TextHelper.encodeNonASCII(value) ⇒
Encode Non ASCII characters to escaped characters.

**Kind**: static method of [<code>TextHelper</code>](#TextHelper)  
**Returns**: The encoded value.  

| Param | Description |
| --- | --- |
| value | The value to encode. |

<a name="TextHelper.decodeNonASCII"></a>

### TextHelper.decodeNonASCII(value) ⇒
Decode escaped Non ASCII characters.

**Kind**: static method of [<code>TextHelper</code>](#TextHelper)  
**Returns**: The decoded value.  

| Param | Description |
| --- | --- |
| value | The value to decode. |

<a name="TrytesHelper"></a>

## TrytesHelper
Helper functions for use with trytes.

**Kind**: global class  

* [TrytesHelper](#TrytesHelper)
    * [.ALPHABET](#TrytesHelper.ALPHABET)
    * [.TRYTES_TRITS](#TrytesHelper.TRYTES_TRITS)
    * [.isHash(trytes)](#TrytesHelper.isHash) ⇒
    * [.isTag(trytes)](#TrytesHelper.isTag) ⇒
    * [.isTrytes(trytes)](#TrytesHelper.isTrytes) ⇒
    * [.toTrits(value)](#TrytesHelper.toTrits) ⇒
    * [.fromTrits(trits)](#TrytesHelper.fromTrits) ⇒
    * [.tritsValue(trits)](#TrytesHelper.tritsValue) ⇒
    * [.fromAscii(value)](#TrytesHelper.fromAscii) ⇒
    * [.toAscii(trytes)](#TrytesHelper.toAscii) ⇒
    * [.objectToTrytes(obj)](#TrytesHelper.objectToTrytes) ⇒
    * [.objectFromTrytes(trytes)](#TrytesHelper.objectFromTrytes) ⇒
    * [.stringToTrytes(str)](#TrytesHelper.stringToTrytes) ⇒
    * [.stringFromTrytes(trytes)](#TrytesHelper.stringFromTrytes) ⇒

<a name="TrytesHelper.ALPHABET"></a>

### TrytesHelper.ALPHABET
All the characters that can be used in trytes.

**Kind**: static property of [<code>TrytesHelper</code>](#TrytesHelper)  
<a name="TrytesHelper.TRYTES_TRITS"></a>

### TrytesHelper.TRYTES\_TRITS
Trytes to trits lookup table.

**Kind**: static property of [<code>TrytesHelper</code>](#TrytesHelper)  
<a name="TrytesHelper.isHash"></a>

### TrytesHelper.isHash(trytes) ⇒
Is the string trytes length 81.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: True if it is trytes 81 chars long.  

| Param | Description |
| --- | --- |
| trytes | The trytes to test. |

<a name="TrytesHelper.isTag"></a>

### TrytesHelper.isTag(trytes) ⇒
Is the string trytes length 27.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: True if it is trytes 27 chars long.  

| Param | Description |
| --- | --- |
| trytes | The trytes to test. |

<a name="TrytesHelper.isTrytes"></a>

### TrytesHelper.isTrytes(trytes) ⇒
Is the string trytes of any length.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: True if it is trytes.  

| Param | Description |
| --- | --- |
| trytes | The trytes to test. |

<a name="TrytesHelper.toTrits"></a>

### TrytesHelper.toTrits(value) ⇒
Create a trits array from trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The trits array.  

| Param | Description |
| --- | --- |
| value | Trytes used to create trits. |

<a name="TrytesHelper.fromTrits"></a>

### TrytesHelper.fromTrits(trits) ⇒
Get trytes from trits array.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: Trytes.  

| Param | Description |
| --- | --- |
| trits | The trits to convert to trytes. |

<a name="TrytesHelper.tritsValue"></a>

### TrytesHelper.tritsValue(trits) ⇒
Convert trits to an integer.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The trits converted to number.  

| Param | Description |
| --- | --- |
| trits | The trits to convert. |

<a name="TrytesHelper.fromAscii"></a>

### TrytesHelper.fromAscii(value) ⇒
Convert a string value into trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The trytes representation of the value.  

| Param | Description |
| --- | --- |
| value | value to convert into trytes. |

<a name="TrytesHelper.toAscii"></a>

### TrytesHelper.toAscii(trytes) ⇒
Convert trytes into a string value.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The string value converted from the trytes.  

| Param | Description |
| --- | --- |
| trytes | to convert into a string value. |

<a name="TrytesHelper.objectToTrytes"></a>

### TrytesHelper.objectToTrytes(obj) ⇒
Convert an object to Trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The encoded trytes value.  

| Param | Description |
| --- | --- |
| obj | The obj to encode. |

<a name="TrytesHelper.objectFromTrytes"></a>

### TrytesHelper.objectFromTrytes(trytes) ⇒
Convert an object from Trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The decoded object.  

| Param | Description |
| --- | --- |
| trytes | The trytes to decode. |

<a name="TrytesHelper.stringToTrytes"></a>

### TrytesHelper.stringToTrytes(str) ⇒
Convert a string to Trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The encoded trytes value.  

| Param | Description |
| --- | --- |
| str | The string to encode. |

<a name="TrytesHelper.stringFromTrytes"></a>

### TrytesHelper.stringFromTrytes(trytes) ⇒
Convert a string from Trytes.

**Kind**: static method of [<code>TrytesHelper</code>](#TrytesHelper)  
**Returns**: The decoded string.  

| Param | Description |
| --- | --- |
| trytes | The trytes to decode. |

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

## mamAttach(client, mamMessage, tag) ⇒
Attach the mam message to the tangle.

**Kind**: global function  
**Returns**: The transactions that were attached.  

| Param | Description |
| --- | --- |
| client | The client to use for sending. |
| mamMessage | The message to attach. |
| tag | Optional tag for the transactions. |

<a name="mamFetch"></a>

## mamFetch(client, root, mode, sideKey) ⇒
Fetch a mam message from a channel.

**Kind**: global function  
**Returns**: The decoded message and the nextRoot if successful, undefined if no messages found,throws exception if transactions found on address are invalid.  

| Param | Description |
| --- | --- |
| client | The client to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |

<a name="decodeAddress"></a>

## decodeAddress(root, mode) ⇒
Decodes the root to its associated address.

**Kind**: global function  
**Returns**: The decoded address.  

| Param | Description |
| --- | --- |
| root | The root to device. |
| mode | The mode for the channel. |

<a name="mamFetchAll"></a>

## mamFetchAll(client, root, mode, sideKey, limit) ⇒
Fetch all the mam message from a channel.If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.It is preferable to specify the limit so you read the data in chunks, then if you read and get thesame amount of messages as your limit you should probably read again.

**Kind**: global function  
**Returns**: The array of retrieved messages.  

| Param | Description |
| --- | --- |
| client | The client to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |
| limit | Limit the number of messages retrieved. |

<a name="decodeMessages"></a>

## decodeMessages(messages, root, sideKey) ⇒
Decode messages from an address to try and find a MAM message.

**Kind**: global function  
**Returns**: The decoded message and the nextRoot if successful, undefined if no messages found,throws exception if transactions found on address are invalid.  

| Param | Description |
| --- | --- |
| messages | The objects returned from the fetch. |
| root | The root within the mam channel to fetch the message. |
| sideKey | The sideKey if mode is restricted. |

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

