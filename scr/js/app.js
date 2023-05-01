import { Keyboard } from "./keyboard.js";

const body = document.querySelector("body");
let a = new Keyboard();
body.prepend(a.render());
