// Import KaTeX from the CDN 
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.mjs'

// Create a shared constructed stylesheet for KaTeX to avoid multiple fetches and style recalculations
const katexStylesheet = new CSSStyleSheet()
fetch('https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css')
	.then(res => res.text())
	.then(css => katexStylesheet.replace(css))

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
				this.renderKaTeX(newValue)
			} else {
				const currentExpression = this.getAttribute('expression')
				this.renderKaTeX(currentExpression)
			}
		}
	}

	/** The `connectedCallback` is called when the element is added to the DOM. */
	connectedCallback() {
		const expression = this.getAttribute('expression')
		this.renderKaTeX(expression)
	}

	/** The `renderKaTeX` method uses KaTeX to render the mathematical expression. */
	renderKaTeX(expression) {
		if (!expression) { return }

		try {
			katex.render(expression, this.container, {
				displayMode: this.hasAttribute('block'), 	// Render in block mode if the 'block' attribute is present
				throwOnError: this.throwOnError, 			// KaTeX will render the raw string in red instead of throwing an error
				errorColor: this.errorColor
				// FUTURE: Expose additional options as attributes as needed. https://katex.org/docs/options
			})
		} catch (error) {
			// Hard fallback in case KaTeX fails to render the expression
			this.container.innerText = expression
			this.container.style.color = this.errorColor
			console.error('KaTeX rendering error:', error)
		}
	}
}

// -----------------------------------
customElements.define('ka-tex', KaTex)
// -----------------------------------
