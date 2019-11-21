## Classes

<dl>
<dt><a href="#MerkleNode">MerkleNode</a></dt>
<dd><p>Class to represent a node in a merkle tree.</p>
</dd>
<dt><a href="#MerkleTree">MerkleTree</a></dt>
<dd><p>Class to represent a merkle tree.</p>
</dd>
<dt><a href="#HammingDiver">HammingDiver</a></dt>
<dd><p>Class to perform Hamming calculation for nonce.</p>
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
<dt><a href="#mamAttach">mamAttach(api, mamMessage, depth, mwm, tag)</a> ⇒</dt>
<dd><p>Attach the mam message to the tangle.</p>
</dd>
<dt><a href="#mamFetch">mamFetch(api, root, mode, sideKey)</a> ⇒</dt>
<dd><p>Fetch a mam message from a channel.</p>
</dd>
<dt><a href="#mamFetchAll">mamFetchAll(api, root, mode, sideKey, limit)</a> ⇒</dt>
<dd><p>Fetch all the mam message from a channel.</p>
</dd>
<dt><a href="#rootToAddress">rootToAddress(root, mode)</a> ⇒</dt>
<dd><p>Convert the root to an address for fetching.</p>
</dd>
<dt><a href="#parseMessage">parseMessage(payload, root, channelKey)</a> ⇒</dt>
<dd><p>Parse the trytes back to the original message.</p>
</dd>
<dt><a href="#generateAddress">generateAddress(seedTrits, index, security)</a> ⇒</dt>
<dd><p>Generate an address for the merklr tree.</p>
</dd>
<dt><a href="#subseed">subseed(seed, index)</a> ⇒</dt>
<dd><p>Calculate the subseed for the seed.</p>
</dd>
<dt><a href="#digestFromSubseed">digestFromSubseed(subSeed, securityLevel)</a> ⇒</dt>
<dd><p>Get the digest from the subseed.</p>
</dd>
<dt><a href="#address">address(digests)</a> ⇒</dt>
<dd><p>Get the address from the digests.</p>
</dd>
<dt><a href="#privateKeyFromSubseed">privateKeyFromSubseed(subSeed, securityLevel)</a> ⇒</dt>
<dd><p>Get the private key from the subseed.</p>
</dd>
<dt><a href="#signature">signature(hashTrits, key)</a> ⇒</dt>
<dd><p>Create a signature for the trits.</p>
</dd>
<dt><a href="#checksumSecurity">checksumSecurity(hash)</a> ⇒</dt>
<dd><p>Check the security level.</p>
</dd>
<dt><a href="#digestFromSignature">digestFromSignature(hash, sig)</a> ⇒</dt>
<dd><p>Get the digest from the signature</p>
</dd>
<dt><a href="#concatenate">concatenate(arrays)</a> ⇒</dt>
<dd><p>Concatentate a list of arrays.</p>
</dd>
<dt><a href="#curlRate">curlRate(sponge, len)</a> ⇒</dt>
<dd><p>Extract the state from the curl sponge.</p>
</dd>
<dt><a href="#maskHash">maskHash(keyTrits)</a> ⇒</dt>
<dd><p>Create the mask hash for the key and salt it if provided.</p>
</dd>
<dt><a href="#mask">mask(payload, sponge)</a> ⇒</dt>
<dd><p>Apply mask to the payload.</p>
</dd>
<dt><a href="#unmask">unmask(payload, sponge)</a> ⇒</dt>
<dd><p>Unmask a payload.</p>
</dd>
<dt><a href="#tritSum">tritSum(left, right)</a> ⇒</dt>
<dd><p>Sum the parts of a trit.</p>
</dd>
<dt><a href="#pascalEncode">pascalEncode(value)</a> ⇒</dt>
<dd><p>Perform pascal encoding of the value.</p>
</dd>
<dt><a href="#pascalDecode">pascalDecode(value)</a> ⇒</dt>
<dd><p>Decode the pascal encoded trits.</p>
</dd>
<dt><a href="#encodedLength">encodedLength(value)</a> ⇒</dt>
<dd><p>Get the encoded length of the value.</p>
</dd>
<dt><a href="#roundThird">roundThird(value)</a> ⇒</dt>
<dd><p>Round the number to the third.</p>
</dd>
<dt><a href="#minTrits">minTrits(input, basis)</a> ⇒</dt>
<dd><p>Calculate the minimum trits for the input.</p>
</dd>
<dt><a href="#end">end(input)</a> ⇒</dt>
<dd><p>Calculate the end for the input.</p>
</dd>
<dt><a href="#valueToTrits">valueToTrits(input, trits)</a> ⇒</dt>
<dd><p>Convert the value to trits.</p>
</dd>
<dt><a href="#writeTrits">writeTrits(input, trits, index)</a> ⇒</dt>
<dd><p>Write the trits for the value.</p>
</dd>
</dl>

