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

	/** The observedAttributes getter tells the browser which attributes to monitor for changes. */
	observedAttributes = ['expression', 'block']

	/** The attributeChangedCallback is called whenever one of the observed attributes changes. */
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.renderKaTeX(newValue)
		}
	}

	/** The connectedCallback is called when the element is added to the DOM. */
	connectedCallback() {
		const expression = this.getAttribute('expression')
		this.renderKaTeX(expression)
	}

	/** The renderKaTeX method uses KaTeX to render the mathematical expression. */
	renderKaTeX(expression) {
		if (!expression) { return }

		try {
			katex.render(expression, this.container, {
				displayMode: this.hasAttribute('block'), 	// Render in block mode if the 'block' attribute is present
				throwOnError: false, 						// KaTeX will render the raw string in red instead of throwing an error
				errorColor: "#cc0000"
			})
		} catch (error) {
			// Hard fallback in case KaTeX fails to render the expression
			this.container.innerText = expression
			console.error('KaTeX rendering error:', error)
		}
	}
}

// -----------------------------------
customElements.define('ka-tex', KaTex)
// -----------------------------------
