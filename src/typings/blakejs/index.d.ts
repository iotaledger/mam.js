declare module "blakejs" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface IBlakeContext { }

    /**
     * Blake2b.
     * @param input The input bytes, as a string, Buffer, or Uint8Array.
     * @param key Optional key Uint8Array, up to 64 bytes.
     * @param outlen Optional output length in bytes, default 64.
     */
    export function blake2b(input: string | Buffer | Uint8Array, key?: Uint8Array, outlen?: number): Uint8Array;

    /**
     * Blake2b init context.
     * @param key Optional key Uint8Array, up to 64 bytes.
     * @param outlen Optional output length in bytes, default 64.
     */
    export function blake2bInit(key?: Uint8Array, outlen?: number): IBlakeContext;

    /**
     * Blake2b update.
     * @param context The context to update.
     * @param input The input bytes, as a string, Buffer, or Uint8Array.
     */
    export function blake2bUpdate(context: IBlakeContext, input: string | Buffer | Uint8Array): IBlakeContext;

    /**
     * Blake2b final.
     * @param context The context to finalise.
     */
    export function blake2bFinal(context: IBlakeContext): Uint8Array;
}
