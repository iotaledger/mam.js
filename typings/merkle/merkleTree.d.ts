import { MerkleNode } from "./merkleNode";
/**
 * Class to represent a merkle tree.
 * @private
 */
export declare class MerkleTree {
    /**
     * The root of the tree.
     */
    root: MerkleNode;
    /**
     * Create a new instance of the merkle tree.
     * @param seed The seed to use for the tree.
     * @param index The start index for the creation.
     * @param count The count for the creation.
     * @param security The security level to create the hashes.
     */
    constructor(seed: string, index: number, count: number, security: number);
    /**
     * Recalculate the root for the siblings.
     * @param rate The current address.
     * @param siblings The siblings data.
     * @param index The index in the tree.
     * @returns The new sibling root.
     */
    static root(rate: Int8Array, siblings: Int8Array, index: number): Int8Array;
    /**
     * Get a sub tree.
     * @param index The index of the subtree.
     * @returns The key and leaves for the sub tree.
     */
    getSubtree(index: number): {
        /**
         * The combined key for the subtree.
         */
        key: Int8Array;
        /**
         * The leaves of the subtree.
         */
        leaves: MerkleNode[];
    };
    /**
     * Build tree from the leaf hashes.
     * @param leaves The leaves to build the tree from.
     * @returns The root node.
     */
    private buildTree;
}
