const hh = require("hyperscript-helpers");
const { h, diff, patch } = require("virtual-dom");
const { div, button, section, p, textarea } = hh(h);
const {messages} = require("./messages");

function viewFlashcards(dispatch, flashcard, editingFlashcard, editableFlashcard) {
	return section({
			className:
				"bg-yellow-100 p-4 rounded-md w-60 text-pretty break-words min-h-60 border-solid border-2 border-black"
		},
		[
			div({ className: "flex justify-between items-center mb-2" }, [
				p({ className: "underline font-bold" }, "Question"),
				section({}, [
					flashcard.id === editingFlashcard
						? null
						: button({ onclick: () => dispatch(messages.EDIT_FLASHCARD, flashcard.id)}, "✒️"),
					button({ onclick: () => dispatch(messages.DELETE_FLASHCARD, flashcard.id)}, "🗑️")
				])
			]),
			flashcard.id === editingFlashcard
				? textarea({ className:"w-full mb-2 p-2 border rounded bg-slate-50 text-lg",
						value: editableFlashcard.question,
						oninput: (e) =>
							dispatch(
								messages.UPDATE_EDITABLE_QUESTION,
								e.target.value
							)
				  })
				: p(flashcard.question),
			flashcard.id === editingFlashcard
				? textarea({ className:"w-full p-2 border rounded bg-slate-50 text-lg",
						value: editableFlashcard.answer,
						oninput: (e) =>
							dispatch(
								messages.UPDATE_EDITABLE_ANSWER,
								e.target.value
							)
				  })
				: null,
			editingFlashcard !== flashcard.id
				? button({ className: "underline cursor-pointer mt-2",
							onclick: () =>
								dispatch(messages.TOGGLE_ANSWER, flashcard.id)
						},
						flashcard.showAnswer ? "Hide answer" : "Show answer"
				  )
				: null,
			flashcard.showAnswer && editingFlashcard === null
				? p({ className: "underline font-bold" }, "Answer")
				: null,
			flashcard.showAnswer && editingFlashcard === null
				? p(flashcard.answer)
				: null,
			flashcard.showAnswer && editingFlashcard === null
				? section({ className: "flex justify-around text-white pt-6" },
						[
							button({ className: `bg-red-700 px-3 py-0.5 rounded-md`,
									onclick: () =>
										dispatch(messages.UPDATE_RATING, {
											id: flashcard.id,
											ratingType: 0
										})
								},
								"Bad"
							),
							button({ className: `bg-blue-700 px-3 py-0.5 rounded-md`,
									onclick: () =>
										dispatch(messages.UPDATE_RATING, {
											id: flashcard.id,
											ratingType: 1
										})
								},
								"Good"
							),
							button({ className: `bg-green-700 px-3 py-0.5 rounded-md`,
									onclick: () =>
										dispatch(messages.UPDATE_RATING, {
											id: flashcard.id,
											ratingType: 2
										})
								},
								"Great"
							)
						]
				  )
				: null,
        p(`Rating: ${flashcard.rating}`),
			flashcard.id === editingFlashcard
				? button({ className:"bg-blue-500 text-white px-4 py-2 rounded mt-2",
							onclick: () =>
								dispatch(messages.SAVE_EDITED_FLASHCARD)
						},
						"Save"
				  )
				: null
		]
	);
}

function createFlashcardForm(dispatch, model) {
	return section({ className: "bg-white p-4 rounded-md border border-gray-300 w-60"},
		[
			div({ className: "mb-2" }, [
				p({ className: "font-bold mb-1" }, "New Flashcard"),
				textarea({ className:"w-full mb-2 p-2 border rounded bg-slate-50 text-lg",
					placeholder: "Enter question...",
					value: model.newFlashcard.question,
					oninput: (e) =>
						dispatch(messages.UPDATE_QUESTION, e.target.value)
				}),
				textarea({ className: "w-full p-2 border rounded bg-slate-50 text-lg",
					placeholder: "Enter answer...",
					value: model.newFlashcard.answer,
					oninput: (e) =>
						dispatch(messages.UPDATE_ANSWER, e.target.value)
				})
			]),
			button({ className: "bg-blue-500 text-white px-4 py-2 border-solid border-2 border-gray mr-5",
					onclick: () => dispatch(messages.SAVE_FLASHCARD)
				},
				"Save"
			),
			button({ className: "bg-red-500 text-white px-4 py-2 border-solid border-2 border-gray",
					onclick: () => dispatch(messages.CANCEL_NEW_FLASHCARD)
				},
				"Cancel"
			)
		]
	);
}

module.exports = {createFlashcardForm, viewFlashcards};