import { channelRoot, createChannel, createMessage } from "../../src/mam/channel";
import { parseMessage } from "../../src/mam/parser";

test("parseMessage() can decode public message", () => {
    const channel = createChannel("A".repeat(81), 2, "public");
    const root = channelRoot(channel);
    const msg = createMessage(channel, "FOO");

    const res = parseMessage(msg.payload, root);
    expect(res.message).toBe("FOO");
    expect(res.nextRoot).toBe("ZRBYGMGPEUBFOUMKULUBNCSQQNRH9JOMV9QJEZTAA99HCXLDHFTFOR9UYRKXSEYDRWPSDZQHJIFODHXRS");
});

test("parseMessage() can decode private message", () => {
    const channel = createChannel("A".repeat(81), 2, "private");
    const root = channelRoot(channel);
    const msg = createMessage(channel, "FOO");

    const res = parseMessage(msg.payload, root);
    expect(res.message).toBe("FOO");
    expect(res.nextRoot).toBe("ZRBYGMGPEUBFOUMKULUBNCSQQNRH9JOMV9QJEZTAA99HCXLDHFTFOR9UYRKXSEYDRWPSDZQHJIFODHXRS");
});

test("parseMessage() can fail is no sideKey supplied", () => {
    const channel = createChannel("A".repeat(81), 2, "restricted", "S".repeat(81));
    const root = channelRoot(channel);
    const msg = createMessage(channel, "FOO");

    expect(() => parseMessage(msg.payload, root)).toThrow("Message Hash");
});

test("parseMessage() can decode restricted message", () => {
    const channel = createChannel("A".repeat(81), 2, "restricted", "S".repeat(81));
    const root = channelRoot(channel);
    const msg = createMessage(channel, "FOO");

    const res = parseMessage(msg.payload, root, "S".repeat(81));
    expect(res.message).toBe("FOO");
    expect(res.nextRoot).toBe("ZRBYGMGPEUBFOUMKULUBNCSQQNRH9JOMV9QJEZTAA99HCXLDHFTFOR9UYRKXSEYDRWPSDZQHJIFODHXRS");
});

