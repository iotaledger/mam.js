import bigInt from "big-integer";

/**
 * PearDiverSearchStates for storing states during search.
 * @internal
 */
export interface PearlDiverSearchStates {
    /**
     * The low bits of the state
     */
    low: bigInt.BigInteger[];

    /**
     * The high bits of the state.
     */
    high: bigInt.BigInteger[];
}
