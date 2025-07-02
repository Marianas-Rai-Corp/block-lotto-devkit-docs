---
weight: 2
bookFlatSection: true
title: "Providers"
---

# Providers

The Block Lotto SDK offers a set of providers to wrap your application (or parts of it) with the necessary context for interacting with the block lotto lottery. Each provider exposes specific functionality tailored to different parts of the app experience.

## BlockLottoProvider

This is the root provider that initializes the SDK and makes core features like transaction handling, user state, and notifications available throughout your app.

{{% hint warning %}}
**Notice:**  
The Block lotto must be wrapped around the root of the app as shown in the example below. This is required for the app to function correctly with [useApp](/docs/hooks/use-app/).
{{% /hint %}}

Props:
- Loading – (optional) React component to display during loading states.
- Notification – (optional) React component for displaying SDK notifications.


{{% hint info %}}
**Tip:**  
For more information on the props passed please [Click Here](/docs/custom-components/).
{{% /hint %}}

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// core functions
import { BlockLottoProvider } from "blocklotto-sdk";

// styles
import { theme, GlobalStyles } from "./styles";

// react components
import App from "./app";
import Loading from "./components/Loading";
import Notification from "./components/Notification";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Router>
      <BlockLottoProvider Loading={Loading} Notification={Notification}>
        <App />
      </BlockLottoProvider>
    </Router>
  </ThemeProvider>
);
```

## CheckoutProvider

This provider wraps any part of your app that needs to interact with the lottery ticket purchase flow.
It supplies hooks and context to initiate and manage checkout operations.

- [Checkout Flow](/docs/app/checkout/)
- [useCheckout](/docs/hooks/use-checkout/)

```jsx
<CheckoutProvider>
    <Checkout />
</CheckoutProvider>
```

## CashoutProvider

This provider wraps parts of your app that handle claiming or cashing out winnings.
It exposes methods and context for initiating cashouts and tracking their status.

- [Cashout Flow](/docs/app/cashout/)
- [useCashout](/docs/hooks/use-cashout/)

```jsx
<CashoutProvider>
    <Cashout />
</CashoutProvider>
```