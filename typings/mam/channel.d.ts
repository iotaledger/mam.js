import { IMamChannelState } from "../models/IMamChannelState";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
/**
 * Create a new channel object.
 * @param seed The seed for the channel.
 * @param security The security level for the channel.
 * @param mode The mode for the channel.
 * @param sideKey The side key to use for restricted mode.
 * @returns The new channel state.
 */
export declare function createChannel(seed: string, security: number, mode: MamMode, sideKey?: string): IMamChannelState;
/**
 * Get the root of the channel.
 * @param channelState The channel state to get the root.
 * @returns The root.
 */
export declare function channelRoot(channelState: IMamChannelState): string;
/**
 * Prepare a message on the mam channel.
 * @param channelState The channel to prepare the message for.
 * @param message The trytes to include in the message.
 * @returns The prepared message, the channel state will also be updated.
 */
export declare function createMessage(channelState: IMamChannelState, message: string): IMamMessage;
