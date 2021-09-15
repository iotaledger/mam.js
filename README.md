# mam.js

> We strongly advise that you update your apps to use [IOTA Streams](https://github.com/iotaledger/streams) - this package is unlikely to be maintained.

Implementation of Masked Authentication Messaging v0 for IOTA in JavaScript, for use with IOTA network.

## Installing

Install this package using the following commands:

```shell
npm install @iota/mam.js
```

If you want to use this module in a browser `<script>` tag see the example Browser [./examples/browser/index.html](./examples/browser/index.html)

## Example Usage

```js
const { channelRoot, createChannel, createMessage, parseMessage, mamAttach, mamFetch, mamFetchAll } = require('@iota/mam.js');

// Setup the details for the channel.
const seed = 'ENTER A SEED';
const mode = 'restricted';
const sideKey = 'MYKEY';

// Create a new channel using the details
// You could also load the state from persistence.
const channelState = createChannel(seed, 2, mode, sideKey);

// Create a MAM message using the channel state.
// The returned mamMessage will contain address, root, nextRoot and payload.
// The channel state is also updated, so you should persist it if you want
// to add further messages in the same channel.
// The payload should be attached to the tangle.
const mamMessage = createMessage(channelState, 'MY9MESSAGE');

// Decode the message using the root and sideKey.
// The decodedMessage will contain nextRoot and message.
const decodedMessage = parseMessage(mamMessage.payload, mamMessage.root, sideKey);

// If we want to attach the message to the tangle we first compose the API
const node = "https://chrysalis-nodes.iota.org";
// And then attach the message, tagging it if required.
// Attaching will return the actual transactions attached to the tangle if you need them.
await mamAttach(node, mamMessage, "MY9MAM");

// We can also fetch a message given its root and channel details.
// The fetched data will contain the nextRoot and the message.
const fetched = await mamFetch(node, mamMessage.root, mode, sideKey)

// If you want to fetch multiple messages from a channel
// you need either its initial root (or start from another root).
const channelState = createChannel(seed, 2, mode, sideKey);
const initialRoot = channelRoot(channelState);
const chunkSize = 4;
const chunk = await mamFetchAll(node, initialRoot, mode, sideKey, chunkSize);

// If you want to fetch the next message from a list of channels
const channels = [
  { root: initialRoot1, mode: "restricted", sideKey: "MYKEY" },
  { root: initialRoot2, mode: "public" },
];
// One message for each channel will be retrieved
const fetched = await mamFetchCombined(node, channels);
```

## API Reference

See the API reference for the JavaScript implementation [here](./docs/api.md).

## Examples

To see the MAMv0 in action demonstration code using this library can be found in the [./examples/](./examples/README.md) folder.

## License

Apache License Version 2.0 - Copyright (c) 2021 IOTA Stiftung
