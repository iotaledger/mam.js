"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blake2b = void 0;
const blakejs_1 = require("blakejs");
/**
 * Class to help with Blake2B Signature scheme.
 */
class Blake2b {
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    static sum256(data) {
        return Buffer.from(blakejs_1.blake2b(data, undefined, Blake2b.SIZE_256));
    }
}
exports.Blake2b = Blake2b;
/**
 * Blake2b 256.
 */
Blake2b.SIZE_256 = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxha2UyYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vYmxha2UyYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBa0M7QUFFbEM7O0dBRUc7QUFDSCxNQUFhLE9BQU87SUFNaEI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUM3QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7O0FBYkwsMEJBY0M7QUFiRzs7R0FFRztBQUNXLGdCQUFRLEdBQVcsRUFBRSxDQUFDIn0=