# KaTeX Web Component

A super lightweight [web component][Web Components] for rendering mathematical expressions with [KaTeX][KaTeX] declaratively.

```html
<ka-tex block expression="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}"></ka-tex>
```

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

This project defines a custom element named `<ka-tex>` that renders LaTeX-style expressions inside a shadow DOM, with support for inline and block rendering, custom error handling, and live updates.

`<ka-tex>` simply wraps the [KaTeX][KaTeX] library and provides a declarative way to include math in your web pages. Since this is a [web-component][Web Components], it can be used in any modern browser and in any framework.

---

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

---

## This vs KaTeX directly

[KaTeX][KaTeX] provides an imperative JavaScript API for rendering math expressions. This component wraps that API in a declarative way, allowing you to use HTML attributes to specify the expression and rendering options.

```js
// Imperative
const container = document.getElementById('math-container');
katex.render('E = mc^2', container, { displayMode: true });
```

vs

```html
<!-- Declarative -->
<ka-tex expression="E = mc^2" block></ka-tex>
```

This works out better for dynamic sites, as you can simply update the `expression` attribute and the component will handle the re-rendering logic automatically. It also encapsulates the KaTeX library and its CSS, so you don't have to worry about style conflicts or loading the library yourself.

### When not to use the web-component and use KaTeX directly

If you're making static sites and don't expect the math expressions to change dynamically, you should use [KaTeX][KaTeX] directly, as it will be more efficient and allow you to pre-render the math expressions at build time.

---

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


## Attributes

| Attribute        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `expression`     | The LaTeX expression to render                               |
| `block`          | Enables block-mode rendering when present                    |
| `throw-on-error` | Throws an error instead of showing the raw expression in red |
| `error-color`    | Sets the color used for fallback/error rendering             |

## JavaScript API

### `expression`

Read or update an element's expression with its `expression` property. Setting it re-renders the element; set it to `null` or `undefined` to clear the rendered output.

```js
const math = document.querySelector('ka-tex')

math.expression = 'E = mc^2'
math.expression = null
```

### `render()`

Re-render the current expression manually.

```js
document.querySelector('ka-tex').render()
```

### `katex-error` event

When KaTeX cannot render an expression and `throw-on-error` is not present, `<ka-tex>` renders its fallback and dispatches a bubbling `katex-error` event. The event's `detail` contains the original `error` and `expression`.

```js
document.addEventListener('katex-error', event => {
    const { error, expression } = event.detail
    console.error(`Could not render ${expression}:`, error)
})
```

## Demo

Open [index.html](index.html) in a browser to see rendered inline and block expressions, error handling, and a live expression preview.

## Todos

- Think about distribution and packaging. npm, jsr, cdn, etc.

---

## Thanks and Attribution

This project uses [KaTeX][KaTeX] for mathematical typesetting. [KaTeX][KaTeX] is an excellent open-source library for fast and beautiful rendering of LaTeX in the browser.

## License

This project is licensed under the [MIT License](LICENSE).

[KaTeX]: https://katex.org/
[Web Components]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
