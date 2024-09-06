// import hh from "hyperscript-helpers";
// import { h, diff, patch } from "virtual-dom";
// import createElement from "virtual-dom/create-element";
const hh = require("hyperscript-helpers");
const { h, diff, patch } = require("virtual-dom");
const { div, button, section, p, textarea } = hh(h);
const createElement = require("virtual-dom/create-element");
const {app} = require("./app");
const {initialModel} = require("./model");
const {view} = require("./view");
const {update} = require("./update");
const {createFlashcardForm, viewFlashcards} = require("./flashcards");

const rootNode = document.getElementById("app");
app(initialModel, update, view, rootNode);