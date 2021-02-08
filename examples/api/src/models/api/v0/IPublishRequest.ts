export interface IPublishRequest {
    /**
     * What provider are we using to publish.
     */
    provider: string | "chrysalis";

    /**
     * The mode for publishing the message.
     */
    mode: "public" | "private" | "restricted";

    /**
     * Key that is required for the data in restricted mode.
     */
    key?: string;

    /**
     * What is the seed we are using to publish the mam channel.
     */
    seed: string;

    /**
     * What is the index we are publishing at.
     */
    index?: number;

    /**
     * What is the data type.
     */
    dataType: "trytes" | "text" | "json";

    /**
     * What is the data to publish in the channel.
     */
    data: unknown;

    /**
     * An optional tag to include with the transaction.
     */
    tag?: string;
}
