import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

const { div, button, section, p, textarea } = hh(h);

const messages = {
	ADD_FLASHCARD: "ADD_FLASHCARD",
	UPDATE_QUESTION: "UPDATE_QUESTION",
	UPDATE_ANSWER: "UPDATE_ANSWER",
	SAVE_FLASHCARD: "SAVE_FLASHCARD",
	DELETE_FLASHCARD: "DELETE_FLASHCARD",
	TOGGLE_ANSWER: "TOGGLE_ANSWER",
	EDIT_FLASHCARD: "EDIT_FLASHCARD",
	SAVE_EDITED_FLASHCARD: "SAVE_EDITED_FLASHCARD",
	UPDATE_EDITABLE_QUESTION: "UPDATE_EDITABLE_QUESTION",
	UPDATE_EDITABLE_ANSWER: "UPDATE_EDITABLE_ANSWER",
	UPDATE_RATING: "UPDATE_RATING"
};

function flashcardView(dispatch, flashcard, editingFlashcard, editableFlashcard) {
	return section(
		{
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
				? textarea({
						className:
							"w-full mb-2 p-2 border rounded bg-slate-50 text-lg",
						value: editableFlashcard.question,
						oninput: (e) =>
							dispatch(
								messages.UPDATE_EDITABLE_QUESTION,
								e.target.value
							)
				  })
				: p(flashcard.question),
			flashcard.id === editingFlashcard
				? textarea({
						className:
							"w-full p-2 border rounded bg-slate-50 text-lg",
						value: editableFlashcard.answer,
						oninput: (e) =>
							dispatch(
								messages.UPDATE_EDITABLE_ANSWER,
								e.target.value
							)
				  })
				: null,
			editingFlashcard !== flashcard.id
				? button({
							className: "underline cursor-pointer mt-2",
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
				? section(
						{ className: "flex justify-around text-white pt-6" },
						[
							button({
									className: `bg-red-700 px-3 py-0.5 rounded-md`,
									onclick: () =>
										dispatch(messages.UPDATE_RATING, {
											id: flashcard.id,
											ratingType: 0
										})
								},
								"Bad"
							),
							button({
									className: `bg-blue-700 px-3 py-0.5 rounded-md`,
									onclick: () =>
										dispatch(messages.UPDATE_RATING, {
											id: flashcard.id,
											ratingType: 1
										})
								},
								"Good"
							),
							button({
									className: `bg-green-700 px-3 py-0.5 rounded-md`,
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
			flashcard.id === editingFlashcard
				? button(
						{
							className:
								"bg-blue-500 text-white px-4 py-2 rounded mt-2",
							onclick: () =>
								dispatch(messages.SAVE_EDITED_FLASHCARD)
						},
						"Save"
				  )
				: null
		]
	);
}

function newFlashcardFormView(dispatch, model) {
	return section(
		{
			className: "bg-white p-4 rounded-md border border-gray-300 w-60"
		},
		[
			div({ className: "mb-2" }, [
				p({ className: "font-bold mb-1" }, "New Flashcard"),
				textarea({
					className:
						"w-full mb-2 p-2 border rounded bg-slate-50 text-lg",
					placeholder: "Enter question...",
					value: model.newFlashcard.question,
					oninput: (e) =>
						dispatch(messages.UPDATE_QUESTION, e.target.value)
				}),
				textarea({
					className: "w-full p-2 border rounded bg-slate-50 text-lg",
					placeholder: "Enter answer...",
					value: model.newFlashcard.answer,
					oninput: (e) =>
						dispatch(messages.UPDATE_ANSWER, e.target.value)
				})
			]),
			button(
				{
					className: "bg-blue-500 text-white px-4 py-2 rounded",
					onclick: () => dispatch(messages.SAVE_FLASHCARD)
				},
				"Save"
			)
		]
	);
}

function view(dispatch, model) {
	// I use .slice() to make a copy of the array so i dont change the original array
	const sortedFlashcards = model.flashcards.slice().sort((a, b) => {
		// Sort based on rating with 0 being the lowest and 2 the highest
		return (a.rating || 0) - (b.rating || 0);
	});

	return div({ className: "w-full container mx-auto p-4" }, [
		button(
			{
				id: "createButton",
				className: "bg-blue-600 rounded-md text-white py-1 px-3 mt-4",
				onclick: () => dispatch(messages.ADDCARD)
			},
			"Add card"
		),
		div(
			{
				className:
					"w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4"
			},
			[
				...sortedFlashcards.map((flashcard) =>
					flashcardView(
						dispatch,
						flashcard,
						model.editingFlashcard,
						model.editableFlashcard
					)
				),
				model.showForm ? newFlashcardFormView(dispatch, model) : null
			]
		)
	]);
}

function update(message, model, value) {
	switch (message) {
		case messages.ADDCARD:
			return {
				...model,
				showForm: true
			};

		case messages.UPDATE_QUESTION:
			return {
				...model,
				newFlashcard: { ...model.newFlashcard, question: value }
			};

		case messages.UPDATE_ANSWER:
			return {
				...model,
				newFlashcard: { ...model.newFlashcard, answer: value }
			};

		case messages.SAVE_FLASHCARD:
			if (
				model.newFlashcard.question.trim() === "" ||
				model.newFlashcard.answer.trim() === ""
			) {
				return model;
			}
			const newFlashcard = {
				...model.newFlashcard,
				id: model.flashcards.length,
				showAnswer: false,
				rating: 0
			};
			return {
				...model,
				flashcards: [...model.flashcards, newFlashcard],
				newFlashcard: { question: "", answer: "" },
				showForm: false
			};

		case messages.TOGGLE_ANSWER:
			return {
				...model,
				flashcards: model.flashcards.map((flashcard) =>
					flashcard.id === value
						? { ...flashcard, showAnswer: !flashcard.showAnswer }
						: flashcard
				)
			};

		case messages.DELETE_FLASHCARD:
			return {
				...model,
				flashcards: model.flashcards.filter(
					(flashcard) => flashcard.id !== value
				),
				editingFlashcard:
					model.editingFlashcard === value
						? null
						: model.editingFlashcard
			};

		case messages.EDIT_FLASHCARD:
			const flashcardToEdit = model.flashcards.find(
				(flashcard) => flashcard.id === value
			);
			return {
				...model,
				editingFlashcard: value,
				editableFlashcard: { ...flashcardToEdit }
			};

		case messages.SAVE_EDITED_FLASHCARD:
			return {
				...model,
				flashcards: model.flashcards.map((flashcard) =>
					flashcard.id === model.editingFlashcard
						? { ...model.editableFlashcard }
						: flashcard
				),
				editingFlashcard: null,
				editableFlashcard: { question: "", answer: "" }
			};

		case messages.UPDATE_EDITABLE_QUESTION:
			return {
				...model,
				editableFlashcard: {
					...model.editableFlashcard,
					question: value
				}
			};

		case messages.UPDATE_EDITABLE_ANSWER:
			return {
				...model,
				editableFlashcard: { ...model.editableFlashcard, answer: value }
			};

		case messages.UPDATE_RATING:
			const { id, ratingType } = value;
			return {
				...model,
				flashcards: model.flashcards.map((flashcard) => {
					if (flashcard.id === id) {
						let cardRating;
						switch (ratingType) {
							case 0:
								cardRating = 0;
								break;
							case 1:
								cardRating = (flashcard.rating || 0) + 1;
								break;
							case 2:
								cardRating = (flashcard.rating || 0) + 2;
								break;
							default:
								cardRating = flashcard.rating || 0;
						}
						return { ...flashcard, rating: cardRating };
					}
					return flashcard;
				})
			};

		default:
			return model;
	}
}

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

const initialModel = {
	flashcards: [],
	newFlashcard: { question: "", answer: "", rating: 0 },
	showForm: false,
	editingFlashcard: null,
	editableFlashcard: { question: "", answer: "" }
};

const rootNode = document.getElementById("app");
app(initialModel, update, view, rootNode);
