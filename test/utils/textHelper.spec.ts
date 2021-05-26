// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { TextHelper } from "../../src/utils/textHelper";

describe("The textHelper", () => {
    test("encodeNonASCII an undefined value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(undefined as never)).toEqual(undefined);
    });

    test("encodeNonASCII an null value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(null as never)).toEqual(undefined);
    });

    test("encodeNonASCII a false value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(false as never)).toEqual(undefined);
    });

    test("encodeNonASCII a true value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(true as never)).toEqual(undefined);
    });

    test("encodeNonASCII a 0 value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(0 as never)).toEqual(undefined);
    });

    test("encodeNonASCII a 1 value will return undefined", () => {
        expect(TextHelper.encodeNonASCII(1 as never)).toEqual(undefined);
    });

    test("encodeNonASCII an object value will return undefined", () => {
        expect(TextHelper.encodeNonASCII({ a: 123 } as never)).toEqual(undefined);
    });

    test("encodeNonASCII an array value will return undefined", () => {
        expect(TextHelper.encodeNonASCII([1, 2, 3] as never)).toEqual(undefined);
    });

    test("encodeNonASCII a pure ASCII string will the same encoding", () => {
        expect(TextHelper.encodeNonASCII("hello")).toEqual("hello");
    });

    test("encodeNonASCII a non ASCII string will return the encoded version", () => {
        expect(TextHelper.encodeNonASCII("Привет, мир"))
            .toEqual("\\u041f\\u0440\\u0438\\u0432\\u0435\\u0442, \\u043c\\u0438\\u0440");
    });

    test("decodeNonASCII an undefined value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(undefined as never)).toEqual(undefined);
    });

    test("decodeNonASCII an null value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(null as never)).toEqual(undefined);
    });

    test("decodeNonASCII a false value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(false as never)).toEqual(undefined);
    });

    test("decodeNonASCII a true value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(true as never)).toEqual(undefined);
    });

    test("decodeNonASCII a 0 value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(0 as never)).toEqual(undefined);
    });

    test("decodeNonASCII a 1 value will return undefined", () => {
        expect(TextHelper.decodeNonASCII(1 as never)).toEqual(undefined);
    });

    test("decodeNonASCII an object value will return undefined", () => {
        expect(TextHelper.decodeNonASCII({ a: 123 } as never)).toEqual(undefined);
    });

    test("decodeNonASCII an array value will return undefined", () => {
        expect(TextHelper.decodeNonASCII([1, 2, 3] as never)).toEqual(undefined);
    });

    test("decodeNonASCII a pure ASCII string will the same encoding", () => {
        expect(TextHelper.decodeNonASCII("hello")).toEqual("hello");
    });

    test("decodeNonASCII a non ASCII string will return the decoded version", () => {
        expect(TextHelper.decodeNonASCII("\\u041f\\u0440\\u0438\\u0432\\u0435\\u0442, \\u043c\\u0438\\u0440"))
            .toEqual("Привет, мир");
    });
});
