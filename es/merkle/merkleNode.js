"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to represent a node in a merkle tree.
 * @private
 */
class MerkleNode {
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
exports.MerkleNode = MerkleNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7R0FHRztBQUNILE1BQWEsVUFBVTtJQXNCbkI7Ozs7OztPQU1HO0lBQ0gsWUFDSSxJQUE0QixFQUM1QixLQUE2QixFQUM3QixZQUF1QixFQUN2QixlQUFzQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBeENELGdDQXdDQyJ9