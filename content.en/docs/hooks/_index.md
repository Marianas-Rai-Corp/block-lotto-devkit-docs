---
weight: 4
bookFlatSection: true
title: "Hooks"
---

## Overview

The blocklotto-sdk provides lottery functionality in form of custom hooks that have to be used in their respective providers:

* `useApp`, `useNotifications` and all other hooks must be used within a `BlockLottoProvider`
* `useCheckout` must be used within a `CheckoutProvider`
* `useCashout` must be used within a `CashoutProvider`
