import { TrytesHelper } from "./trytesHelper";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2d1YXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQWEsRUFBRSxPQUFnQjtJQUMzRCxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELElBQUksR0FBRyxDQUFDLENBQUM7S0FDdEY7SUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO0tBQ0o7SUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksT0FBTyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztLQUM5RDtBQUNMLENBQUMifQ==