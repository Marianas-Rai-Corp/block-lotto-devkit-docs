---
weight: 4
bookFlatSection: true
title: "useCashout"
---

# `useCashout`

## Overview

`useCashout` is a custom React hook that manages the state and logic for the credit cashout flow. It fetches available giftcard options, filters them, provides brand data and completes the flow by building and broadcasting the required blockchain transaction to obtain the link to the giftcard.

{{% hint warning %}}
**Important:**  
`useCashout` must be used within a `CashoutProvider`.
{{% /hint %}}

## Values & State Variables

| Name                   | Type     | Description                                                                  |
|------------------------|----------|------------------------------------------------------------------------------|
| `cashoutMethod`        | `string` | Method used for cashout                                                      |
| `minCashoutAmount`     | `number` | Minimum possible amount for cashout                                          |
| `maxCashoutAmount`     | `number` | Maximum possible amount for cashout (dependent on the user's balance)        |
| `tilloStage`           | `string` | Current stage of the cashout flow with tillo (`filter`, `brand`, `giftcard`) |
| `giftcardAmount`       | `number` | Amount set to request giftcard cashout                                       |
| `giftcardLink`         | `string` | Link to giftcard                                                             |
| `tilloCountryOptions`  | `array`  | List of countries available for Tillo cashout                                |
| `tilloCurrencyOptions` | `array`  | List of currencies available for tillo cashout                               |
| `tilloBrands`          | `array`  | All giftcard brands available for Tillo cashout                              |
| `tilloSelection`       | `array`  | Filtered giftcard brands based on country, currency and amount               |
| `brandData`            | `object` | Detailed data for a single selected brand                                    |

---

## Functions

| Function                 | Parameters                             | Return Type | Description                                                         |
|--------------------------|----------------------------------------|-------------|---------------------------------------------------------------------|
| `checkBalance`           | `()`                                   | `boolean`   | Checks if balance is sufficiently high for a cashout                |
| `filterTilloBrands`      | `(country: string, currency: string )` | `void`      | Filters Tillo brands and stores them in `tilloSelection`            |
| `handleTilloBrandChange` | `(e: Event)`                           | `void`      | Stores selected Tillo brand from `brand-form` in `brandData`        |
| `getGiftcardLink`            | ``                      | ``    |                            |
| `setGiftcardAmount`      | `(amount: number)`                     | `void`      | Stores currently selected amount for giftcard cashout               |
| `setGiftcardLink`         | `(brand: string, onError: func)`                                   | `string`    | Processes blockchain transaction, processes gitfcard and returns link to claim giftcard   |
| `setTilloStage`      | `(stage: string)`                           | `void`      | State can be used to move from one tillo stage to the next one ('filter', 'brand', 'giftcard')                      |
