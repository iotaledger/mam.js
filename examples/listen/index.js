const { SingleNodeClient } = require("@iota/iota2.js");
const { createChannel, channelRoot, mamFetchAll, TrytesHelper } = require('@iota/mam-chrysalis.js');
const fs = require('fs');

async function run(root, mode, sideKey, interval) {
    const client = new SingleNodeClient("http://localhost:14265");

    setInterval(async () => {
        console.log('Fetching from tangle, please wait...');
        const fetched = await mamFetchAll(client, root, mode, sideKey);
        if (fetched && fetched.length > 0) {
            for (let i = 0; i < fetched.length; i++) {
                console.log('Fetched', TrytesHelper.toAscii(fetched[i].message));
            }
            root = fetched[fetched.length - 1].nextRoot;
        } else {
            console.log('Nothing was fetched from the MAM channel');
        }
    }, interval);
}

// Try and load the channel state from json file
try {
    const currentState = fs.readFileSync('../simple/channelState.json');
    if (currentState) {
        channelState = JSON.parse(currentState.toString());

        // To start reading from the beginning of the channel clone the channel details
        let root = channelRoot(createChannel(channelState.seed, channelState.security, channelState.mode, channelState.sideKey));
        // Or to read from its current position just use the channel state
        // let root = channelRoot(channelState);

        run(root, channelState.mode, channelState.sideKey, 5000)
            .then(() => console.log("Running in background"))
            .catch((err) => console.error(err));
    } else {
        throw new Error("The simple example has not been run so there is no channel to listen to");
    }
} catch (e) { 
    console.error(e);
}

