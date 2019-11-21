import Curl from "@iota/curl";
export declare const STATE_LENGTH: number;
/**
 * Extract the state from the curl sponge.
 * @param sponge The sponge to extract the state from.
 * @param len The length of the state to extract.
 * @returns The extracted state.
 */
export declare function curlRate(sponge: Curl, len?: number): Int8Array;
