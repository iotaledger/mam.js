// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { pascalDecode, pascalEncode } from "../../src/utils/pascal";

test("pascalEncode() with 0 returns fixed array", () => {
    const res = pascalEncode(0);
    expect(Array.from(res)).toEqual([1, 0, 0, -1]);
});

test("pascalEncode() with 1234 returns known result", () => {
    const res = pascalEncode(1234);
    expect(Array.from(res)).toEqual([1, 0, -1, 1, 0, -1, -1, 1, 0, 0, 0, 0]);
});

test("pascalDecode() with fixed array returns 0", () => {
    const trits = new Int8Array([1, 0, 0, -1]);
    const res = pascalDecode(trits);
    expect(res.end).toBe(4);
    expect(res.value).toBe(0);
});

test("pascalDecode() with 1234 array returns known result", () => {
    const trits = new Int8Array([1, 0, -1, 1, 0, -1, -1, 1, 0, 0, 0, 0]);
    const res = pascalDecode(trits);
    expect(res.end).toBe(12);
    expect(res.value).toBe(1234);
});

test("pascalEncode() and pascalDecode() with multiple random numbers", () => {
    for (let i = 0; i < 1000; i++) {
        // tslint:disable-next-line: insecure-random
        const val = Math.floor(Math.random() * 1000);
        const encoded = pascalEncode(val);
        const decoded = pascalDecode(encoded);
        expect(decoded.end).toBe(encoded.length);
        expect(decoded.value).toBe(val);
    }
});
