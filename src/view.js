const hh = require("hyperscript-helpers");
const { h, diff, patch } = require("virtual-dom");
const { div, button, section, p, textarea } = hh(h);
const { createFlashcardForm, viewFlashcards } = require("./flashcards");
const { messages } = require("./messages");
const r = require("ramda")

function view(dispatch, model) {
	// https://ramdajs.com/docs/#sort -> used to make the sorting of the Cards Functional instead of integrated .sort()
	const sortByRating = r.sortBy(r.compose(r.prop('rating')));
	const sortedFlashcards = sortByRating(model.flashcards);

	return div({ className: "w-full container mx-auto p-4" }, [
		button({
			className: "bg-green-600 shadow-lg border-solid border-2 border-gray text-white py-1 px-3 mt-4",
			onclick: () => dispatch(messages.ADD_FLASHCARD)
		},
			"Add flashcard"
		),
		div({ className: "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4" },
			[
				...sortedFlashcards.map((flashcard) =>
					viewFlashcards(dispatch, flashcard, model.editingFlashcard, model.editableFlashcard)
				),
				model.showForm ? createFlashcardForm(dispatch, model) : null
			]
		)
	]);
}

module.exports = { view };