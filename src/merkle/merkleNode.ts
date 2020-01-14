/**
 * Class to represent a node in a merkle tree.
 * @private
 */
export class MerkleNode {
    /**
     * The left element for the node.
     */
    public left?: MerkleNode;
    /**
     * The right element for the node.
     */
    public right?: MerkleNode;
    /**
     * The size of the node.
     */
    public size: number;
    /**
     * The address hash of the node.
     */
    public addressTrits: Int8Array;
    /**
     * The private key hash of the node.
     */
    public privateKeyTrits?: Int8Array;

    /**
     * Create a new instance of MerkleNode.
     * @param left The left node.
     * @param right The right node.
     * @param addressTrits The trits representing the address.
     * @param privateKeyTrits The trits for the private key.
     */
    constructor(
        left: MerkleNode | undefined,
        right: MerkleNode | undefined,
        addressTrits: Int8Array,
        privateKeyTrits: Int8Array | undefined) {
        this.left = left;
        this.right = right;
        this.size = (left ? left.size : 0) + (right ? right.size : 0);
        this.addressTrits = addressTrits;
        this.privateKeyTrits = privateKeyTrits;
    }
}
