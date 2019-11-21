"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const curl_1 = __importDefault(require("@iota/curl"));
exports.STATE_LENGTH = 3 * curl_1.default.HASH_LENGTH;
/**
 * Extract the state from the curl sponge.
 * @param sponge The sponge to extract the state from.
 * @param len The length of the state to extract.
 * @returns The extracted state.
 */
function curlRate(sponge, len = curl_1.default.HASH_LENGTH) {
    // We have to cast to any as the state is not accesible
    // tslint:disable-next-line: no-any
    return sponge.state.slice(0, len);
}
exports.curlRate = curlRate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jdXJsSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRWpCLFFBQUEsWUFBWSxHQUFXLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDO0FBRXpEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLE1BQVksRUFBRSxNQUFjLGNBQUksQ0FBQyxXQUFXO0lBQ2pFLHVEQUF1RDtJQUN2RCxtQ0FBbUM7SUFDbkMsT0FBYSxNQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUpELDRCQUlDIn0=