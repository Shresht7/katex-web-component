# KaTeX Web Component

A super lightweight [web component][Web Components] for rendering mathematical expressions with [KaTeX][KaTeX] declaratively.

This project defines a custom element named `<ka-tex>` that renders LaTeX-style expressions inside a shadow DOM, with support for inline and block rendering, custom error handling, and live updates.

`<ka-tex>` simply wraps the [KaTeX][KaTeX] library and provides a declarative way to include math in your web pages. Since this is a [web-component][Web Components], it can be used in any modern browser and in any framework.

## Features

- Renders LaTeX expressions with [KaTeX][KaTeX]
- Supports inline and block layout modes
- Handles invalid expressions gracefully
- Works as a plain HTML element with no build step required
- Works in any modern browser and framework

## Quick Start

1. Include the component script in your page:

    ```html
    <script type="module" src="./ka-tex.js"></script>
    ```

2. Add the custom element wherever you want math to appear:

    ```html
    <ka-tex expression="E = mc^2"></ka-tex>
    ```
    $E=mc^2$

    ```html
    <ka-tex block expression="\sigma = \frac{\sum_0^N{(x - \mu)^2}}{N}"></ka-tex>
    ```
$$
\sigma = \frac{\sum_0^N{(x - \mu)^2}}{N}
$$

## Usage

### Inline expression

```html
<p>Einstein's equation: <ka-tex expression="E = mc^2"></ka-tex></p>
```

Einstein's equation: $E=mc^2$

### Block expression

```html
<ka-tex block expression="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}"></ka-tex>
```

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Custom error styling

```html
<ka-tex expression="\fakeCommand{\pi}" error-color="#ff8800"></ka-tex>
```

<span style="color: #ff8800;">\fakeCommand</span>${\pi}$

### Throw errors instead of rendering them

```html
<ka-tex expression="\fakeCommand{\pi}" throw-on-error></ka-tex>
```

## Attributes

| Attribute        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `expression`     | The LaTeX expression to render                               |
| `block`          | Enables block-mode rendering when present                    |
| `throw-on-error` | Throws an error instead of showing the raw expression in red |
| `error-color`    | Sets the color used for fallback/error rendering             |

## Demo

Open [index.html](index.html) in a browser to see the component in action.

## Todos

- Think about distribution and packaging. npm, jsr, cdn, etc.

---

## Thanks and Attribution

This project uses [KaTeX][KaTeX] for mathematical typesetting. [KaTeX][KaTeX] is an excellent open-source library for fast and beautiful rendering of LaTeX in the browser.

## License

This project is licensed under the [MIT License](LICENSE).

[KaTeX]: https://katex.org/
[Web Components]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
