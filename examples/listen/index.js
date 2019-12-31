const { composeAPI } = require('@iota/core');
const { trytesToAscii } = require('@iota/converter')
const { createChannel, channelRoot, mamFetchAll } = require('@iota/mam.js');
const fs = require('fs');

async function run(root, mode, sideKey, interval) {
    const api = composeAPI({ provider: "http://bare01.devnet.iota.cafe:14265" });

    setInterval(async () => {
        console.log('Fetching from tangle, please wait...');
        const fetched = await mamFetchAll(api, root, mode, sideKey);
        if (fetched && fetched.length > 0) {
            for (let i = 0; i < fetched.length; i++) {
                console.log('Fetched', trytesToAscii(fetched[i].message));
            }
            root = fetched[fetched.length - 1].nextRoot;
        } else {
            console.log('Nothing was fetched from the MAM channel');
        }
    }, interval);
}

// Try and load the channel state from json file
try {
    run("VTXFAIPQDISPWZAUSLAZWIMFZNOYLCJTKMPS9EPOIIQDNGJJXYBMFRAFUMEB9MMCWSFMXJAPKEOZQWVFF", "public", undefined, 5000)
        .then(() => console.log("Running in background"))
        .catch((err) => console.error(err));
} catch (e) { 
    console.error(e);
}

