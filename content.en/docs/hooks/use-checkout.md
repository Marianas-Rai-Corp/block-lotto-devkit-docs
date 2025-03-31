---
weight: 4
bookFlatSection: true
title: "useCheckout"
---

# `useCheckout`

## Overview

`useCheckout` is a custom React hook that manages the state and logic for the ticket purchasing flow. It handles user interactions such as selecting ticket quantities, submitting emails, choosing payment methods, and processing payments.

{{% hint warning %}}
**Important:**  
`useCheckout` must be used within a `CheckoutProvider` otherwise an error will be thrown.
{{% /hint %}}

## Values & State Variables

| Name                         | Type                            | Description |
|------------------------------|--------------------------------|-------------|
| `playerNumbers`              | `array \| null`                | List of player numbers associated with the purchase. |
| `hasAgreed`                  | `boolean`                      | Tracks whether the user accepted terms and conditions. |
| `hasEmail`                   | `boolean`                      | Indicates if the user has provided and verified an email. |
| `showPaymentForm`            | `boolean`                      | Determines if the payment form should be displayed. |
| `ticketQtyError`             | `string \| boolean`            | Error message for ticket quantity input (`false` if no error). |
| `emailError`                 | `string \| boolean`            | Error message for email input (`false` if no error). |
| `countryError`               | `string \| boolean`            | Error message for country restrictions (`false` if no error). |
| `showKyc`                    | `boolean`                      | Indicates if the KYC verification step should be displayed. |
| `ticketQuantity`             | `number`                       | Number of tickets selected by the user. |
| `paymentProcessor`           | `string`                       | Selected payment method (`"NMIC"`, `"etoken"`, `"fiat"`). |
| `maxEtokenTicketQuantity`    | `number`                       | Maximum tickets allowed for purchase via eToken. |
| `ticketPrice`                | `number`                       | Price per ticket in the selected currency. |

---

## Functions

| Function                     | Parameters                     | Return Type        | Description |
|------------------------------|--------------------------------|--------------------|-------------|
| `handleReturn`               | `()`                           | `void`             | Redirects user back to the ticket selection screen. |
| `handleAgree`                | `(e: Event)`                   | `Promise<void>`    | Handles user agreement to terms and conditions. |
| `handleKYC`                  | `(e: Event)`                   | `Promise<void>`    | Initiates the KYC verification process. |
| `handleConfirmation`         | `()`                           | `Promise<void>`    | Validates ticket quantity and starts payment processing. |
| `handleSubmitEmail`          | `(e: Event)`                   | `Promise<void>`    | Validates and submits user's email. |
| `handlePaymentMethod`        | `(method: string)`             | `void`             | Sets the selected payment method (`"etoken"` or `"fiat"`). |
| `setTicketQuantity`          | `(quantity: number)`           | `void`             | Updates the number of tickets selected. |
| `setPaymentMetadata`         | `(metadata: object)`           | `void`             | Stores additional payment-related metadata. |
| `setShowPaymentForm`         | `(show: boolean)`              | `void`             | Controls the visibility of the payment form. |


## Usage 

```jsx
import { useCheckout } from './core/checkout';

const CheckoutPage = () => {
  const {
    ticketQuantity,
    hasAgreed,
    showPaymentForm,
    handleAgree,
    handleSubmitEmail,
    setTicketQuantity,
  } = useCheckout();

  return (
    <div>
      <h2>Checkout</h2>
      <p>Selected Tickets: {ticketQuantity}</p>

      <button onClick={() => setTicketQuantity(ticketQuantity + 1)}>+</button>
      <button onClick={() => setTicketQuantity(ticketQuantity - 1)}>-</button>

      <button onClick={handleAgree} disabled={!hasAgreed}>
        Agree to Terms
      </button>

      {showPaymentForm && <p>Payment Form Shown</p>}
    </div>
  );
};
```