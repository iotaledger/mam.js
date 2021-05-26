// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable max-len */
import { Curl } from "@iota/iota.js";
import * as crypto from "crypto";
import { mask, maskHash, unmask } from "../../src/utils/mask";
import { TrytesHelper } from "../../src/utils/trytesHelper";

test("maskHash() returns correct hashed version of trits", () => {
    const res = maskHash(TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"));
    expect(TrytesHelper.fromTrits(res)).toBe("KDNHTRIHZXNFJUDUXIBSBOSXNVINMENXQPQTQOCBKCPVOZO99WCMRMMLDASTPYLNCMIR99W9AFLLNUHOR");
});

test("mask() returns same trits with no other trits absorbed", () => {
    const curl = new Curl(81);
    const res = mask(TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("mask() returns trits with key trits absorbed", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK");
});

test("mask() returns trits with key trits absorbed double payload", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNPAWZLBEOIKHOQSMNGOFCIRJPOVTVJGZCSHFBZMAD9PTYHPXVQJBL9XMJBVSIS");
});

test("mask() returns trits with key trits absorbed non boundary payload", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = mask(TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNKSKHZEFURWWIOWHPSTVJXOBWGPPHZNK9AWKCLLYQXDGHKQV9RD9");
});

test("unmask() returns same trits with no other trits absorbed", () => {
    const curl = new Curl(81);
    const res = unmask(
        TrytesHelper.toTrits("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        TrytesHelper.toTrits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed double payload", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        TrytesHelper.toTrits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNPAWZLBEOIKHOQSMNGOFCIRJPOVTVJGZCSHFBZMAD9PTYHPXVQJBL9XMJBVSIS"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("unmask() returns trits with key trits absorbed non boundary payload", () => {
    const curl = new Curl(81);
    const keyTrits = TrytesHelper.toTrits("A".repeat(81));
    curl.absorb(keyTrits, 0, keyTrits.length);
    const res = unmask(
        TrytesHelper.toTrits("CZO9HNDIEENBMHRRFESCS9OYZSBSFDCIIPLGDVXJFOKIEESNQCRRSZPKNAATFUJKQMMZDYIFNANIOUCMK9SX9AC9HHQUMLFA9LUVNKSKHZEFURWWIOWHPSTVJXOBWGPPHZNK9AWKCLLYQXDGHKQV9RD9"), curl);
    expect(TrytesHelper.fromTrits(res)).toBe("XAL9SMWRVVMYNSIIUVHXH9LBAHYHUWXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNPABCDEFGRVVMYNSIIUVHXXRRKOTWECQULPRVVHMJXIIHAKPMZZGUFQPJNNAWBRUMZMRLFXNP");
});

test("mask() and unmask() with multiple random trytes", () => {
    for (let i = 0; i < 100; i++) {
        // tslint:disable-next-line: insecure-random
        const val = generateHash();
        const valTrits = TrytesHelper.toTrits(val);
        const key = generateHash();
        const keyTrits = TrytesHelper.toTrits(key);
        const curl = new Curl(81);
        curl.absorb(keyTrits, 0, keyTrits.length);
        const masked = mask(valTrits, curl);

        curl.reset();
        curl.absorb(keyTrits, 0, keyTrits.length);
        const unmasked = unmask(masked, curl);
        expect(TrytesHelper.fromTrits(unmasked)).toBe(val);
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
        hash += TrytesHelper.ALPHABET.charAt(randomValues[i] % 27);
    }

    return hash;
}
