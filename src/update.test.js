const { update } = require("./update");
const { messages } = require("./messages");

test("Enable Flashcard form", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    };
    expect(update(messages.ADD_FLASHCARD, model)).toMatchObject({ ...model, showForm: true })
})

test("Save on NOT complete flashcard form", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model)).toMatchObject({ ...model });

    const model2 = {
        flashcards: [],
        newFlashcard: { question: "Question", answer: "", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model2)).toMatchObject({ ...model2 });

    const model3 = {
        flashcards: [],
        newFlashcard: { question: "", answer: "Answer", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model3)).toMatchObject({ ...model3 });
})

test("Saving a Flashcard", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "Question", answer: "Answer", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model)).toMatchObject(
        {
            ...model, flashcards: [{ ...model.newFlashcard, id: 0, showAnswer: false }],
            newFlashcard: { question: "", answer: "" }, showForm: false
        });

    const model2 = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "Question2", answer: "Answer2", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model2)).toMatchObject(
        {
            ...model2, flashcards: [...model2.flashcards, { ...model2.newFlashcard, id: 1, showAnswer: false }],
            newFlashcard: { question: "", answer: "" }, showForm: false
        });

    const model3 = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "Question2", answer: "Answer2", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model3)).toMatchObject({
        ...model3, flashcards: [...model3.flashcards, { ...model3.newFlashcard, id: 1, showAnswer: false }],
        newFlashcard: { question: "", answer: "" }, showForm: false
    });
})

test("Save card inputs on form", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.UPDATE_QUESTION, model, "Question")).toMatchObject({
        ...model, newFlashcard: { ...model.newFlashcard, question: "Question" }
    })
    expect(update(messages.UPDATE_ANSWER, model, "Answer")).toMatchObject({
        ...model, newFlashcard: { ...model.newFlashcard, answer: "Answer" }
    })
})

test("Deleting a flashcard", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.DELETE_FLASHCARD, model, 0)).toMatchObject({
        ...model, flashcards: []
    })

    const model2 = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: 0,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.DELETE_FLASHCARD, model2, 0)).toMatchObject({
        ...model2, flashcards: [], editingFlashcard: null
    })
})

test("Toggeling answer", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.TOGGLE_ANSWER, model, 0)).toMatchObject({
        ...model, flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: true }]
    })

    const model2 = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: true }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.TOGGLE_ANSWER, model2, 0)).toMatchObject({
        ...model2, flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }]
    })
})

test("Edit flashcard", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.EDIT_FLASHCARD, model, 0)).toMatchObject({
        ...model, editingFlashcard: 0, editableFlashcard: {
            id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false
        }
    })
})

test("Save edit form", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: 0,
        editableFlashcard: { id: 0, question: "question2", answer: "answer2", rating: 0, showAnswer: false }
    }
    expect(update(messages.SAVE_EDITED_FLASHCARD, model)).toMatchObject({
        ...model, flashcards: [{ id: 0, question: "question2", answer: "answer2", rating: 0, showAnswer: false }],
        editingFlashcard: null, editableFlashcard: {
            question: "", answer: ""
        }
    })
})

test("Save inputs from update form", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: 0,
        editableFlashcard: { id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }
    }
    expect(update(messages.UPDATE_EDITABLE_QUESTION, model, "question2")).toMatchObject({
        ...model, editableFlashcard: { ...model.editableFlashcard, question: "question2" }
    })
    expect(update(messages.UPDATE_EDITABLE_ANSWER, model, "answer2")).toMatchObject({
        ...model, editableFlashcard: { ...model.editableFlashcard, answer: "answer2" }
    })
})

test("Update Ratings", () => {
    const model = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.UPDATE_RATING, model, { id: 0, ratingType: 2 })).toMatchObject({
        ...model, flashcards: [{ id: 0, question: "question", answer: "answer", rating: 2, showAnswer: false }]
    })

    const model2 = {
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 2, showAnswer: false }],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.UPDATE_RATING, model2, { id: 0, ratingType: 1 })).toMatchObject({
        ...model2, flashcards: [{ id: 0, question: "question", answer: "answer", rating: 3, showAnswer: false }]
    })
    expect(update(messages.UPDATE_RATING, model2, { id: 0, ratingType: 0 })).toMatchObject({
        ...model2, flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }]
    })
})

test("Cancel create form", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.CANCEL_NEW_FLASHCARD, model)).toMatchObject({
        ...model, showForm: false
    })

    const model2 = {
        flashcards: [],
        newFlashcard: { question: "Question", answer: "Answer", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.CANCEL_NEW_FLASHCARD, model2)).toMatchObject({
        ...model2, showForm: false, newFlashcard: {
            question: "", answer: "", rating: 0
        }
    })
})