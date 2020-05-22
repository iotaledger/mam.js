"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddress = void 0;
const iss_p27_1 = require("../signing/iss-p27");
/**
 * Generate an address for the merklr tree.
 * @param seedTrits The trits for the seed.
 * @param index The index of the address to generate.
 * @param security The security level of the address to generate.
 * @returns The address and the private key.
 * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlSGFzaEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlSGFzaEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBZ0c7QUFFaEc7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxTQUFvQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtJQVVqRixNQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxNQUFNLEVBQUUsR0FBRywyQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sRUFBRSxpQkFBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQixVQUFVLEVBQUUsK0JBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQztLQUNsRCxDQUFDO0FBQ04sQ0FBQztBQWpCRCwwQ0FpQkMifQ==