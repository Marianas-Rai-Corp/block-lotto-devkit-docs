---
weight: 2
bookFlatSection: true
title: "Account"
---

# Account

## Overview

The `Account` component renders the account creation page in the checkout flow. This page should include an email form, a country selection and the confirmations regarding age, kyc, purchase terms, privacy policy and terms of service. It only needs to be shown once, prior to the user's first purchase and until an email is connected to the user's account. For that purpose, the [Checkout component](/docs/app/checkout) provides an example of how to use the `hasEmail` state.

---

## Dependencies

### Hooks

* [**useCheckout**](/docs/hooks/use-checkout/), providing the following states and function:
    + `emailError` (boolean): Indicates an error in the submitted email.
    + `countryError` (boolean): Indicates an error in the selected country.
    + `handleSubmitAccount` (function): Validates email and country and submits the email to the user's account.

### Constants

* [**checkoutCountryOptions**](/docs/countries), an array of countries accompanied with their permissions of purchasing or referring

---

## Example

This is a simplified code example. To see a full example using our prebuilt components, visit the Account component in the [CLUX repository](https://github.com/Marianas-Rai-Corp/clux/blob/main/src/app/Checkout/Account/index.js).


{{% columns ratio="2:1" %}}

```jsx
import React from 'react'
import { useHistory } from 'react-router-dom';

// core functions
import { useCheckout } from 'blocklotto-sdk';
import { checkoutCountryOptions } from 'blocklotto-sdk';

export default function Email() {
    const history = useHistory();

    const {
        emailError,
        countryError,
        handleSubmitAccount,
    } = useCheckout();

    const handleReturn = () => {
        const previousPath = "/select";
        history.push(previousPath);
    }

    return (
        <>
            <button onClick={handleReturn}>Go back</button>
            <h1>Create Account</h1>
            <form id='email-form' onSubmit={(e) => handleSubmitAccount(e)}>

                <div>
                    <div>Email</div>
                    <input name="email" required />
                    {emailError && <div>{emailError}</div>}
                </div>
                <div>
                    <div>Country</div>
                    <select name="country"  required 
                        options={checkoutCountryOptions}
                    />
                    {countryError && <div>{countryError}</div>}
                </div>

                <Checkbox required>Age</Checkbox>
                <Checkbox required>KYC</Checkbox>
                <Checkbox required>Terms</Checkbox>

            </form>
            <button form={"email-form"}>Continue</button>
        </>
    )
}
```

<--->

![Account Example](/checkout/account-example-v2.png)

{{% /columns %}}