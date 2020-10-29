# mam.js

> We strongly advise that you update your apps to use [IOTA Streams](https://github.com/iotaledger/streams) - this package is unlikely to be maintained.

Implementation of Masked Authentication Messaging v0 for IOTA in pure JavaScript, for use with IOTA Chrysalis Phase 2.

The package name has been changed to `@iota/mam2.js` to allow for side-by-side usage with the current `@iota/mam.js`

## Installing

Install this package using the following commands:

```shell
npm install iotaledger/mam.js#feature/chrysalis-p2
```

If you want to use this module in a browser `<script>` tag see the example Browser [./examples/browser/index.html](./examples/browser/index.html)

## Example Usage

```js
const { SingleNodeClient } = require('@iota/iota2.js');
const { channelRoot, createChannel, createMessage, parseMessage, mamAttach, mamFetch, mamFetchAll } = require('@iota/mam2.js');

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
const client = SingleNodeClient("https://altnodes.devnet.iota.org:443");
// And then attach the message, tagging it if required.
// Attaching will return the actual transactions attached to the tangle if you need them.
await mamAttach(api, mamMessage, "MY9MAM");

// We can also fetch a message given its root and channel details.
// The fetched data will contain the nextRoot and the message.
const fetched = await mamFetch(client, mamMessage.root, mode, sideKey)

// If you want to fetch multiple messages from a channel
// you need either its initial root (or start from another root).
const channelState = createChannel(seed, 2, mode, sideKey);
const initialRoot = channelRoot(channelState);
const chunkSize = 4;
const chunk = await mamFetchAll(client, initialRoot, mode, sideKey, chunkSize);

// If you want to fetch the next message from a list of channels
const channels = [
  { root: initialRoot1, mode: "restricted", sideKey: "MYKEY" },
  { root: initialRoot2, mode: "public" },
];
// One message for each channel will be retrieved
const fetched = await mamFetchCombined(api, channels);
```

## API Reference

See the API reference for the Javascript implementation [here](./docs/api.md).

## Examples

To see the MAMv0 in action demonstration code using this library can be found in the [./examples/](./examples/README.md) folder.

## License

MIT License - Copyright (c) 2020 IOTA Stiftung
