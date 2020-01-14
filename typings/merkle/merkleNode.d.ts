/**
 * Class to represent a node in a merkle tree.
 * @private
 */
export declare class MerkleNode {
    /**
     * The left element for the node.
     */
    left?: MerkleNode;
    /**
     * The right element for the node.
     */
    right?: MerkleNode;
    /**
     * The size of the node.
     */
    size: number;
    /**
     * The address hash of the node.
     */
    addressTrits: Int8Array;
    /**
     * The private key hash of the node.
     */
    privateKeyTrits?: Int8Array;
    /**
     * Create a new instance of MerkleNode.
     * @param left The left node.
     * @param right The right node.
     * @param addressTrits The trits representing the address.
     * @param privateKeyTrits The trits for the private key.
     */
    constructor(left: MerkleNode | undefined, right: MerkleNode | undefined, addressTrits: Int8Array, privateKeyTrits: Int8Array | undefined);
}
