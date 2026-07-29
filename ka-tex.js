class KaTex extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.container = document.createElement('span')
		this.shadowRoot.append(this.container)
	}

	connectedCallback() {
		setInterval(() => {
			this.container.innerText = Math.random().toString()
		}, 1000)
	}
}

// -----------------------------------
customElements.define('ka-tex', KaTex)
// -----------------------------------
