---
weight: 3
bookFlatSection: true
title: "KYC"
---

# Know Your Customer (KYC)

## Overview

The `KYC` component launches the external KYC process by [HyperVerge](https://hyperverge.co) and handles its result. Every user must be approved by the KYC process before a ticket purchase is possible. However, the user's payment data is already collected and validated in the [`Cart` module](/docs/app/checkout/cart) and only upon the KYC approval the user's payment is captured and the ticket is issued.

---

## Dependencies

### Hooks

*[**useCheckout**](/docs/hooks/use-checkout/), providing the following function:
    * `handleKYCandCapture` (function): Launches the KYC and handles its result. On approval the payment is captured and the ticket is issued. The custom callback functions `onSuccess` and `onError` are called respectively.

---

## Example

This is a simplified code example. To see a full example using our prebuilt components, visit the Kyc component in the [CLUX repository](https://github.com/Marianas-Rai-Corp/clux/blob/main/src/app/Checkout/Kyc/index.js). In this example, the prebuilt `useNotifications` hook is used to signify the KYC result to the user. 

{{% columns ratio="2:1" %}}

```jsx
import React from 'react'

// core functions
import { useCheckout, useNotifications } from 'blocklotto-sdk';

export default function Kyc() {
    const { handleKYCandCapture } = useCheckout();
    const notify = useNotifications();

    const handleSuccess = async (message) => {
        notify({ type: "success", message: "KYC successful"});
    }

    const handleError = (message) => {
        notify({ type: "error", message });
        history.push("/");
    }
    return (
        <div>...<div>
        <button onClick={(e) => handleKYCandCapture(e, handleSuccess, handleError)}>Continue</Button>
    )
}

```

<--->

![KYC Example](/checkout/kyc-example-v2.png)

{{% /columns %}}