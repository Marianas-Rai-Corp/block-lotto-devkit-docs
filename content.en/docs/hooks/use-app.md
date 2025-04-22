---
weight: 4
bookFlatSection: true
title: "useApp"
---

# `useApp`

## Overview

`useCheckout` is a custom React hook that manages the state and logic for the ticket purchasing flow. It handles user interactions such as selecting ticket quantities, submitting emails, choosing payment methods, and processing payments.

{{% hint warning %}}
**Important:**  
`useCheckout` must be used within a `CheckoutProvider` otherwise an error will be thrown.
{{% /hint %}}

## Values & State Variables

| Name                | Type      | Description                                                                          |
|---------------------|-----------|--------------------------------------------------------------------------------------|
| `protection`        | `boolean` | Development password is required when this is set to `true`                          |
| `user`              | `object`  | Contains account data (email, ip/geo permissions, kyc status)                        |
| `wallet`            | `object`  | Contains keys and addresses for the user's self-hosted eCash wallet                  |
| `unredeemedTickets` | `array`   | Contains all tickets yet to be redeemed                                              |
| `balance`           | `number`  | Total amount of credits for the user's eCash address                                 |
| `playerNumbers`     | `array`   | Stores the four chosen block lotto numbers used to create the ticket                 |
| `ticketsToRedeem`   | `array`   | Stores one or multiple ticket(s) that can be redeemed in a row.                      |
| `gameTickets`       | `array`   | Stores one or multiple ticket(s) that are used for the game (revelation of winnings) |
| `ticketQuantity`    | `number`  | Selected number of tickets to be purchased                                           |
| `affiliateId`       | `string`  | Id of the affiliate that referred the user to block lotto                            |
| `userAffiliateId`   | `string`  | The user's affiliate id to act as an affiliate                                       |

---

## Functions

| Function             | Parameters                           | Return Type                     | Description                                                                 |
|----------------------|--------------------------------------|---------------------------------|-----------------------------------------------------------------------------|
| `checkRedeemability` | `(ticket: Ticket, polling: boolean)` | `boolean`                       | Checks whether an unredeemed ticket is redeemable                           |
| `redeemTicket`       | `(ticket: Ticket)`                   | `Promise<string> Promise<void>` | Redeems an unredeemed ticket and returns the hash of the redeem transaction |
| `setTicketQuantity`  | `(quantity: number)`                 | `void`                          | sets the ticket quantity selected by the user                               |
| `setProtection`      | `(isProtected: boolean)`             | `void`                          | Activates/deactivates password protection in development mode               |
| `setLoadingStatus`   | `(loadingStatus: string boolean)`    | `void`                          | Controls the global loading screen                                          |
| `setPlayerNumbers`   | `(playerNumbers: array)`             | `void`                          | Updates the selected player numbers                                         |
| `setTicketsToRedeem` | `(ticketsToRedeem: array)`           | `void`                          | Updates the tickets to be redeemed.                                         |
| `setGameTickets`     | `(gameTickets: array)`               | `void`                          | Updates the tickets to be used by a game                                    |

---

## Usage 

```jsx
import { useCheckout } from './core/checkout';

const CheckoutPage = () => {
  const {
    ticketQuantity,
    showPaymentForm,
    handleConfirmation,
    setTicketQuantity,
  } = useCheckout();

  return (
    <div>
      <h2>Checkout</h2>
      <p>Selected Tickets: {ticketQuantity}</p>

      <button onClick={() => setTicketQuantity(ticketQuantity + 1)}>+</button>
      <button onClick={() => setTicketQuantity(ticketQuantity - 1)}>-</button>

      <button onClick={handleConfirmation}>
        Agree to Terms
      </button>

      {showPaymentForm && <p>Payment Form Shown</p>}
    </div>
  );
};
```