---
weight: 3
bookFlatSection: true
title: "Cashout"
bookCollapseSection: true
---

# Cashout

## Overview

The `Cashout` page allows the user to obtain a cashout for a specified amount of credits. Currently, the only available option for cashout is to receive a digital Tillo giftcard. This is the Tillo cashout flow in a very broad manner:

1. get all available giftcard brands
2. filter brands by country, currency and amount
3. get a giftcard link for a specified amount and brand and let the user access it

The required functionality comes from the [**useCashout**](/docs/hooks/use-cashout/) hook.

---

## Cashout Stages

1. **Filtering Brands**
   - The user selects amount, country and currency.
   - The final `giftcardAmount` should be set using `setGiftcardAmount`.
   - Once submitted, `filterTilloBrands` can be used to populate `tilloSelection` with all the brands fulfilling the user's criteria.
   - To move on to the next `tilloStage` called "brands" using `setTilloStage("brands")`.

2. **Brand Selection**
   - From `tilloSelection` the user can look through the available brands.
   - Using `handleTilloBrandChange` the currently selected brand is available in `brandData`.
   - Once a brand has been selected, `getGiftcardLink(brand)` can be called to obtain the giftcard link. If successful, the link will also be available in `giftcardLink`.
   - The wallet will now update in the background. The credit balance will decrease by the `giftcardAmount`.
   - Use `setTilloStage("giftcard")` to proceed.

3. **Giftcard Link**
   - Show the user the obtained `giftcardLink`.
   - Warn the user to claim their giftcard before moving on to the next page. The giftcard will not be stored for them.

---

## Examples

### Cashout Example

```jsx
// node modules
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

// core functions
import { useCashout } from '@core/context/Cashout';
import { useNotifications } from '@core/context/Notifications';

// react components
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Button from '@components/Button';
import Filter from './components/Filter';
import Brand from './components/Brand';
import GiftCard from './components/GiftCard';
import FlexGrow from './components/FlexGrow';


const Cashout = () => {
    const history = useHistory();
    const notify = useNotifications();
    const { 
        checkBalance, 
        tilloStage, 
        giftcardLink, 
        setGiftcardLink 
    } = useCashout();
    const [modal, modalHolder] = Modal.useModal();

    useEffect(() => {
        const isSufficientBalance = checkBalance();
        if (!isSufficientBalance) {
            notify({type: "error", message: "Insufficient Token Balance"});
            history.push("/select");
        };
    }, [])

    // handlers
    const handleReturn = () => {
        if (giftcardLink)
            return handleGiftcardConfirmation()
        else
            history.push("/select");
    }

    const handleBackToHome = () => {
        setGiftcardLink(false);
        return history.push("/select");
    }

    const handleGiftcardConfirmation = (e) => {
        if (e)
            e.preventDefault();
        // add modal asking for confirmation
        const modalConfig = {
            title: "Confirm",
            content: "Have you claimed your giftcard?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => handleBackToHome(),
        };
        modal.confirm(modalConfig);
    }

    return (
        <>
            {modalHolder}
            <FlexGrow>
                <Header />
                <Navigation
                    handleOnClick={handleReturn}
                    title={"Cashout"}
                />
                {tilloStage === "filter" && 
                    <Filter />}

                {tilloStage === "brand" && <Brand />}

                {tilloStage === "giftcard" && <GiftCard />}

                <Footer variant="empty">
                    <Button type="submit" form={`${tilloStage}-form`}>
                        {tilloStage === "filter" &&
                            <>Go to Brands</>
                        }
                        {tilloStage === "brand" &&
                            <>Get Giftcard</>
                        }
                        {tilloStage === "giftcard" &&
                            <>Back to Home</>
                        }
                    </Button>
                </Footer>
            </FlexGrow>
        </>
    )
}

export default Cashout;

```

### Filter Example

```jsx
import React from 'react';
import Typography from '@components/Typography';
import { QuantityInput } from '@components/Inputs';
import Select from 'react-select';
import 'react-range-slider-input/dist/style.css';
import Form from './Form';

// core functions
import { useCashout } from '@core/context/Cashout';

export default function Filter() {
    const { 
        cashoutMethod,
        maxCashoutAmount,  
        tilloCountryOptions, 
        tilloCurrencyOptions,
        giftcardAmount,
        setGiftcardAmount,
        filterTilloBrands,
        tilloStage,
        setTilloStage
    } = useCashout();

    const handleSubmitFilters = async (e) => {
        e.preventDefault();

        if (cashoutMethod === "tillo") {
            const country = e.target.country.value;
            const currency = e.target.currency.value;

            const filteredBrands = filterTilloBrands(country, currency);
            if (filteredBrands.length > 0) {
                setTilloStage("brand");
            }
        }
    }

    return (
        <Form id={`${tilloStage}-form`} onSubmit={handleSubmitFilters}>
            <Typography variant="header" size="large">How many Tokens?</Typography>
            <QuantityInput
                quantity={giftcardAmount}
                passQuantity={setGiftcardAmount}
                step={10}
                max={maxCashoutAmount}
            />
            <Select
                options={tilloCurrencyOptions}
                label="Currency"
                name="currency"
                required
            />
            <Select
                options={tilloCountryOptions}
                label="Country"
                name="country"
                required
            />
        </Form>
    )
}
```

### Brands

```jsx
import React from 'react';
import Select from 'react-select';
import 'react-range-slider-input/dist/style.css';
import Form from './Form';

// core functions
import { useCashout } from '@core/context/Cashout';

export default function Brand() {
    const { 
        tilloStage,
        setTilloStage,
        tilloSelection, 
        brandData, 
        handleTilloBrandChange,
        getGiftcardLink,
    } = useCashout();

    const handleBrandSubmit = async (e) => {
        e.preventDefault();

        const brand = e.target.brand.value;

        const link = await getGiftcardLink(brand);

        if (link) {
            setTilloStage("giftcard");
        }
    }

    return (
        <Form id={`${tilloStage}-form`}
            onSubmit={handleBrandSubmit}
        >
            <Select
                options={tilloSelection}
                onChange={handleTilloBrandChange}
                name="brand"
            />

            {brandData && (
                <p>
                    {brandData.description}
                </p>
            )}
        </Form>
    )
}
```

### Giftcard Link

```jsx
import React from 'react';
import Form from './Form';
import Link from './Link';

// core functions
import { useCashout } from '@core/context/Cashout';

export default function GiftCard() {
    const {
        giftcardLink,
        tilloStage,
    } = useCashout();

    const handleGiftcardConfirmation = (e) => {
        if (e)
            e.preventDefault();
        // add modal asking for confirmation
        const modalConfig = {
            title: "Confirm",
            content: "Have you claimed your giftcard?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => handleBackToHome(),
        };
        modal.confirm(modalConfig);
    }

    return (
        <Form id={`${tilloStage}-form`} onSubmit={handleGiftcardConfirmation}>
            <Link href={giftcardLink} target="_blank">
                "Claim your Giftcard"
            </Link>
        </Form>
    )
}
```
