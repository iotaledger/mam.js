"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleNode = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7O0dBR0c7QUFDSCxNQUFhLFVBQVU7SUFzQm5COzs7Ozs7T0FNRztJQUNILFlBQ0ksSUFBNEIsRUFDNUIsS0FBNkIsRUFDN0IsWUFBdUIsRUFDdkIsZUFBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQXhDRCxnQ0F3Q0MifQ==