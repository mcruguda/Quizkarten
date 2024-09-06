const {createFlashcardForm, viewFlashcards} = require("./flashcards");
const { initialModel } = require("./model");

test("Testing the flashcards view", () => {
    //Flashcard without showing the answer
    const model = {
        ...initialModel,
        flashcards: [{id:0, question: "question", answer: "answer", rating: 0, showAnswer: false}]
    }
    const myFlashcardView = model.flashcards.map((flashcard) =>
        viewFlashcards(() => {}, flashcard, model.editingFlashcard, model.editableFlashcard));
    expect(myFlashcardView[0].tagName).toBe("SECTION");
    expect(myFlashcardView[0].children.length).toBe(4);
    expect(myFlashcardView[0].children[1].children[0].text).toBe("question");
    
    //Flashcard with the answer showing
    const model2 = {
        ...initialModel,
        flashcards: [{id:0, question: "question", answer: "answer", rating: 0, showAnswer: true}]
    }
    const myFlashcardView2 = model2.flashcards.map((flashcard) =>
        viewFlashcards(() => {}, flashcard, model2.editingFlashcard, model2.editableFlashcard));
    expect(myFlashcardView2[0].tagName).toBe("SECTION");
    expect(myFlashcardView2[0].children.length).toBe(7);
    expect(myFlashcardView2[0].children[4].children[0].text).toBe("answer");
    
    //Flashcard in edit form
    const model3 = {
        ...initialModel,
        flashcards: [{id:0, question: "question", answer: "answer", rating: 0, showAnswer: false}],
        editingFlashcard: 0,
        editableFlashcard: {id:0, question: "question", answer: "answer2", rating: 0, showAnswer: false}
    }
    const myFlashcardView3 = model2.flashcards.map((flashcard) =>
        viewFlashcards(() => {}, flashcard, model3.editingFlashcard, model3.editableFlashcard));
    expect(myFlashcardView3[0].tagName).toBe("SECTION");
    expect(myFlashcardView3[0].children.length).toBe(5);
    expect(myFlashcardView3[0].children[2].properties.value).toBe("answer2");

})

test("Testing the create form for flashcards", () => {
    //Form without values
    const myFlashcardForm = createFlashcardForm(() => {}, initialModel);
    expect(myFlashcardForm.children.length).toBe(3);
    expect(myFlashcardForm.children[0].tagName).toBe("DIV");
    expect(myFlashcardForm.children[1].tagName).toBe("BUTTON");
    expect(myFlashcardForm.children[2].tagName).toBe("BUTTON");
    expect(myFlashcardForm.children[0].children.length).toBe(3);
    expect(myFlashcardForm.children[0].children[1].properties.value).toBe("");
    expect(myFlashcardForm.children[0].children[2].properties.value).toBe("");

    //Form with values
    const model2 = {
        ...initialModel,
        newFlashcard: { question: "Question", answer: "Answer", rating: 0 }
    }
    const myFlashcardForm2 = createFlashcardForm(() => {}, model2);
    expect(myFlashcardForm2.children.length).toBe(3);
    expect(myFlashcardForm2.children[0].tagName).toBe("DIV");
    expect(myFlashcardForm2.children[1].tagName).toBe("BUTTON");
    expect(myFlashcardForm2.children[2].tagName).toBe("BUTTON");
    expect(myFlashcardForm2.children[0].children.length).toBe(3);
    expect(myFlashcardForm2.children[0].children[1].properties.value).toBe("Question");
    expect(myFlashcardForm2.children[0].children[2].properties.value).toBe("Answer");
})