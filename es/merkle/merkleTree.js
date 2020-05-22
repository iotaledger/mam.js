"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
const converter_1 = require("@iota/converter");
const curl_1 = require("../signing/curl");
const merkleHashGenerator_1 = require("./merkleHashGenerator");
const merkleNode_1 = require("./merkleNode");
/**
 * Class to represent a merkle tree.
 * @private
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
        const seedTrits = converter_1.trits(seed);
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
            if ((i & index) === 0) {
                sponge.absorb(rate, 0, rate.length);
                sponge.absorb(chunk, 0, chunk.length);
            }
            else {
                sponge.absorb(chunk, 0, chunk.length);
                sponge.absorb(rate, 0, rate.length);
            }
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
        if (this.root.size === 1) {
            return {
                key: this.root.left && this.root.left.privateKeyTrits
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
            key: privateKey || new Int8Array(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBd0M7QUFDeEMsMENBQXVDO0FBQ3ZDLCtEQUF3RDtBQUN4RCw2Q0FBMEM7QUFFMUM7OztHQUdHO0FBQ0gsTUFBYSxVQUFVO0lBTW5COzs7Ozs7T0FNRztJQUNILFlBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDcEUsTUFBTSxTQUFTLEdBQUcsaUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixNQUFNLGlCQUFpQixHQUFHLHFDQUFlLENBQUMsU0FBUyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFlLEVBQUUsUUFBbUIsRUFBRSxLQUFhO1FBQ2xFLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE1BQU0sU0FBUyxH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