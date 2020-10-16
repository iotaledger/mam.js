/// <reference types="node" />
/**
 * Class to help with Blake2B Signature scheme.
 */
export declare class Blake2b {
    /**
     * Blake2b 256.
     */
    static SIZE_256: number;
    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    static sum256(data: Buffer): Buffer;
}