<a name="MerkleNode"></a>

## MerkleNode
Class to represent a node in a merkle tree.

**Kind**: global class  
<a name="new_MerkleNode_new"></a>

### new MerkleNode(left, right, addressTrits, privateKeyTrits)
Create a new instance of MerkleNode.


| Param | Description |
| --- | --- |
| left | The left node. |
| right | The right node. |
| addressTrits | The trits representing the address. |
| privateKeyTrits | The trits for the private key. |

<a name="MerkleTree"></a>

## MerkleTree
Class to represent a merkle tree.

**Kind**: global class  

* [MerkleTree](#MerkleTree)
    * [new MerkleTree(seed, index, count, security)](#new_MerkleTree_new)
    * _instance_
        * [.getSubtree(index)](#MerkleTree+getSubtree) ⇒
        * [.buildTree(leaves)](#MerkleTree+buildTree) ⇒
    * _static_
        * [.root(rate, siblings, index)](#MerkleTree.root) ⇒

<a name="new_MerkleTree_new"></a>

### new MerkleTree(seed, index, count, security)
Create a new instance of the merkle tree.


| Param | Description |
| --- | --- |
| seed | The seed to use for the tree. |
| index | The start index for the creation. |
| count | The count for the creation. |
| security | The security level to create the hashes. |

<a name="MerkleTree+getSubtree"></a>

### merkleTree.getSubtree(index) ⇒
Get a sub tree.

**Kind**: instance method of [<code>MerkleTree</code>](#MerkleTree)  
**Returns**: The key and leaves for the sub tree.  

| Param | Description |
| --- | --- |
| index | The index of the subtree. |

<a name="MerkleTree+buildTree"></a>

### merkleTree.buildTree(leaves) ⇒
Build tree from the leaf hashes.

**Kind**: instance method of [<code>MerkleTree</code>](#MerkleTree)  
**Returns**: The root node.  

| Param | Description |
| --- | --- |
| leaves | The leaves to build the tree from. |

<a name="MerkleTree.root"></a>

### MerkleTree.root(rate, siblings, index) ⇒
Recalculate the root for the siblings.

**Kind**: static method of [<code>MerkleTree</code>](#MerkleTree)  
**Returns**: The new sibling root.  

| Param | Description |
| --- | --- |
| rate | The current address. |
| siblings | The siblings data. |
| index | The index in the tree. |

<a name="HammingDiver"></a>

## HammingDiver
Class to perform Hamming calculation for nonce.

**Kind**: global class  

* [HammingDiver](#HammingDiver)
    * _instance_
        * [.search(trits, mwm, length, offset)](#HammingDiver+search) ⇒
        * [.prepareTrits(trits, offset)](#HammingDiver+prepareTrits) ⇒
        * [.tritsToBigInt(input, length)](#HammingDiver+tritsToBigInt) ⇒
        * [.increment(states, fromIndex, toIndex)](#HammingDiver+increment) ⇒
        * [.transform(searchStates)](#HammingDiver+transform)
        * [.bitWiseNot(value)](#HammingDiver+bitWiseNot) ⇒
        * [.check(mwm, low, high)](#HammingDiver+check) ⇒
        * [.trinaryLength(low, high)](#HammingDiver+trinaryLength) ⇒
        * [.trinaryGet(low, high, index)](#HammingDiver+trinaryGet) ⇒
    * _static_
        * [.MAX_VALUE](#HammingDiver.MAX_VALUE)
        * [.MIN_VALUE](#HammingDiver.MIN_VALUE)
        * [.HIGH_0](#HammingDiver.HIGH_0)
        * [.HIGH_1](#HammingDiver.HIGH_1)
        * [.HIGH_2](#HammingDiver.HIGH_2)
        * [.HIGH_3](#HammingDiver.HIGH_3)
        * [.LOW_0](#HammingDiver.LOW_0)
        * [.LOW_1](#HammingDiver.LOW_1)
        * [.LOW_2](#HammingDiver.LOW_2)
        * [.LOW_3](#HammingDiver.LOW_3)
        * [.ROUNDS](#HammingDiver.ROUNDS)

<a name="HammingDiver+search"></a>

### hammingDiver.search(trits, mwm, length, offset) ⇒
Search for the nonce.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The trits of the nonce.  

| Param | Description |
| --- | --- |
| trits | The trits to calculate the nonce. |
| mwm | The security level to calculate at. |
| length | The length of the data to search. |
| offset | The offset to start the search. |

<a name="HammingDiver+prepareTrits"></a>

### hammingDiver.prepareTrits(trits, offset) ⇒
Prepare the trits for calculation.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The prepared trits.  

| Param | Description |
| --- | --- |
| trits | The trits. |
| offset | The offset to start. |

<a name="HammingDiver+tritsToBigInt"></a>

### hammingDiver.tritsToBigInt(input, length) ⇒
Convert the trits to bigint form.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The trits in big int form.  

| Param | Description |
| --- | --- |
| input | The input trits. |
| length | The length of the input. |

<a name="HammingDiver+increment"></a>

### hammingDiver.increment(states, fromIndex, toIndex) ⇒
Increment the state values.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The increment length.  

| Param | Description |
| --- | --- |
| states | The state to increment. |
| fromIndex | The index to start from. |
| toIndex | The index to end at, |

<a name="HammingDiver+transform"></a>

### hammingDiver.transform(searchStates)
Transform the states.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  

| Param | Description |
| --- | --- |
| searchStates | The states to transform. |

<a name="HammingDiver+bitWiseNot"></a>

### hammingDiver.bitWiseNot(value) ⇒
Perform a bitwise not for 64 bit, not twos complement.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The bitwise not of the value.  

| Param | Description |
| --- | --- |
| value | The value to bitwise not. |

<a name="HammingDiver+check"></a>

### hammingDiver.check(mwm, low, high) ⇒
Check if we have found the nonce.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The nonce if found.  

| Param | Description |
| --- | --- |
| mwm | The mwm. |
| low | The low bits. |
| high | The high bits. |

<a name="HammingDiver+trinaryLength"></a>

### hammingDiver.trinaryLength(low, high) ⇒
Calculate the trinary length of the bit data.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The length.  

| Param | Description |
| --- | --- |
| low | The low bits. |
| high | The high bits. |

<a name="HammingDiver+trinaryGet"></a>

### hammingDiver.trinaryGet(low, high, index) ⇒
Get data from the tinary bits.

**Kind**: instance method of [<code>HammingDiver</code>](#HammingDiver)  
**Returns**: The values stored at the index.  

| Param | Description |
| --- | --- |
| low | The low bits. |
| high | The high bits. |
| index | The index to get the values. |

<a name="HammingDiver.MAX_VALUE"></a>

### HammingDiver.MAX\_VALUE
Max 64 bit value.

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.MIN_VALUE"></a>

### HammingDiver.MIN\_VALUE
Min 64 bit value.

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.HIGH_0"></a>

### HammingDiver.HIGH\_0
High 0

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.HIGH_1"></a>

### HammingDiver.HIGH\_1
High 1

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.HIGH_2"></a>

### HammingDiver.HIGH\_2
High 2

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.HIGH_3"></a>

### HammingDiver.HIGH\_3
High 3

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.LOW_0"></a>

### HammingDiver.LOW\_0
Low 0

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.LOW_1"></a>

### HammingDiver.LOW\_1
Low 1

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.LOW_2"></a>

### HammingDiver.LOW\_2
Low 2

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.LOW_3"></a>

### HammingDiver.LOW\_3
Low 3

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
<a name="HammingDiver.ROUNDS"></a>

### HammingDiver.ROUNDS
Number of rounds

**Kind**: static property of [<code>HammingDiver</code>](#HammingDiver)  
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
**Returns**: The decoded message and the nextRoot if successful, undefined if no message.  

| Param | Description |
| --- | --- |
| api | The api to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |

<a name="mamFetchAll"></a>

## mamFetchAll(api, root, mode, sideKey, limit) ⇒
Fetch all the mam message from a channel.

**Kind**: global function  
**Returns**: The array of retrieved messages.  

| Param | Description |
| --- | --- |
| api | The api to use for fetching. |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |
| sideKey | The sideKey if mode is restricted. |
| limit | Limit the number of messages retrieved. |

<a name="rootToAddress"></a>

## rootToAddress(root, mode) ⇒
Convert the root to an address for fetching.

**Kind**: global function  
**Returns**: The address based on the root and mode.  

| Param | Description |
| --- | --- |
| root | The root within the mam channel to fetch the message. |
| mode | The mode to use for fetching. |

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

<a name="generateAddress"></a>

## generateAddress(seedTrits, index, security) ⇒
Generate an address for the merklr tree.

**Kind**: global function  
**Returns**: The address and the private key.  

| Param | Description |
| --- | --- |
| seedTrits | The trits for the seed. |
| index | The index of the address to generate. |
| security | The security level of the address to generate. |

<a name="subseed"></a>

## subseed(seed, index) ⇒
Calculate the subseed for the seed.

**Kind**: global function  
**Returns**: The subseed trits.  

| Param | Description |
| --- | --- |
| seed | The seed trits. |
| index | The index for the subseed. |

<a name="digestFromSubseed"></a>

## digestFromSubseed(subSeed, securityLevel) ⇒
Get the digest from the subseed.

**Kind**: global function  
**Returns**: The digest trits.  

| Param | Description |
| --- | --- |
| subSeed | The subseed to get the digest for. |
| securityLevel | The security level to get the digest. |

<a name="address"></a>

## address(digests) ⇒
Get the address from the digests.

**Kind**: global function  
**Returns**: The address trits.  

| Param | Description |
| --- | --- |
| digests | The digests to get the address for. |

<a name="privateKeyFromSubseed"></a>

## privateKeyFromSubseed(subSeed, securityLevel) ⇒
Get the private key from the subseed.

**Kind**: global function  
**Returns**: The private key trits.  

| Param | Description |
| --- | --- |
| subSeed | The subseed to get the private key for. |
| securityLevel | The security level for the private key. |

<a name="signature"></a>

## signature(hashTrits, key) ⇒
Create a signature for the trits.

**Kind**: global function  
**Returns**: The signature trits.  

| Param | Description |
| --- | --- |
| hashTrits | The trits to create the signature for. |
| key | The key to use for signing. |

<a name="checksumSecurity"></a>

## checksumSecurity(hash) ⇒
Check the security level.

**Kind**: global function  
**Returns**: The security level  

| Param | Description |
| --- | --- |
| hash | The hash to check. |

<a name="digestFromSignature"></a>

## digestFromSignature(hash, sig) ⇒
Get the digest from the signature

**Kind**: global function  
**Returns**: The digest.  

| Param | Description |
| --- | --- |
| hash | The hash to get the digest. |
| sig | The signature. |

<a name="concatenate"></a>

## concatenate(arrays) ⇒
Concatentate a list of arrays.

**Kind**: global function  
**Returns**: The concatenated arrays.  

| Param | Description |
| --- | --- |
| arrays | The arrays to concatenate. |

<a name="curlRate"></a>

## curlRate(sponge, len) ⇒
Extract the state from the curl sponge.

**Kind**: global function  
**Returns**: The extracted state.  

| Param | Description |
| --- | --- |
| sponge | The sponge to extract the state from. |
| len | The length of the state to extract. |

<a name="maskHash"></a>

## maskHash(keyTrits) ⇒
Create the mask hash for the key and salt it if provided.

**Kind**: global function  
**Returns**: The mask hash.  

| Param | Description |
| --- | --- |
| keyTrits | The key to create the mask hash for. |

<a name="mask"></a>

## mask(payload, sponge) ⇒
Apply mask to the payload.

**Kind**: global function  
**Returns**: The masked payload.  

| Param | Description |
| --- | --- |
| payload | The payload to apply the mask to. |
| sponge | The sponge to use. |

<a name="unmask"></a>

## unmask(payload, sponge) ⇒
Unmask a payload.

**Kind**: global function  
**Returns**: The unmasked payload.  

| Param | Description |
| --- | --- |
| payload | The payload to unmask. |
| sponge | The sponge to use. |

<a name="tritSum"></a>

## tritSum(left, right) ⇒
Sum the parts of a trit.

**Kind**: global function  
**Returns**: The sum.  

| Param | Description |
| --- | --- |
| left | The left part. |
| right | The right part. |

<a name="pascalEncode"></a>

## pascalEncode(value) ⇒
Perform pascal encoding of the value.

**Kind**: global function  
**Returns**: The trits for the encoded value.  

| Param | Description |
| --- | --- |
| value | The value to encode. |

<a name="pascalDecode"></a>

## pascalDecode(value) ⇒
Decode the pascal encoded trits.

**Kind**: global function  
**Returns**: The decoded value.  

| Param | Description |
| --- | --- |
| value | The value to decode. |

<a name="encodedLength"></a>

## encodedLength(value) ⇒
Get the encoded length of the value.

**Kind**: global function  
**Returns**: The length.  

| Param | Description |
| --- | --- |
| value | The value. |

<a name="roundThird"></a>

## roundThird(value) ⇒
Round the number to the third.

**Kind**: global function  
**Returns**: The rounded number.  

| Param | Description |
| --- | --- |
| value | The value to round. |

<a name="minTrits"></a>

## minTrits(input, basis) ⇒
Calculate the minimum trits for the input.

**Kind**: global function  
**Returns**: The number of trits.  

| Param | Description |
| --- | --- |
| input | The input to calculate from. |
| basis | The basis of the calculation. |

<a name="end"></a>

## end(input) ⇒
Calculate the end for the input.

**Kind**: global function  
**Returns**: The calculated end.  

| Param | Description |
| --- | --- |
| input | The input to calculate for. |

<a name="valueToTrits"></a>

## valueToTrits(input, trits) ⇒
Convert the value to trits.

**Kind**: global function  
**Returns**: The end conversion.  

| Param | Description |
| --- | --- |
| input | The input value to convert. |
| trits | The trits. |

<a name="writeTrits"></a>

## writeTrits(input, trits, index) ⇒
Write the trits for the value.

**Kind**: global function  
**Returns**: The length.  

| Param | Description |
| --- | --- |
| input | The input value. |
| trits | The trits to write to. |
| index | The index to write at. |

