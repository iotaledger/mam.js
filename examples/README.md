# IOTA MAM v0

The following examples are available.

## Simple

Demonstrates a simple publish and fetch of ascii text data using MAM v0, the channel state is stored in `channelState.json` between each execution.

A random seed will be generated, which is then stored as part of the state file, so subsequent executions will add to the same channel.

See [./simple/index.js](./simple/index.js) for more details.

## Simple with JSON

Demonstrates a simple publish and fetch of json data using MAM v0, the channel state is stored in `channelState.json` between each execution.

A random seed will be generated, which is then stored as part of the state file, so subsequent executions will add to the same channel.

See [./simple-json/index.js](./simple-json/index.js) for more details.
