import { Keyboard } from "./keyboard.js";

const body = document.querySelector("body");
let a = new Keyboard();
body.prepend(a.render());

const screan = document.querySelector(".screan");
const letters = document.querySelectorAll(".key__letter");

window.addEventListener("keydown", (event) => {
  pressKey(event);
});
window.addEventListener("keyup", (event) => {
  upKey(event);
});

function pressKey(event) {
  console.log(event.code);
  event.preventDefault();
  let key = document.querySelector(`#${event.code}`);

  if (event.code === "CapsLock") {
    key.classList.toggle("pressed");
    key.classList.contains("pressed") ? toUpper(letters) : toLower(letters);
  } else {
    key.classList.add("pressed");
  }

  if (
    key.classList.contains("key__letter") ||
    key.classList.contains("key__switched")
  ) {
    screan.value += key.textContent;
  }
}

function upKey(event) {
  event.preventDefault();
  let key = document.querySelector(`#${event.code}`);
  if (event.code !== "CapsLock") key.classList.remove("pressed");
}

function toUpper(arr) {
  [...arr].forEach((el) => (el.innerHTML = el.innerHTML.toUpperCase()));
}
function toLower(arr) {
  [...arr].forEach((el) => (el.innerHTML = el.innerHTML.toLowerCase()));
}
