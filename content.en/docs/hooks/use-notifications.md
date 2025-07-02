---
weight: 4
bookFlatSection: true
title: "useNotifications"
---

# `useNotifications`

## Overview

The SDK provides a convenient useNotifications hook, giving you access to a notify function anywhere inside your app.
This allows you to trigger notifications programmatically — for example, after custom events, validation errors, or other business logic.

{{% hint warning %}}
**Important:**  
`useNotifications` must be used within a `BlockLottoProvider`.
{{% /hint %}}

## Usage

```jsx
import React from "react";
import { useNotifications } from "blocklotto-sdk";

export default function ExampleComponent() {
  const notify = useNotifications();

  const handleClick = () => {
    // your custom logic here
    notify({
      type: "info",
      message: "This is a custom info message!"
    });
  };

  return <button onClick={handleClick}>Show Notification</button>;
}
```

## Options
| Property | Type                               | Description                          |
|----------|------------------------------------|--------------------------------------|
| `type`   | `"success" \| "error" \| "info"`   | The type of notification.            |
| `message`| `string`                           | The message to display.              |

{{% hint info %}}
**Tip:**  
You can add your own custom Notifications component to be rendered in the BlockLottoProvider. For more information [Click Here](/docs/custom-components/).
{{% /hint %}}