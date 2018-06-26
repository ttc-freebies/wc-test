(function () {
	window.add = function (num1, num2) {
		return num1 + num2;
	}
	window.subtract = function (num1, num2) {
		return num1 - num2;
	}
	window.updateAppState = function (state) {
		window.history.pushState(state || {}, document.title, 'newstate');
	}
})();

class CustomElement extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {

		const x = document.createElement('div');
		x.classList.add('new');
		x.id = 'the-id';
		x.innerText = 'hello world!';
		x.style.backgroundColor = '#f0f0f0';
		x.style.color = 'red';

		this.appendChild(x);
	}

	disconnectedCallback() {

	}

	adoptedCallback(oldDocument, newDocument) {

	}

	static get observedAttributes() {
		// return ['name'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		switch (attr) {
			// case 'name':
				// console.log(newValue);
				// break;
		}
	}
}
customElements.define('custom-element', CustomElement);
