"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("@iota/validators");
/**
 * Validate the mode and key.
 * @param mode The mamMode to validate.
 * @param sideKey The sideKey to validate.
 * @private
 */
function validateModeKey(mode, sideKey) {
    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
        throw new Error(`The mode must be public, private or restricted, it is '${mode}'`);
    }
    if (mode === "restricted") {
        if (!sideKey) {
            throw new Error(`You must provide a sideKey for restricted mode`);
        }
        if (!validators_1.isTrytes(sideKey)) {
            throw new Error(`The sideKey must be in trytes`);
        }
        if (sideKey.length > 81) {
            throw new Error(`The sideKey must be maximum length 81 trytes`);
        }
    }
    if (mode !== "restricted" && sideKey) {
        throw new Error(`sideKey is only used in restricted mode`);
    }
}
exports.validateModeKey = validateModeKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2d1YXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE0QztBQUc1Qzs7Ozs7R0FLRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxJQUFhLEVBQUUsT0FBZ0I7SUFDM0QsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLDBEQUEwRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO0tBQ3RGO0lBQ0QsSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDckU7UUFDRCxJQUFJLENBQUMscUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNuRTtLQUNKO0lBQ0QsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLE9BQU8sRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7S0FDOUQ7QUFDTCxDQUFDO0FBbEJELDBDQWtCQyJ9