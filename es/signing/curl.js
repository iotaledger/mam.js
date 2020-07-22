"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curl = void 0;
/**
 * Class to implement Curl sponge.
 * @private
 */
class Curl {
    /**
     * Create a new instance of Curl.
     * @param rounds The number of rounds to perform.
     */
    constructor(rounds = Curl.NUMBER_OF_ROUNDS) {
        if (rounds !== 27 && rounds !== 81) {
            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
        }
        this._state = new Int8Array(Curl.STATE_LENGTH);
        this._rounds = rounds;
    }
    /**
     * Resets the state
     */
    reset() {
        this._state = new Int8Array(Curl.STATE_LENGTH);
    }
    /**
     * Get the state of the sponge.
     * @param len The length of the state to get.
     * @returns The state.
     */
    rate(len = Curl.HASH_LENGTH) {
        return this._state.slice(0, len);
    }
    /**
     * Absorbs trits given an offset and length
     * @param trits The trits to absorb.
     * @param offset The offset to start abororbing from the array.
     * @param length The length of trits to absorb.
     */
    absorb(trits, offset, length) {
        do {
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            this._state.set(trits.subarray(offset, offset + limit));
            this.transform();
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    }
    /**
     * Squeezes trits given an offset and length
     * @param trits The trits to squeeze.
     * @param offset The offset to start squeezing from the array.
     * @param length The length of trits to squeeze.
     */
    squeeze(trits, offset, length) {
        do {
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            trits.set(this._state.subarray(0, limit), offset);
            this.transform();
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    }
    /**
     * Sponge transform function
     */
    transform() {
        let stateCopy;
        let index = 0;
        for (let round = 0; round < this._rounds; round++) {
            stateCopy = this._state.slice();
            for (let i = 0; i < Curl.STATE_LENGTH; i++) {
                this._state[i] =
                    Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
            }
        }
    }
}
exports.Curl = Curl;
/**
 * The Hash Length
 */
Curl.HASH_LENGTH = 243;
/**
 * The State Length.
 */
Curl.STATE_LENGTH = 3 * Curl.HASH_LENGTH;
/**
 * The default number of rounds.
 */
Curl.NUMBER_OF_ROUNDS = 81;
/**
 * Truth Table.
 */
Curl.TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2N1cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7OztHQUdHO0FBQ0gsTUFBYSxJQUFJO0lBK0JiOzs7T0FHRztJQUNILFlBQVksU0FBaUIsSUFBSSxDQUFDLGdCQUFnQjtRQUM5QyxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7U0FDekY7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUMsTUFBYyxJQUFJLENBQUMsV0FBVztRQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUMxRCxHQUFHO1lBQ0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUVwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQztTQUNuQixRQUFRLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLEtBQWdCLEVBQUUsTUFBYyxFQUFFLE1BQWM7UUFDM0QsR0FBRztZQUNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFFcEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUM7U0FDbkIsUUFBUSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNLLFNBQVM7UUFDYixJQUFJLFNBQVMsQ0FBQztRQUNkLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0RztTQUNKO0lBQ0wsQ0FBQzs7QUEvR0wsb0JBZ0hDO0FBL0dHOztHQUVHO0FBQ29CLGdCQUFXLEdBQVcsR0FBRyxDQUFDO0FBRWpEOztHQUVHO0FBQ29CLGlCQUFZLEdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFFbkU7O0dBRUc7QUFDcUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO0FBRXREOztHQUVHO0FBQ3FCLGdCQUFXLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==