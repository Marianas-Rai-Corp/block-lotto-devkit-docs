---
weight: 1
bookFlatSection: true
title: "TOS"
---

# Terms of Service (TOS)

## Overview

The `Tos` (Terms of Service) component is responsible for rendering the Terms of Service page in the checkout flow. This page includes the Terms of Service content, a button to agree to the terms, and a footer section that display the users ticket numbers.

---

## Dependencies

### Hooks

* [**useCheckout**](/docs/hooks/use-checkout/): A custom hook that provides the following states:
  + `handleReturn` (function): Function that navigates the user back to the previous page.
  + `handleAgree` (function): Function triggered when the user agrees to the Terms of Service and continues the checkout flow.


---
## Example

{{% columns ratio="2:1" %}}

```jsx
import React from 'react'

// custom node module
import { useCheckout } from '../../core/checkout';

export default function Tos() {
    const {
        handleReturn,
        handleAgree,
    } = useCheckout();

    return (
        <>        
            <button onClick={handleReturn}>Go Back</button>
            <h1>Purchase Terms</h1>
            <div>
                <p>...</p>
            </div>
            <button onClick={handleAgree}>Agree and Continue</button>
        </div>
    )
}

```

<--->

![Terms of Service Example](/checkout/tos-example.png)

{{% /columns %}}
