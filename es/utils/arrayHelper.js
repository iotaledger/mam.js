"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatenate = void 0;
/**
 * Concatentate a list of arrays.
 * @param arrays The arrays to concatenate.
 * @returns The concatenated arrays.
 * @private
 */
function concatenate(arrays) {
    let totalLength = 0;
    for (const arr of arrays) {
        totalLength += arr.length;
    }
    const result = new Int8Array(totalLength);
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
exports.concatenate = concatenate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXlIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsTUFBbUI7SUFDM0MsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3RCLFdBQVcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7S0FDeEI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBWkQsa0NBWUMifQ==