---
weight: 4
bookFlatSection: true
title: "NMI Payment"
---

# NMI Payment

## Overview

The `NMI CheckoutForm` component renders the components needed for the credit card payment. First, it renders a form to collect `firstName`, `lastName` and `zip`. Upon submitting this form, `initiatePayment(e)` uses these required inputs to initiate the credit card payment. It will launch a Collect.js lightbox for the customer to securely submit sensitive payment data.

---

## Dependencies

### Hooks

* [**useCheckout**](/docs/hooks/use-checkout/), providing the following states and functions:
    + `initiatePayment` (event): Delivers required form data to the payment processor.

---

## Example

This is a simplified code example. The two values `ticketPrice` and `ticketQuantity` were used in this example to continuously show the price.

{{% columns ratio="2:1" %}}

```jsx
import React, { useEffect } from 'react';
import { FormHeader, PaymentForm, PaymentInput, Price } from './Processors.styles';
import Typography from '@components/Typography';

// core functions
import { useCheckout } from 'blocklotto-sdk';
import { NMICheckout } from 'blocklotto-sdk';

export const NmiCheckoutForm = () => {
    const { ticketPrice, ticketQuantity, initiatePayment } = useCheckout();

    return (
        <PaymentForm onSubmit={initiatePayment} id="NMIC-form">
            <FormHeader>
                <Typography variant="header">PAY WITH CARD</Typography>
                <Price>${ticketPrice * ticketQuantity}</Price>
            </FormHeader>
            <PaymentInput
                type="text"
                name="firstname"
                placeholder="First Name"
                required
            />
            <PaymentInput
                type="text"
                name="lastname"
                placeholder="Last Name"
                required
            />
            <PaymentInput
                type="text"
                name="zip"
                placeholder="ZIP"
                required
            />
            <NMICheckout variant="lightbox"/>
        </PaymentForm>
    )
}

```

<--->

![Cart Example](/checkout/cart-example.png)

{{% /columns %}}