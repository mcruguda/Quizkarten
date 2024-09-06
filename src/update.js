const {messages} = require("./messages");

function update(message, model, value) {
	switch (message) {
		case messages.ADD_FLASHCARD:
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
						return { ...flashcard, rating: cardRating, showAnswer: false};
					}
					return flashcard;
				})
			};
			case messages.CANCEL_NEW_FLASHCARD:
				return {
					...model,
					showForm: false
				};
			case messages.CANCEL_EDIT_FLASHCARD:
				return {
					...model,
					editingFlashcard: null
				};

		default:
			return model;
	}
}

module.exports = {update};