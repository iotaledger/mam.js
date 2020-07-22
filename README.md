# mam.js

> This package is currently in beta

Implementation of Masked Authentication Messaging v0 for IOTA in pure JavaScript.

This repo is an alternative to `mam.client.js` that does not use the WASM wrapped version of the rust lib. Messages published/fetched by the other package can be used with this package and vice versa.

The code being pure JavaScript runs slower than the WASM version, but is considerably smaller in resource overhead. The size of `mam.client.js` is 3.3Mb (1.4Mb compressed), this lib is 51Kb (15Kb compressed).

This package uses the standard `iota.js` for all its tangle operations, so providers/attachToTangle etc can be configured with the same flexibility they can in that package.

The methods in this package are different to `mam.client.js` in order to try and simplify its usage.

## Installing

Install this package using the following commands:

```shell
npm install @iota/mam.js
```

or

```shell
yarn add @iota/mam.js
```

or direct from the repo

```shell
npm install iotaledger/mam.js
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
const api = composeAPI({ provider: "https://altnodes.devnet.iota.org:443" });
// And then attach the message, tagging it if required.
// Attaching will return the actual transactions attached to the tangle if you need them.
await mamAttach(api, mamMessage, 3, 9, "MY9MAM");

// We can also fetch a message given its root and channel details.
// The fetched data will contain the nextRoot and the message.
const fetched = await mamFetch(api, mamMessage.root, mode, sideKey)

// If you want to fetch multiple messages from a channel
// you need either its initial root (or start from another root).
const channelState = createChannel(seed, 2, mode, sideKey);
const initialRoot = channelRoot(channelState);
const chunkSize = 4;
const chunk = await mamFetchAll(api, initialRoot, mode, sideKey, chunkSize);

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

MIT License - Copyright (c) 2019 IOTA Stiftung
