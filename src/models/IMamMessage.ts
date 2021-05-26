// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Definition for MAM message.
 */
export interface IMamMessage {
    /**
     * The address for the message.
     */
    address: string;
    /**
     * The trytes payload for the message.
     */
    payload: string;
    /**
     * The root for the message.
     */
    root: string;
}
