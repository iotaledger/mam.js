// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { address, digestFromSubseed, privateKeyFromSubseed, subseed } from "../signing/iss-p27.mjs";
/**
 * Generate an address for the merklr tree.
 * @param seedTrits The trits for the seed.
 * @param index The index of the address to generate.
 * @param security The security level of the address to generate.
 * @returns The address and the private key.
 * @internal
 */
export function generateAddress(seedTrits, index, security) {
    const ss = subseed(seedTrits, index);
    const dg = digestFromSubseed(ss, security);
    return {
        address: address(dg),
        privateKey: privateKeyFromSubseed(ss, security)
    };
}
