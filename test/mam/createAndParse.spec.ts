// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { createChannel, createMessage } from "../../src/mam/channel";
import { parseMessage } from "../../src/mam/parser";
import { TrytesHelper } from "../../src/utils/trytesHelper";

test("create and parse", () => {
    const channel = createChannel(
        "MR9ABFDBQGHRUHBIJCICAVDJVQKYKTVPHDFZHGON9JGYKVMSXKZBBTME9HPZRCLYSEFCZWMPEQKAOQKTZ", 2, "restricted", "MYKEY");

    for (let i = 0; i < 10; i++) {
        const msg = createMessage(channel, TrytesHelper.fromAscii("Hello MAM World!"));

        const res = parseMessage(msg.payload, msg.root, "MYKEY");

        expect(TrytesHelper.toAscii(res.message)).toBe("Hello MAM World!");
    }
});
