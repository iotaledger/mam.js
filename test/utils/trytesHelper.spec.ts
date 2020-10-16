import { TrytesHelper } from "../../src/utils/trytesHelper";

describe("The trytestHelper", () => {
    test("objectToTrytes an undefined value will return empty string", () => {
        expect(TrytesHelper.objectToTrytes(undefined as never)).toEqual("");
    });

    test("objectToTrytes an null value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes(null)).toEqual("BDID9D9D");
    });

    test("objectToTrytes an false boolean value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes(false)).toEqual("UCPC9DGDTC");
    });

    test("objectToTrytes an true boolean value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes(true)).toEqual("HDFDIDTC");
    });

    test("objectToTrytes a 0 number value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes(0)).toEqual("UA");
    });

    test("objectToTrytes a string value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes("hello")).toEqual("GAWCTC9D9DCDGA");
    });

    test("objectToTrytes a non ASCII string value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes("Привет, мир"))
            .toEqual(
                // eslint-disable-next-line max-len
                "GAKCIDUAYAVAUCKCIDUAYAYAUAKCIDUAYAXABBKCIDUAYAXAWAKCIDUAYAXAZAKCIDUAYAYAWAQAEAKCIDUAYAXARCKCIDUAYAXABBKCIDUAYAYAUAGA"
            );
    });

    test("objectToTrytes an array will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes("[1,2,3]")).toEqual("GAJCVAQAWAQAXALCGA");
    });

    test("objectToTrytes an object value will return JSON encoded as trytes", () => {
        expect(TrytesHelper.objectToTrytes("{\"a\":123,\"b\":true}"))
            .toEqual("GAODKCGAPCKCGADBVAWAXAQAKCGAQCKCGADBHDFDIDTCQDGA");
    });

    test("objectFromTrytes an undefined value will throw", () => {
        expect(() => TrytesHelper.objectFromTrytes(undefined as never)).toThrow("convert strings");
    });

    test("objectFromTrytes an empty string value will throw", () => {
        expect(() => TrytesHelper.objectFromTrytes("")).toThrow("does not contain any data");
    });

    test("objectFromTrytes with all 9s trytes will throw", () => {
        expect(() => TrytesHelper.objectFromTrytes("99")).toThrow("does not contain any data");
    });

    test("objectFromTrytes an odd length will throw", () => {
        expect(() => TrytesHelper.objectFromTrytes("Z")).toThrow("even");
    });

    test("objectFromTrytes an null value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("BDID9D9D")).toEqual(null);
    });

    test("objectFromTrytes an false boolean value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("UCPC9DGDTC")).toEqual(false);
    });

    test("objectFromTrytes an true boolean value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("HDFDIDTC")).toEqual(true);
    });

    test("objectFromTrytes a 0 number value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("UA")).toEqual(0);
    });

    test("objectFromTrytes a string value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("GAWCTC9D9DCDGA")).toEqual("hello");
    });

    test("objectFromTrytes a non ASCII string will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes(
            // eslint-disable-next-line max-len
            "GAKCIDUAYAVAUCKCIDUAYAYAUAKCIDUAYAXABBKCIDUAYAXAWAKCIDUAYAXAZAKCIDUAYAYAWAQAEAKCIDUAYAXARCKCIDUAYAXABBKCIDUAYAYAUAGA"
        ))
            .toEqual("Привет, мир");
    });

    test("objectFromTrytes an array will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("GAJCVAQAWAQAXALCGA")).toEqual("[1,2,3]");
    });

    test("objectFromTrytes an object value will be returned when decoding trytes", () => {
        expect(TrytesHelper.objectFromTrytes("GAODKCGAPCKCGADBVAWAXAQAKCGAQCKCGADBHDFDIDTCQDGA"))
            .toEqual("{\"a\":123,\"b\":true}");
    });
});
