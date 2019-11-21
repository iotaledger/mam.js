const { composeAPI } = require('@iota/core');
const { createChannel, createMessage, parseMessage, mamAttach, mamFetch } = require('@iota/mam.js');
const fs = require('fs');

async function run() {
    // Setup the details for the channel.
    const mode = 'restricted';
    const sideKey = 'MYKEY';
    // Replace this with your own test seed
    const seed = 'THIS9IS9MY9EXAMPLE9FOR9MAM9THIS9IS9MY9EXAMPLE9FOR9MAM9THIS9IS9MY9EXAMPLE9FOR9MAMD';
    const message = 'MY9MESSAGE';
    let channelState;

    // Try and load the channel state from json file
    try { 
        const currentState = fs.readFileSync('./channelState.json');
        if (currentState) {
            channelState = JSON.parse(currentState.toString());
        }
    } catch {}

    // If we couldn't load the details then create a new channel.
    if (!channelState) {
        channelState = createChannel(seed, 2, mode, sideKey)
    }

    // Create a MAM message using the channel state.
    const mamMessage = createMessage(channelState, message);

    // Display the details for the MAM message.
    console.log('Address:', mamMessage.address);
    console.log('Root:', mamMessage.root);
    console.log('NextRoot:', mamMessage.nextRoot);
    console.log('Payload:', mamMessage.payload);

    // Decode the message using the root and sideKey.
    // This is only for demonstration purposes, there is no reason to decode at this point
    const decodedMessage = parseMessage(mamMessage.payload, mamMessage.root, sideKey);

    // Display the decoded data.
    console.log('Decoded NextRoot', decodedMessage.nextRoot);
    console.log('Decoded Message', decodedMessage.message);

    // Store the updated channel state.
    try { 
        fs.writeFileSync('./channelState.json', JSON.stringify(channelState, undefined, "\t"));
    } catch {}

    // So far we have shown how to create and parse a message
    // but now we actually want to attach the message to the tangle
    const api = composeAPI({ provider: "https://altnodes.devnet.iota.org:443" });

    // Attach the message.
    console.log('Attaching to tangle, please wait...')
    await mamAttach(api, mamMessage, 3, 9, "MY9MAM");
    console.log(`You can view the mam channel here https://utils.iota.org/mam/${mamMessage.root}/${mode}/${sideKey}/devnet`);

    // Try fetching it as well.
    console.log('Fetching from tangle, please wait...');
    const fetched = await mamFetch(api, mamMessage.root, mode, sideKey)
    console.log('Fetched', fetched);
}

run()
    .then(() => console.log("done"))
    .catch((err) => console.error(err));