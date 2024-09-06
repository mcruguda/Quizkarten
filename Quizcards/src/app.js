const createElement = require("virtual-dom/create-element");
const { h, diff, patch } = require("virtual-dom");
const update = require("./update");
const view = require("./view");

function app(initialModel, update, view, node) {
	let model = initialModel;
	let currentView = view(dispatch, model);
	let rootNode = createElement(currentView);
	node.appendChild(rootNode);

	function dispatch(message, value) {
		model = update(message, model, value);
		const updatedView = view(dispatch, model);
		const patches = diff(currentView, updatedView);
		rootNode = patch(rootNode, patches);
		currentView = updatedView;
	}
}

module.exports = {app};