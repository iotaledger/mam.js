import { TrytesHelper } from "./trytesHelper.mjs";
/**
 * Validate the mode and key.
 * @param mode The mamMode to validate.
 * @param sideKey The sideKey to validate.
 * @internal
 */
export function validateModeKey(mode, sideKey) {
    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
        throw new Error(`The mode must be public, private or restricted, it is '${mode}'`);
    }
    if (mode === "restricted") {
        if (!sideKey) {
            throw new Error("You must provide a sideKey for restricted mode");
        }
        if (!TrytesHelper.isTrytes(sideKey)) {
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
