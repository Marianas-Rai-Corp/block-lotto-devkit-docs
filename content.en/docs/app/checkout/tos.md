---
weight: 1
bookFlatSection: true
title: "TOS"
---

# Terms of Service (TOS)

## Overview

The `Tos` component renders the Terms of Service page in the checkout flow. This page should include the Terms of Service content and a button to agree to the terms, and the user's selected ticket numbers. The terms of service need to be agreed to prior to every new purchase.

---

## Dependencies

### Hooks

* [**useCheckout**](/docs/hooks/use-checkout/), providing the following function:
    + `handleAgree` (function): Function triggered when the user agrees to the Terms of Service and continues the checkout flow.

* [**useApp**](/docs/hooks/use-app/), providing the following state:
    + `playerNumbers` (array): Contains the numbers, that the user has chosen in the beginning as integers.  

---
## Example

This is a simplified code example. To see a full example using our prebuilt components, visit the TOS component in the [CLUX repository](https://github.com/Marianas-Rai-Corp/clux/blob/main/src/app/Checkout/Tos/index.js)

{{% columns ratio="2:1" %}}

```jsx
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useCheckout, useApp } from 'blocklotto-sdk';

export default function Tos() {
    const history = useHistory();
    const { playerNumbers } = useApp();
    const { handleAgree } = useCheckout();

    const handleReturn = () => {
        const previousPath = "/select";
        history.push(previousPath);
    }

    return (
        <>
            <button onClick={handleReturn}>Go back</button>
            <h1>Purchase Terms</h1>
            <div>
                <p>...</p>
            </div>
            <div>{playerNumbers}</div>
            <button onClick={handleAgree}>Agree and Continue</button>
        </>
    )
}

```

<--->

![Terms of Service Example](/checkout/tos-example.png)

{{% /columns %}}
