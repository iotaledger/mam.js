"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModeKey = void 0;
const trytesHelper_1 = require("./trytesHelper");
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
            throw new Error("You must provide a sideKey for restricted mode");
        }
        if (!trytesHelper_1.TrytesHelper.isTrytes(sideKey)) {
            throw new Error("The sideKey must be in trytes");
        }
        if (sideKey.length > 81) {
            throw new Error("The sideKey must be maximum length 81 trytes");
        }
    }
    if (mode !== "restricted" && sideKey) {
        throw new Error("sideKey is only used in restricted mode");
    }
}
exports.validateModeKey = validateModeKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2d1YXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpREFBOEM7QUFFOUM7Ozs7O0dBS0c7QUFDSCxTQUFnQixlQUFlLENBQUMsSUFBYSxFQUFFLE9BQWdCO0lBQzNELElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUN0RjtJQUNELElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO0tBQ0o7SUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksT0FBTyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztLQUM5RDtBQUNMLENBQUM7QUFsQkQsMENBa0JDIn0=