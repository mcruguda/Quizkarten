const { view } = require("./view");
const { initialModel } = require("./model");

//https://github.com/SwitzerChees/modul323-counter-unit-testing/blob/master/src/View.test.js
test("Basic Structure", () => {
    const myView = view(() => { }, initialModel);
    expect(myView.tagName).toBe("DIV");
    expect(myView.children.length).toBe(2);
    expect(myView.children[0].tagName).toBe("BUTTON");
    expect(myView.children[0].children.length).toBe(1);
    expect(myView.children[1].tagName).toBe("DIV");
    expect(myView.children[1].children.length).toBe(0);
});

test("Structure with card/cards", () => {
    //Answer not collapsed
    const newModel = {
        ...initialModel,
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }]
    };
    const myView = view(() => { }, newModel);
    expect(myView.tagName).toBe("DIV");
    expect(myView.children.length).toBe(2);
    expect(myView.children[0].tagName).toBe("BUTTON");
    expect(myView.children[0].children.length).toBe(1);
    expect(myView.children[1].tagName).toBe("DIV");
    expect(myView.children[1].children.length).toBe(1);
    expect(myView.children[1].children[0].tagName).toBe("SECTION");
    expect(myView.children[1].children[0].children.length).toBe(4);
    expect(myView.children[1].children[0].children[0].tagName).toBe("DIV");
    expect(myView.children[1].children[0].children[1].tagName).toBe("P");
    expect(myView.children[1].children[0].children[2].tagName).toBe("BUTTON");
    expect(myView.children[1].children[0].children[3].tagName).toBe("P");
    expect(myView.children[1].children[0].children[1].children.length).toBe(1);
    expect(myView.children[1].children[0].children[1].children[0].text).toBe("question");

    //Answer collapsed
    const newModel2 = {
        ...initialModel,
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: true }]
    };
    const myView2 = view(() => { }, newModel2);
    expect(myView2.children[1].children[0].children.length).toBe(7);
    expect(myView2.children[1].children[0].children[4].tagName).toBe("P");
    expect(myView2.children[1].children[0].children[5].tagName).toBe("SECTION");
    expect(myView2.children[1].children[0].children[6].tagName).toBe("P");
    expect(myView2.children[1].children[0].children[4].children[0].text).toBe("answer");

})

test("Structure with card creation/edit form", () => {
    //create card
    newModel = {
        ...initialModel,
        showForm: true,
        newFlashcard: { question: "Question", answer: "Answer", rating: 0 }
    };
    const myView = view(() => { }, newModel);
    expect(myView.tagName).toBe("DIV");
    expect(myView.children.length).toBe(2);
    expect(myView.children[0].tagName).toBe("BUTTON");
    expect(myView.children[0].children.length).toBe(1);
    expect(myView.children[1].tagName).toBe("DIV");
    expect(myView.children[1].children.length).toBe(1);
    expect(myView.children[1].children[0].tagName).toBe("SECTION");
    expect(myView.children[1].children[0].children.length).toBe(3);
    expect(myView.children[1].children[0].children[0].tagName).toBe("DIV");
    expect(myView.children[1].children[0].children[1].tagName).toBe("BUTTON");
    expect(myView.children[1].children[0].children[2].tagName).toBe("BUTTON");
    expect(myView.children[1].children[0].children[0].children.length).toBe(3);
    expect(myView.children[1].children[0].children[0].children[0].tagName).toBe("P");
    expect(myView.children[1].children[0].children[0].children[1].tagName).toBe("TEXTAREA");
    expect(myView.children[1].children[0].children[0].children[2].tagName).toBe("TEXTAREA");
    expect(myView.children[1].children[0].children[0].children[0].children[0].text).toBe("New Flashcard");
    expect(myView.children[1].children[0].children[0].children[1].properties.value).toBe("Question");
    expect(myView.children[1].children[0].children[0].children[2].properties.value).toBe("Answer");

    //edit card
    newModel2 = {
        ...initialModel,
        showForm: true,
        flashcards: [{ id: 0, question: "question", answer: "answer", rating: 0, showAnswer: false }],
        editingFlashcard: 0,
        editableFlashcard: { question: "question2", answer: "answer", rating: 0, showAnswer: false }
    };
    const myView2 = view(() => { }, newModel2);
    expect(myView2.children[1].children[0].children.length).toBe(5);
    expect(myView2.children[1].children[0].children[1].properties.value).toBe("question2");
})