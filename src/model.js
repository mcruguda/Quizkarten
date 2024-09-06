const initialModel = {
	flashcards: [],
	newFlashcard: { question: "", answer: "", rating: 0 },
	showForm: false,
	editingFlashcard: null,
	editableFlashcard: { question: "", answer: "" }
};

module.exports = { initialModel };