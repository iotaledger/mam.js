"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
const curl_1 = require("../signing/curl");
const trytesHelper_1 = require("../utils/trytesHelper");
const merkleHashGenerator_1 = require("./merkleHashGenerator");
const merkleNode_1 = require("./merkleNode");
/**
 * Class to represent a merkle tree.
 * @internal
 */
class MerkleTree {
    /**
     * Create a new instance of the merkle tree.
     * @param seed The seed to use for the tree.
     * @param index The start index for the creation.
     * @param count The count for the creation.
     * @param security The security level to create the hashes.
     */
    constructor(seed, index, count, security) {
        const seedTrits = trytesHelper_1.TrytesHelper.toTrits(seed);
        const leaves = [];
        for (let i = 0; i < count; i++) {
            const addressPrivateKey = merkleHashGenerator_1.generateAddress(seedTrits, index + i, security);
            leaves.push(new merkleNode_1.MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
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
        const sponge = new curl_1.Curl(27);
        let i = 1;
        const numChunks = Math.ceil(siblings.length / curl_1.Curl.HASH_LENGTH);
        for (let c = 0; c < numChunks; c++) {
            const chunk = siblings.slice(c * curl_1.Curl.HASH_LENGTH, (c + 1) * curl_1.Curl.HASH_LENGTH);
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
                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits) ? this.root.left.privateKeyTrits : new Int8Array(),
                leaves: []
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
                const sponge = new curl_1.Curl(27);
                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
                addressTrits = new Int8Array(curl_1.Curl.HASH_LENGTH);
                sponge.squeeze(addressTrits, 0, addressTrits.length);
            }
            else {
                addressTrits = left.addressTrits;
            }
            subnodes.push(new merkleNode_1.MerkleNode(left, right, addressTrits, undefined));
        }
        if (subnodes.length === 1) {
            return subnodes[0];
        }
        return this.buildTree(subnodes);
    }
}
exports.MerkleTree = MerkleTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBdUM7QUFDdkMsd0RBQXFEO0FBQ3JELCtEQUF3RDtBQUN4RCw2Q0FBMEM7QUFFMUM7OztHQUdHO0FBQ0gsTUFBYSxVQUFVO0lBTW5COzs7Ozs7T0FNRztJQUNILFlBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDcEUsTUFBTSxTQUFTLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsTUFBTSxpQkFBaUIsR0FBRyxxQ0FBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0csTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBZSxFQUFFLFFBQW1CLEVBQUUsS0FBYTtRQUNsRSxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixN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