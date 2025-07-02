---
weight: 2
bookFlatSection: true
title: "Checkout"
bookCollapseSection: true
---

# Checkout

## Overview
The `Checkout` allows the user to purchase lottery tickets. It ensures that users have completed their account information (Email, KYC) before selecting their payment conditions and making the purchase. The component follows a sequential flow, so that new users have to agree to the terms of service, submit their email, provide their payment method, are approved by our Know Your Customer (KYC) process before their payment is captured and the ticket is broadcast. This flow is simplified for returning users.

---

## Dependencies

### Hooks
- [**useCheckout**](/docs/hooks/use-checkout/): A custom hook that provides the following states:
  - `hasAgreed` (boolean): Indicates whether the user has agreed to the Terms of Service and can now go to the email stage
  - `hasEmail` (boolean): Indicates if the user has provided a valid email address and can now head to the purchase options
  - `showKyc` (boolean): Determines if KYC verification is required to continue

{{% hint warning %}}
**Important:**  
The `hasAgreed`, `hasEmail`, and `showKyc` states from `useCheckout` are essential for the checkout process. Any modifications to this logic or flow will lead to a rejected submission.
{{% /hint %}}

---

## Component Logic
1. **Terms of Service (TOS) Check**
   - If the user has not agreed to the Terms of Service (`!hasAgreed`), the `Tos` component is rendered.

2. **Email Verification Check**
   - If the user has not provided an email (`!hasEmail`), the `Email` component is displayed.

3. **Purchase Options**
   - The `Cart` component is rendered for the user to choose the ticket quantity, payment method. If the user already has completed the KYC process, the payment will take place immediatly and the ticket will be broadcast. If however, the user has yet to complete the KYC, their payment data will only be validated and only be used in case of a successful KYC.

4. **KYC Verification Check**
   - If KYC is required (`showKyc` is `true`), the `Kyc` component is shown. After a successful KYC, the previuosly submitted payment data is used to capture the payment and complete the ticket issuance.  Only this one time after the KYC, the ticket issuance and capturing the payment might take between 20 and 40 seconds.



---

## Example

```jsx
import React from 'react';

// custom react components
import Tos from './components/Tos/Tos';
import Email from './components/Email/Email';
import Kyc from './components/Kyc/Kyc';
import Cart from './components/Cart/Cart';

// custom node module
import { useCheckout } from './core/checkout';

const Checkout = () => {
	const {
		hasAgreed,
		hasEmail,
		showKyc,
	} = useCheckout();

	// If user has not agreed to the terms
	if (!hasAgreed) return <Tos />;

	// If user has not entered an email
	if (!hasEmail) return <Email />;

	// If KYC is required
	if (showKyc) return <Kyc />;

	return <Cart />;
}

export default Checkout;
```