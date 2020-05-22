"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModeKey = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2d1YXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNEM7QUFHNUM7Ozs7O0dBS0c7QUFDSCxTQUFnQixlQUFlLENBQUMsSUFBYSxFQUFFLE9BQWdCO0lBQzNELElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUN0RjtJQUNELElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLHFCQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDbkU7S0FDSjtJQUNELElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxPQUFPLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0tBQzlEO0FBQ0wsQ0FBQztBQWxCRCwwQ0FrQkMifQ==