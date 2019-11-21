import Curl from "@iota/curl";

export const STATE_LENGTH: number = 3 * Curl.HASH_LENGTH;

/**
 * Extract the state from the curl sponge.
 * @param sponge The sponge to extract the state from.
 * @param len The length of the state to extract.
 * @returns The extracted state.
 */
export function curlRate(sponge: Curl, len: number = Curl.HASH_LENGTH): Int8Array {
    // We have to cast to any as the state is not accesible
    // tslint:disable-next-line: no-any
    return (<any>sponge).state.slice(0, len);
}
