import { MamMode } from "./mamMode";

/**
 * Definition of a channel object.
 */
export interface IMamChannelState {
    /**
     * The seed for the channel.
     */
    seed: string;
    /**
     * The mode for the channel.
     */
    mode: MamMode;
    /**
     * Side key used for restricted mode.
     */
    sideKey?: string;
    /**
     * The security level for the channel.
     */
    security: number;
    /**
     * The start index for the channel.
     */
    start: number;
    /**
     * The count for the channel.
     */
    count: number;
    /**
     * The next root for the channel.
     */
    nextRoot?: string;
    /**
     * The next count for the channel.
     */
    nextCount: number;
    /**
     * The index for the channel.
     */
    index: number;
}
