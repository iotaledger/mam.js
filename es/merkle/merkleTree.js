// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Curl } from "@iota/crypto.js";
import { TrytesHelper } from "../utils/trytesHelper";
import { generateAddress } from "./merkleHashGenerator";
import { MerkleNode } from "./merkleNode";
/**
 * Class to represent a merkle tree.
 * @internal
 */
export class MerkleTree {
    /**
     * Create a new instance of the merkle tree.
     * @param seed The seed to use for the tree.
     * @param index The start index for the creation.
     * @param count The count for the creation.
     * @param security The security level to create the hashes.
     */
    constructor(seed, index, count, security) {
        const seedTrits = TrytesHelper.toTrits(seed);
        const leaves = [];
        for (let i = 0; i < count; i++) {
            const addressPrivateKey = generateAddress(seedTrits, index + i, security);
            leaves.push(new MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
            leaves[i].size = 1;
        }
        this.root = this.buildTree(leaves);
    }
    /**
     * Recalculate the root for the siblings.
     * @param rate The current address.
     * @param siblings The siblings data.
     * @param index The index in the tree.
     * @returns The new sibling root.
     */
    static root(rate, siblings, index) {
        const sponge = new Curl(27);
        let i = 1;
        const numChunks = Math.ceil(siblings.length / Curl.HASH_LENGTH);
        for (let c = 0; c < numChunks; c++) {
            const chunk = siblings.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);
            sponge.reset();
            // eslint-disable-next-line no-bitwise
            if ((i & index) === 0) {
                sponge.absorb(rate, 0, rate.length);
                sponge.absorb(chunk, 0, chunk.length);
            }
            else {
                sponge.absorb(chunk, 0, chunk.length);
                sponge.absorb(rate, 0, rate.length);
            }
            // eslint-disable-next-line no-bitwise
            i <<= 1;
            rate = sponge.rate();
        }
        return sponge.rate();
    }
    /**
     * Get a sub tree.
     * @param index The index of the subtree.
     * @returns The key and leaves for the sub tree.
     */
    getSubtree(index) {
        var _a;
        if (this.root.size === 1) {
            return {
                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits)
                    ? this.root.left.privateKeyTrits : new Int8Array(), leaves: []
            };
        }
        const leaves = [];
        let node = this.root;
        let size = this.root.size;
        let privateKey;
        if (index < size) {
            while (node) {
                if (!node.left) {
                    privateKey = node.privateKeyTrits;
                    break;
                }
                size = node.left.size;
                if (index < size) {
                    leaves.push(node.right ? node.right : node.left);
                    node = node.left;
                }
                else {
                    leaves.push(node.left);
                    node = node.right;
                    index -= size;
                }
            }
        }
        leaves.reverse();
        return {
            key: privateKey !== null && privateKey !== void 0 ? privateKey : new Int8Array(),
            leaves
        };
    }
    /**
     * Build tree from the leaf hashes.
     * @param leaves The leaves to build the tree from.
     * @returns The root node.
     */
    buildTree(leaves) {
        const subnodes = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = (i + 1 < leaves.length) ? leaves[i + 1] : undefined;
            let addressTrits;
            if (right) {
                const sponge = new Curl(27);
                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
                addressTrits = new Int8Array(Curl.HASH_LENGTH);
                sponge.squeeze(addressTrits, 0, addressTrits.length);
            }
            else {
                addressTrits = left.addressTrits;
            }
            subnodes.push(new MerkleNode(left, right, addressTrits, undefined));
        }
        if (subnodes.length === 1) {
            return subnodes[0];
        }
        return this.buildTree(subnodes);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFNbkI7Ozs7OztPQU1HO0lBQ0gsWUFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNwRSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFlLEVBQUUsUUFBbUIsRUFBRSxLQUFhO1FBQ2xFLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2QztZQUVELHNDQUFzQztZQUN0QyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRVIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksVUFBVSxDQUFDLEtBQWE7O1FBVTNCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU87Z0JBQ0gsR0FBRyxFQUFFLENBQUEsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksMENBQUUsZUFBZTtvQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTthQUNyRSxDQUFDO1NBQ0w7UUFFRCxNQUFNLE1BQU0sR0FBaUIsRUFBRSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUEyQixJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksVUFBaUMsQ0FBQztRQUV0QyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7WUFDZCxPQUFPLElBQUksRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDWixVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztvQkFDbEMsTUFBTTtpQkFDVDtnQkFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRTtvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDbEIsS0FBSyxJQUFJLElBQUksQ0FBQztpQkFDakI7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWpCLE9BQU87WUFDSCxHQUFHLEVBQUUsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksSUFBSSxTQUFTLEVBQUU7WUFDbEMsTUFBTTtTQUNULENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLFNBQVMsQ0FBQyxNQUFvQjtRQUNsQyxNQUFNLFFBQVEsR0FBaUIsRUFBRSxDQUFDO1FBRWxDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNsRSxJQUFJLFlBQVksQ0FBQztZQUVqQixJQUFJLEtBQUssRUFBRTtnQkFDUCxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWhFLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0gsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDcEM7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSiJ9