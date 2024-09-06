const {update} = require("./update");
const {messages} = require("./messages");

test("Enable Flashcard form", () => {
    const model = {};
    expect(update(messages.ADD_FLASHCARD, model)).toMatchObject({showForm: true});
    const model2 = {
        flashcards: [],
        newFlashcard: { question: "", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    };
    expect(update(messages.ADD_FLASHCARD, model2)).toMatchObject({...model2, showForm: true})
})

test("Save on NOT complete flashcard form", () => {
    const model = {
    flashcards: [],
	newFlashcard: { question: "", answer: "", rating: 0 },
	showForm: false,
	editingFlashcard: null,
	editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model)).toMatchObject({...model});
    
    const model2 = {
        flashcards: [],
        newFlashcard: { question: "Question", answer: "", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model2)).toMatchObject({...model2});
    
    const model3 = {
        flashcards: [],
        newFlashcard: { question: "", answer: "Answer", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
    }
    expect(update(messages.SAVE_FLASHCARD, model3)).toMatchObject({...model3});
})

test("Saving a Flashcard", () => {
    const model = {
        flashcards: [],
        newFlashcard: { question: "Question", answer: "Answer", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
        }
        expect(update(messages.SAVE_FLASHCARD, model)).toMatchObject(
            {...model, flashcards: [{...model.newFlashcard, id: 0, showAnswer: false}], 
        newFlashcard: {question: "", answer: ""}, showForm: false});
    
    const model2 = {
        flashcards: [{id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false}],
        newFlashcard: { question: "Question2", answer: "Answer2", rating: 0 },
        showForm: false,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
        }
        expect(update(messages.SAVE_FLASHCARD, model2)).toMatchObject(
            {...model2, flashcards: [...model2.flashcards, {...model2.newFlashcard, id: 1, showAnswer: false}], 
        newFlashcard: {question: "", answer: ""}, showForm: false});
        
    const model3 = {
        flashcards: [{id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false}],
        newFlashcard: { question: "Question2", answer: "Answer2", rating: 0 },
        showForm: true,
        editingFlashcard: null,
        editableFlashcard: { question: "", answer: "" }
        }
        expect(update(messages.SAVE_FLASHCARD, model3)).toMatchObject({
            ...model3, flashcards: [...model3.flashcards, {...model3.newFlashcard, id: 1, showAnswer: false}], 
            newFlashcard: {question: "", answer: ""}, showForm: false});
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
        ...model, newFlashcard: {...model.newFlashcard, question: "Question"}
    })
    expect(update(messages.UPDATE_ANSWER, model, "Answer")).toMatchObject({
        ...model, newFlashcard: {...model.newFlashcard, answer: "Answer"}
    })
})

test("", () => {
    
})