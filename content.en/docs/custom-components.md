---
weight: 7
bookFlatSection: true
title: "Custom Components"
---

## Custom Components

The BlockLottoProvider accepts two optional props that allow you to override the default UI components used for loading states and notifications. This gives you full control over the look and feel of your application while integrating with the Block Lotto SDK. If these components are not provided the SDK will render its built-in defaults, which are simple, lightweight components designed to be unobtrusive.

## Props

| Prop                | Type      | Description                                     | Default                                     |
|---------------------|-----------|-------------------------------------------------|-------------------------------------------------|
| `Loading` | `ReactNode` | Custom component shown during loading states. |  `Default spinner`|
| `Notification` | `ReactNode` | Custom component used for SDK notifications/messages                        | `Default notification`|

## Usage Example

```jsx
import Loading from "./components/Loading";
import Notification from "./components/Notification";

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

## Writing a Custom Loading Component

Your Loading component can be any React element. It will be displayed whenever the SDK performs operations that take time, such as fetching lottery state, submitting transactions, or waiting for confirmations. It must accept children as a prop.

```jsx
import React from 'react'
import { Backdrop, Message, ModalContent, Spinner } from './Loading.styles'

const Loading = ({ children }) => {

    return (
        <Backdrop>
            <ModalContent>
                <Spinner />
                <Message>{children}</Message>
            </ModalContent>
        </Backdrop>
    )
}

export default Loading;
```

## Writing a Custom Notification Component

The Notification component is used to display messages triggered by SDK events. This includes success confirmations, errors, or informative notices.

```ts
type NotificationProps = {
  type: 'success' | 'error' | 'info';
  message: string;
};
```

```jsx
import React from "react";
import { StyledNotification } from "./Notification.styles";
import { ErrorIcon, InfoIcon, SuccessIcon } from "../Icons";

export default function Notification({ type, message }) {
  return (
    <StyledNotification type={type}>
      {type === "success" && <SuccessIcon />}
      {type === "error" && <ErrorIcon />}
      {type === "info" && <InfoIcon />}
      <div>{message}</div>
    </StyledNotification>
  );
}
```