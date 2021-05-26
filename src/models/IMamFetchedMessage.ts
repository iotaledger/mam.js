// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Definition of fetch messages.
 */
export interface IMamFetchedMessage {
    /**
     * The root the message was fetched from.
     */
    root: string;
    /**
     * The message content fetched.
     */
    message: string;
    /**
     * The next root for the message.
     */
    nextRoot: string;
    /**
     * The tag of the transactions.
     */
    tag: string;
}
