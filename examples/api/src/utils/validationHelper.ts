/**
 * Helper functions for validating input.
 */
export class ValidationHelper {
    /**
     * Is the parameter empty.
     * @param name The name of the parameter.
     * @param param The parameter value.
     */
    public static isEmpty(name: string, param: unknown): void {
        if (param === undefined || param === null) {
            throw new Error(`The parameter '${name}' has an invalid value, it can not be empty.`);
        }
    }

    /**
     * Does the string have some content.
     * @param name The parameter name.
     * @param str The string to validate.
     * @param err Optional error to replace the standard one.
     */
    public static string(name: string, str?: string, err?: string): void {
        if (typeof (str) !== "string" || str.trim().length === 0) {
            throw new Error(err ? err : `The parameter '${name}' is not defined or not a string.`);
        }
    }

    /**
     * Does the number have a value.
     * @param name The parameter name.
     * @param num The number to validate.
     */
    public static number(name: string, num: number): void {
        if (typeof num !== "number") {
            throw new TypeError(`The parameter '${name}' is not defined or not a number.`);
        }
    }

    /**
     * Does the boolean have a value.
     * @param name The parameter name.
     * @param b The boolean to validate.
     */
    public static boolean(name: string, b: boolean): void {
        if (typeof b !== "boolean") {
            throw new TypeError(`The parameter '${name}' is not defined or not a boolean.`);
        }
    }

    /**
     * Does the array have a value
     * @param name The parameter name.
     * @param arr The list to validate.
     */
    public static array(name: string, arr: string[]): void {
        if (!(Array.isArray(arr))) {
            throw new TypeError(`The parameter '${name}' is not defined or not an array.`);
        }
    }

    /**
     * Is the value of one the specified items.
     * @param name The parameter name.
     * @param val The value to validate.
     * @param options The possible options.
     */
    public static oneOf(name: string, val: string, options: string[]): void {
        if (!options.includes(val)) {
            throw new Error(`The parameter '${name}' should be one of [${options.join(", ")}].`);
        }
    }
}
