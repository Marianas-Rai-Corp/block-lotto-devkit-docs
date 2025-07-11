---
weight: 4
bookFlatSection: true
title: "useApp"
---

# `useApp`

## Overview

`useApp` is a custom React hook that gives access to the user's account and wallet, provides tools to manage ticket creation, redemption and the game. It also provides affiliate information.

{{% hint warning %}}
**Important:**  
`useApp` must be used within a `BlockLottoProvider`.
{{% /hint %}}

## Values & State Variables

| Name                | Type      | Description                                                                          |
|---------------------|-----------|--------------------------------------------------------------------------------------|
| `user`              | `object`  | Contains account data (email, ip/geo permissions, kyc status)                        |
| `email`              | `string`  | Contains email address from `user` or local change (might differ between user calls)                        |
| `wallet`            | `object`  | Contains keys and addresses for the user's self-hosted eCash wallet                  |
| `unredeemedTickets` | `array`   | Contains all tickets yet to be redeemed                                              |
| `redeemableTickets` | `array`   | Contains all tickets available for redemption                                              |
| `balance`           | `number`  | Total amount of credits in the user's eCash address                                 |
| `playerNumbers`     | `array`   | Stores the four chosen block lotto numbers (integers) used to create the ticket                 |
| `ticketsToRedeem`   | `array`   | Stores one or multiple ticket(s) that can be redeemed in a row.                      |
| `gameTickets`       | `array`   | Stores one or multiple ticket(s) that are used for the game (revelation of winnings) |
| `isFirstTicket`       | `boolean`   | Allows for separate UI elements for new users |
| `ticketQuantity`    | `number`  | Number of tickets to be purchased                                           |
| `affiliate`   | `object`  | Contains the user's affiliate id and link to act as an affiliate                                       |
| `walletUpdateAvailable`   | `boolean`  | Indicates whether wallet can be updated                                      |

---

## Functions

| Function             | Parameters                           | Return Type                     | Description                                                                 |
|----------------------|--------------------------------------|---------------------------------|-----------------------------------------------------------------------------|
| `checkTicketRedeemability` | `(ticket: Ticket, polling: boolean, onResult: function)` | `onResult({redeemable: boolean, message: string, error: boolean})`                       | Checks whether an unredeemed ticket is redeemable                           |
| `redeemTicket`       | `(ticket: Ticket)`                   | `Promise<string> Promise<void>` | Redeems an unredeemed ticket and returns the hash of the redeem transaction |
| `changeEmail`     | `(email: string)`               | `void`                          |  Changes a user's email                              |
| `importWallet`     | `(mnemonic: string)`               | `void`                          | Imports a wallet from a 12 word seed phrase. Thus the app forgets the old wallet's seed phrase!                               |
| `validateMnemonic`     | `(mnemnoic: string)`               | `boolean`                          | Validates a seed phrase                               |
| `updateWallet`     | `()`               | `void`                          | Updates wallet if `walletUpdateAvailable` is `true`                               |
| `getAffiliateLink`     | `(options: object)`               | `string`                          | Returns an affiliate link from a url or a path                               |
| `getAffiliateTicketData` | `()` | `object` | Returns transactions (txs) and utxos for the pay-to-scripthash affiliate address | 
| `setTicketQuantity`  | `(quantity: number)`                 | `void`                          | sets the ticket quantity selected by the user                               |
| `setLoadingStatus`   | `(loadingStatus: string boolean)`    | `void`                          | Controls the global loading screen                                          |
| `setPlayerNumbers`   | `(playerNumbers: array)`             | `void`                          | Updates the selected player numbers                                         |
| `setTicketsToRedeem` | `(ticketsToRedeem: array)`           | `void`                          | Updates the tickets to be redeemed. Should be used on home page to remove outstanding tickets (set to `[]`)                                         |
| `setGameTickets`     | `(gameTickets: array)`               | `void`                          | Updates the tickets to be used by a game. If used, it should be used on home page to remove outstanding tickets (set to `[]`)                                    |

---
