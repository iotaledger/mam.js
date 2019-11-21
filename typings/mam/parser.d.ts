/**
 * Parse the trytes back to the original message.
 * @param payload The trytes to decode.
 * @param root The root for the message.
 * @param channelKey The key used to encode the data.
 * @returns The decoded message.
 */
export declare function parseMessage(payload: string, root: string, channelKey?: string): {
    /**
     * The next root.
     */
    nextRoot: string;
    /**
     * The decoded message.
     */
    message: string;
};
