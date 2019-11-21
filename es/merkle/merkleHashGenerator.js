"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iss_p27_1 = require("../signing/iss-p27");
/**
 * Generate an address for the merklr tree.
 * @param seedTrits The trits for the seed.
 * @param index The index of the address to generate.
 * @param security The security level of the address to generate.
 * @returns The address and the private key.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlSGFzaEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlSGFzaEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRztBQUVoRzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixlQUFlLENBQUMsU0FBb0IsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7SUFVakYsTUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsTUFBTSxFQUFFLEdBQUcsMkJBQWlCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTNDLE9BQU87UUFDSCxPQUFPLEVBQUUsaUJBQU8sQ0FBQyxFQUFFLENBQUM7UUFDcEIsVUFBVSxFQUFFLCtCQUFxQixDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUM7S0FDbEQsQ0FBQztBQUNOLENBQUM7QUFqQkQsMENBaUJDIn0=