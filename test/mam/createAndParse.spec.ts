import { asciiToTrytes, trytesToAscii } from "@iota/converter";
import { createChannel, createMessage } from "../../src/mam/channel";
import { parseMessage } from "../../src/mam/parser";

test("create and parse", () => {
    const channel = createChannel(
        "MR9ABFDBQGHRUHBIJCICAVDJVQKYKTVPHDFZHGON9JGYKVMSXKZBBTME9HPZRCLYSEFCZWMPEQKAOQKTZ", 2, "restricted", "MYKEY");

    for (let i = 0; i < 10; i++) {
        const msg = createMessage(channel, asciiToTrytes("Hello MAM World!"));

        const res = parseMessage(msg.payload, msg.root, "MYKEY");

        expect(trytesToAscii(res.message)).toBe("Hello MAM World!");
    }
});
