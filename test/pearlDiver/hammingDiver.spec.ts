import { trits, trytes } from "@iota/converter";
import { HammingDiver } from "../../src/pearlDiver/hammingDiver";

test("search() returns correct nonce for trits with security level 1", () => {
    const diver = new HammingDiver();
    const res = diver.search(
        trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"),
        1,
        27,
        0);
    expect(trytes(res)).toBe("H9L9SMXRV");
});

test("search() returns correct nonce for trits with security level 2", () => {
    const diver = new HammingDiver();
    const res = diver.search(
        trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"),
        2,
        27,
        0);
    expect(trytes(res)).toBe("C9L9SMXRV");
});

test("search() returns correct nonce for trits with security level 3", () => {
    const diver = new HammingDiver();
    const res = diver.search(
        trits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"),
        3,
        27,
        0);
    expect(trytes(res)).toBe("DZL9SMYRV");
});
