/**
 * Definition of fetch messages.
 */
export interface IMamFetchedMessage {
    /**
     * The message content fetched.
     */
    message: string;
    /**
     * The next root for the message.
     */
    nextRoot: string;
    /**
     * The tag of the transactions.
     */
    tag: string;
}
