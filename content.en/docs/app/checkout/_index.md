---
weight: 1
bookFlatSection: true
title: "Checkout"
bookCollapseSection: true
---

# Checkout

## Overview
The `Checkout` page is a key part of the checkout process in the application. It ensures that the user meets certain conditions before proceeding with their purchase. The component follows a sequential flow, enforcing agreement to terms, email submission, and Know Your Customer (KYC) verification before allowing the user to make their purchase.

---

## Dependencies

### Hooks
- [**useCheckout**](/docs/hooks/use-checkout/): A custom hook that provides the following states:
  - `hasAgreed` (boolean): Indicates whether the user has agreed to the Terms of Service.
  - `hasEmail` (boolean): Checks if the user has provided an email address.
  - `showKyc` (boolean): Determines if KYC verification is required.

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

3. **KYC Verification Check**
   - If KYC is required (`showKyc` is `true`), the `Kyc` component is shown.

4. **Final Checkout**
   - Once all conditions are met, the `Cart` component is rendered to complete the checkout process.

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