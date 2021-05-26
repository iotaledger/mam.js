"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddress = void 0;
// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const iss_p27_1 = require("../signing/iss-p27");
/**
 * Generate an address for the merklr tree.
 * @param seedTrits The trits for the seed.
 * @param index The index of the address to generate.
 * @param security The security level of the address to generate.
 * @returns The address and the private key.
 * @internal
 */
function generateAddress(seedTrits, index, security) {
    const ss = iss_p27_1.subseed(seedTrits, index);
    const dg = iss_p27_1.digestFromSubseed(ss, security);
    return {
        address: iss_p27_1.address(dg),
        privateKey: iss_p27_1.privateKeyFromSubseed(ss, security)
    };
}
exports.generateAddress = generateAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlSGFzaEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlSGFzaEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGdEQUFnRztBQUVoRzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZUFBZSxDQUFDLFNBQW9CLEVBQUUsS0FBYSxFQUFFLFFBQWdCO0lBVWpGLE1BQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sRUFBRSxHQUFHLDJCQUFpQixDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzQyxPQUFPO1FBQ0gsT0FBTyxFQUFFLGlCQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3BCLFVBQVUsRUFBRSwrQkFBcUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0tBQ2xELENBQUM7QUFDTixDQUFDO0FBakJELDBDQWlCQyJ9