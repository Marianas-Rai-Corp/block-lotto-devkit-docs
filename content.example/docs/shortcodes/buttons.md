# Buttons

Buttons are styled links that can lead to local page or external link.

## Example

### Basic Usage

Buttons are interactive elements that can be customized with various attributes such as size, variant, and color to suit different design needs. Below are examples demonstrating their usage.

```tpl
{{</* button relref="/" [class="..."] */>}}Click Here{{</* /button */>}}
{{</* button href="https://github.com/ryansallen98/clux-documentation/" */>}}Click Here{{</* /button */>}}
```

{{<button relref="/">}}Click Here{{</button>}}
{{<button href="https://github.com/ryansallen98/clux-documentation/">}}Click Here{{</button>}}

### Size

| Size  | Description                          |
|-------|--------------------------------------|
| `xs`  | Extra small button size.            |
| `sm`  | Small button size.                  |
| `md`  | Medium button size (default).       |
| `lg`  | Large button size.                  |
| `xl`  | Extra large button size.            |

```tpl
{{</* button [size="..."] */>}}Click Here{{</* /button */>}}
{{</* button size="xl" */>}}Click Here{{</* /button */>}}
```
{{<button size="xs">}}Click Here{{</button>}}
{{<button size="sm">}}Click Here{{</button>}}
{{<button>}}Click Here{{</button>}}
{{<button size="lg">}}Click Here{{</button>}}
{{<button size="xl">}}Click Here{{</button>}}

### Variants

| Variant   | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `default` | Standard button style.                                                     |
| `outlined`| Button with an outlined border and no background.                          |
| `dash`    | Button with a dashed border.                                               |
| `soft`    | Button with a soft, subtle background.                                     |
| `ghost`   | Transparent button with minimal styling.                                   |
| `link`    | Button styled as a text link, without a background or border.              |

```tpl
{{</* button [variant="..."] */>}}Click Here{{</* /button */>}}
{{</* button variant="outlined" */>}}Click Here{{</* /button */>}}
```
{{<button>}}Click Here{{</button>}}
{{<button variant="outlined">}}Click Here{{</button>}}
{{<button variant="dash">}}Click Here{{</button>}}
{{<button variant="soft">}}Click Here{{</button>}}
{{<button variant="ghost">}}Click Here{{</button>}}
{{<button variant="link">}}Click Here{{</button>}}

### Colors

| Color       | Description                             |
|-------------|-----------------------------------------|
| `neutral`   | Neutral color, typically gray.          |
| `primary`   | Primary color, often used for emphasis. |
| `secondary` | Secondary color, complementary to primary. |
| `accent`    | Accent color for highlights.            |
| `info`      | Informational color, often blue.        |
| `success`   | Success color, typically green.         |
| `warning`   | Warning color, usually yellow or orange.|
| `error`     | Error color, typically red.             |

```tpl
{{</* button [color="..."] */>}}Click Here{{</* /button */>}}
{{</* button color="error" */>}}Click Here{{</* /button */>}}
```
{{<button>}}Click Here{{</button>}}
{{<button color="neutral">}}Click Here{{</button>}}
{{<button color="primary">}}Click Here{{</button>}}
{{<button color="secondary">}}Click Here{{</button>}}
{{<button color="accent">}}Click Here{{</button>}}
{{<button color="info">}}Click Here{{</button>}}
{{<button color="success">}}Click Here{{</button>}}
{{<button color="warning">}}Click Here{{</button>}}
{{<button color="error">}}Click Here{{</button>}}