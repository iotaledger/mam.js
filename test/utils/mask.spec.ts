import { trits, TRYTE_ALPHABET, trytes } from "@iota/converter";
import * as crypto from "crypto";
import { Curl } from "../../src/signing/curl";
import { mask, maskHash, unmask } from "../../src/utils/mask";

test("maskHash() returns correct hashed version of trits", () => {
    const res = maskHash(trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"));
    expect(trytes(res)).toBe("KDNHTRIHZXNFJUDUXIBSBOSXNVINMENXQPQTQOCBKCPVOZO99WCMRMMLDASTPYLNCMIR99W9AFLLNUHOR");
});

test("mask() returns same trits with no other trits absorbed", () => {
    const curl = new Curl(81);
    const res = mask(trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(trytes(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("mask() returns trits with key trits absorbed", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(trytes(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK");
});

test("mask() returns trits with key trits absorbed double payload", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(trytes(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNPAWZLBEOIKHOQSMNGOFCIRJPOVTVJGZCSHFBZMAD9PTYHPXVQJBL9XMJBVSIS");
});

test("mask() returns trits with key trits absorbed non boundary payload", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(trytes(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNKSKHZEFURWWIOWHPSTVJXOBWGPPHZNK9AWKCLLYQXDGHKQV9RD9");
});

test("unmask() returns same trits with no other trits absorbed", () => {
    const curl = new Curl(81);
    const res = unmask(
        trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(trytes(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        trits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK"), curl);
    expect(trytes(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed double payload", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        trits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNPAWZLBEOIKHOQSMNGOFCIRJPOVTVJGZCSHFBZMAD9PTYHPXVQJBL9XMJBVSIS"), curl);
    expect(trytes(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed non boundary payload", () => {
    const curl = new Curl(81);
    const keyTrits = trits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        trits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNKSKHZEFURWWIOWHPSTVJXOBWGPPHZNK9AWKCLLYQXDGHKQV9RD9"), curl);
    expect(trytes(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("mask() and unmask() with multiple random trytes", () => {
    for (let i = 0; i < 100; i++) {
        // tslint:disable-next-line: insecure-random
        const val = generateHash();
        const valTrits = trits(val);
        const key = generateHash();
        const keyTrits = trits(key);
        const curl = new Curl(81);
        curl.absorb(keyTrits, 0, keyTrits.length);
        const masked = mask(valTrits, curl);

        curl.reset();
        curl.absorb(keyTrits, 0, keyTrits.length);
        const unmasked = unmask(masked, curl);
        expect(trytes(unmasked)).toBe(val);
    }
});

/**
 * Generate a random hash.
 * @param length The length of the hash.
 * @returns The hash.
 */
function generateHash(length: number = 81): string {
    let hash = "";

    const randomValues = new Uint32Array(crypto.randomBytes(length));

    for (let i = 0; i < length; i++) {
        hash += TRYTE_ALPHABET.charAt(randomValues[i] % 27);
    }

    return hash;
}
