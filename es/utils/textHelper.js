"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHelper = void 0;
/**
 * Helper functions for use with text.
 */
class TextHelper {
    /**
     * Encode Non ASCII characters to escaped characters.
     * @param value The value to encode.
     * @returns The encoded value.
     */
    static encodeNonASCII(value) {
        return typeof value === "string"
            ? value.replace(/[\u007F-\uFFFF]/g, chr => `\\u${(`0000${chr.charCodeAt(0).toString(16)}`).slice(-4)}`)
            : undefined;
    }
    /**
     * Decode escaped Non ASCII characters.
     * @param value The value to decode.
     * @returns The decoded value.
     */
    static decodeNonASCII(value) {
        return typeof value === "string"
            ? value.replace(/\\u(\w{4})/gi, (match, grp) => String.fromCharCode(Number.parseInt(grp, 16)))
            : undefined;
    }
}
exports.TextHelper = TextHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0lBQ25COzs7O09BSUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQXlCO1FBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUTtZQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQXlCO1FBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUTtZQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUYsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUF0QkQsZ0NBc0JDIn0=