---
weight: 4
bookFlatSection: true
title: "Cart"
---

# Cart

## Overview

The `Cart` component renders the payment page in the checkout flow. This component allows the user to select the number of tickets to be purchased and the payment method. Currently the user can choose to pay via credit card or with credits won from previous tickets. In case of a credit card payment additional user data needs to be submitted. If an eToken payment is chosen, the payment can be faciliated through the `handlePayment` function directly. If however a credit card payment is chosen, first `handlePayment` needs to be called upon that choice, then upon `showPaymentForm` the first form (`firstName`, `lastName` and `zip`) can be shown. Upon submitting that form, `initiatePayment(e)` launches the credit card payment with Collect.js.

---

## Dependencies

### Hooks

* [**useCheckout**](/docs/hooks/use-checkout/), providing the following states and functions:
    + `showPaymentForm` (boolean): Indicates if the additionaly credit card payment form should be displayed.
    + `ticketPrice` (number): Contains the ticket price in USD.
    + `ticketQtyError` (boolean): Indicates, if `true`, that this ticket quantity can not be purchased.
    + `ticketQuantity` (number): Contains the number of tickets to be purchased.
    + `paymentProcessor` (string): Contains the selected payment processor.
    + `maxEtokenTicketQuantity` (number): Contains the maximum ticket quantity to be bought with existing credits.
    + `handlePayment` (function): Handles selected ticket purchase options and initializes next steps (KYC, eToken payment or fiat payment)
    + `setTicketQuantity` (function): Updates the number of tickets selected to be purchased.

---

## Example

This is a simplified code example. To see a full example using our prebuilt components, visit the Cart component in the [CLUX repository](https://github.com/Marianas-Rai-Corp/clux/blob/main/src/app/Checkout/Cart/index.js). In this example, the optional, prebuilt `useNotifications` hook was used to indicate the callback results to the user.

{{% columns ratio="2:1" %}}

```jsx
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// core functions
import { useCheckout, useNotifications } from 'blocklotto-sdk';

export default function Cart() {
    const history = useHistory();
    const notify = useNotifications();

    const {
        showPaymentForm,
        ticketPrice,
        ticketQtyError,
        ticketQuantity,
        maxEtokenTicketQuantity,
        handlePayment,
        setTicketQuantity,
        setShowPaymentForm,
    } = useCheckout();

    const [paymentMethod, setPaymentMethod] = useState("NMIC");


    const handleReturn = () => {
        const previousPath = "/select";
        history.push(previousPath);
    }

    const handlePaymentSuccess = () => {
        notify({ type: "success", message: "Successful purchase!"});
    }

    const handlePaymentError = () => {
        notify( { type: "error", message: "API Error. Try again"});
    }

    return (
        <>
            <button onClick={handleReturn}>Go back</button>
            <h1>Checkout</h1>

            <div>
                <div>{playerNumbers}</div>
                <div>{ticketQuantity}</div>}

                <form id="purchase-options-form">
                    <input
                        value={ticketQuantity}
                        onChange={(e) => 
                            setTicketQuantity(e.target.quantity.value)
                        }
                        name="quantity"
                    />
                    {ticketQtyError && <div>{ticketQtyError}</div>}

                    <div>
                        <div
                            onClick={() => setPaymentMethod("NMIC")}
                            $active={paymentProcessor === "NMIC"}
                        >
                            Credit Card
                        </div>
                        
                        {maxEtokenTicketQuantity >= ticketQuantity &&
                            <div
                                onClick={() => setPaymentMethod("etoken")}
                                $active={paymentProcessor === "etoken"}
                            >
                                Pay with Balance
                            </div>
                        }
                        <div>Total Price:<div>
                        <div>${ticketQuantity * ticketPrice}</div>
                    </div>
                </form>
            </div>

            <button 
                onClick={() => 
                    handlePayment(paymentMethod, handlePaymentSuccess, handlePaymentError)}
            >
                    Pay
            </button>
            </Footer>

            {showPaymentForm && (
                <div>
                    <NmiCheckoutForm />
                    <button
                        type="submit"
                        form={`${paymentMethod}-form`}
                    >
                        Pay
                    </button>
                </div>
            )}
        </>
    )
}

```

<--->

![Cart Example](/checkout/cart-example.png)

{{% /columns %}}