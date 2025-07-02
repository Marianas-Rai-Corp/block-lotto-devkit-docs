---
weight: 4
bookFlatSection: true
title: "useCheckout"
---

# `useCheckout`

## Overview

`useCheckout` is a custom React hook that manages the state and logic for the ticket purchasing flow. It contains all the functionality required for the checkout flow such as submitting emails, selecting the quantity of tickets to be bought, choosing the payment method, completing the KYC, processing payments and broadcasting the ticket transaction to the blockchain.

{{% hint warning %}}
**Important:**  
`useCheckout` must be used within a `CheckoutProvider`.
{{% /hint %}}

## Values & State Variables

| Name                         | Type                            | Description |
|------------------------------|--------------------------------|-------------|
| `hasAgreed`                  | `boolean`                      | Tracks whether the user accepted terms and conditions. |
| `hasEmail`                   | `boolean`                      | Indicates if the user has provided an email. |
| `showPaymentForm`            | `boolean`                      | Determines if the payment form should be displayed. |
| `ticketQtyError`             | `string \| boolean`            | Error message for ticket quantity input (`false` if no error). |
| `emailError`                 | `string \| boolean`            | Error message for email input (`false` if no error). |
| `countryError`               | `string \| boolean`            | Error message for country restrictions (`false` if no error). |
| `showKyc`                    | `boolean`                      | Indicates if the KYC verification step should be displayed. |
| `ticketQuantity`             | `number`                       | Number of tickets selected by the user. |
| `maxEtokenTicketQuantity`    | `number`                       | Maximum tickets allowed for purchase via eToken. |
| `ticketPrice`                | `number`                       | Price per ticket. |

---

## Functions

| Function                     | Parameters                     | Return Type        | Description |
|------------------------------|--------------------------------|--------------------|-------------|
| `handleAgree`                | `(e: Event) \| ()`                   | `Promise<void>`    | Handles user agreement to terms and conditions. |
| `handleKYCandCapture`                  | `(e: Event, onSuccess: func, onError: func)`                   | `void`    | Launches the KYC process and captures payment on success  |
| `handlePayment`         | `(paymentMethod: string, onSuccess: func, onError:func)`                           | `void`    | Handles selected ticket purchase options and initializes next steps (KYC, eToken payment or fiat payment) |
| `handleSubmitAccount`          | `(e: Event)`                   | `Promise<void>`    | Validates and submits user's email from a form. |
| `initiatePayment`        | `(e: Event)`             | `void`             | Initializes Payment with NMI payment form |
| `setTicketQuantity`          | `(quantity: number)`           | `void`             | Updates the number of tickets selected. |

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