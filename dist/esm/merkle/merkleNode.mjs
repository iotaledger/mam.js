// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Class to represent a node in a merkle tree.
 * @internal
 */
export class MerkleNode {
    /**
     * Create a new instance of MerkleNode.
     * @param left The left node.
     * @param right The right node.
     * @param addressTrits The trits representing the address.
     * @param privateKeyTrits The trits for the private key.
     */
    constructor(left, right, addressTrits, privateKeyTrits) {
        this.left = left;
        this.right = right;
        this.size = (left ? left.size : 0) + (right ? right.size : 0);
        this.addressTrits = addressTrits;
        this.privateKeyTrits = privateKeyTrits;
    }
}
