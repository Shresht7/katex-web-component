class KaTex extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.container = document.createElement('span')
		this.shadowRoot.append(this.container)
	}

	observedAttributes = ['expression']

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.renderKaTeX(newValue)
		}
	}

	connectedCallback() {
		this.container.innerText = this.getAttribute('expression') || ''
	}

	renderKaTeX(expression) {
		if (!expression) { return }
		this.container.innerText = expression
	}
}

// -----------------------------------
customElements.define('ka-tex', KaTex)
// -----------------------------------
