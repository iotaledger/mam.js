"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curl = void 0;
/**
 * Class to implement Curl sponge.
 * @private
 */
let Curl = /** @class */ (() => {
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
    return Curl;
})();
exports.Curl = Curl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2N1cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7OztHQUdHO0FBQ0g7SUFBQSxNQUFhLElBQUk7UUErQmI7OztXQUdHO1FBQ0gsWUFBWSxTQUFpQixJQUFJLENBQUMsZ0JBQWdCO1lBQzlDLElBQUksTUFBTSxLQUFLLEVBQUUsSUFBSSxNQUFNLEtBQUssRUFBRSxFQUFFO2dCQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7YUFDekY7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRUQ7O1dBRUc7UUFDSSxLQUFLO1lBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxJQUFJLENBQUMsTUFBYyxJQUFJLENBQUMsV0FBVztZQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxNQUFNLENBQUMsS0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztZQUMxRCxHQUFHO2dCQUNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBRXBFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDO2FBQ25CLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN6QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxPQUFPLENBQUMsS0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztZQUMzRCxHQUFHO2dCQUNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBRXBFLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVsRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDO2FBQ25CLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN6QixDQUFDO1FBRUQ7O1dBRUc7UUFDSyxTQUFTO1lBQ2IsSUFBSSxTQUFTLENBQUM7WUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDL0MsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDdEc7YUFDSjtRQUNMLENBQUM7O0lBOUdEOztPQUVHO0lBQ29CLGdCQUFXLEdBQVcsR0FBRyxDQUFDO0lBRWpEOztPQUVHO0lBQ29CLGlCQUFZLEdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFFbkU7O09BRUc7SUFDcUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO0lBRXREOztPQUVHO0lBQ3FCLGdCQUFXLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUE2RnpGLFdBQUM7S0FBQTtBQWhIWSxvQkFBSSJ9