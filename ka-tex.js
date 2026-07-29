// Import KaTeX from the CDN 
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.mjs'

// Create a shared constructed stylesheet for KaTeX to avoid multiple fetches and style recalculations
const katexStylesheet = new CSSStyleSheet()
fetch('https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css')
	.then(res => res.text())
	.then(css => katexStylesheet.replace(css))

// TODO: Think about distribution and packaging for npm, jsr, cdn etc.
// Bundling in the katex library and css will produce a more self-contained component, but will increase the size of the package.

// Define the KaTex custom element
class KaTex extends HTMLElement {

	/** The constructor initializes the shadow DOM and sets up the container for rendering KaTeX. */
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.adoptedStyleSheets = [katexStylesheet]
		this.container = document.createElement('span')
		this.shadowRoot.append(this.container)
	}

	/** The `observedAttributes` getter tells the browser which attributes to monitor for changes. */
	static get observedAttributes() {
		return ['expression', 'block', 'throw-on-error', 'error-color']
	}

	/** The mathematical expression to be rendered by KaTeX. */
	get expression() {
		return this.getAttribute('expression') || ''
	}

	/** The mathematical expression to be rendered by KaTeX. */
	set expression(expr) {
		if (expr === null || expr === undefined) {
			this.removeAttribute('expression')
			return
		}
		this.setAttribute('expression', String(expr))
	}

	/** if 'throw-on-error' attribute is present, KaTeX will throw errors instead of rendering them in red. */
	get throwOnError() {
		return this.hasAttribute('throw-on-error')
	}

	/** The color in which errors will be displayed. Defaults to red if not specified. */
	get errorColor() {
		return this.getAttribute('error-color') || '#cc0000'
	}

	/** The `attributeChangedCallback` is called whenever one of the observed attributes changes. */
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === 'expression') {
				this.renderKaTeX(newValue)			// Re-render with the new expression
			} else {
				this.renderKaTeX(this.expression) 	// Re-render with the current expression to apply new settings
			}
		}
	}

	/** The `connectedCallback` is called when the element is added to the DOM. */
	connectedCallback() {
		this.renderKaTeX(this.expression) 			// Render the initial expression when the element is connected
	}

	/** The `renderKaTeX` method uses KaTeX to render the mathematical expression. */
	renderKaTeX(expression) {

		// Clear the container if no expression is provided
		if (!expression) {
			this.container.replaceChildren()
			return
		}

		try {

			katex.render(expression, this.container, {
				displayMode: this.hasAttribute('block'), 	// Render in block mode if the 'block' attribute is present
				throwOnError: this.throwOnError, 			// KaTeX will render the raw string in red instead of throwing an error
				errorColor: this.errorColor
				// FUTURE: Expose additional options as attributes as needed. https://katex.org/docs/options
			})

		} catch (error) {

			// If throwOnError is true, rethrow the error to allow external handling
			if (this.throwOnError) { throw error }

			// Otherwise, hard fallback in case KaTeX fails to render the expression
			this.container.innerText = expression
			this.container.style.color = this.errorColor
			console.error('KaTeX rendering error:', error)

		}

	}

	/** Re-renders the current expression using KaTeX. */
	render() {
		this.renderKaTeX(this.expression)
	}
}

// -----------------------------------
customElements.define('ka-tex', KaTex)
// -----------------------------------
