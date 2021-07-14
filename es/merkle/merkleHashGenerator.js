// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { address, digestFromSubseed, privateKeyFromSubseed, subseed } from "../signing/iss-p27";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlSGFzaEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlSGFzaEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEc7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBb0IsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7SUFVakYsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxNQUFNLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3BCLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0tBQ2xELENBQUM7QUFDTixDQUFDIn0=