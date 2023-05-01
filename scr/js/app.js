import { Keyboard } from "./keyboard.js";

const body = document.querySelector("body");
let a = new Keyboard();
body.prepend(a.render());

const screan = document.querySelector(".screan");
const letters = document.querySelectorAll(".key__letter");
const shifted = document.querySelectorAll(".key__switched");

window.addEventListener("keydown", (event) => {
  pressKey(event);
});
window.addEventListener("keyup", (event) => {
  upKey(event);
});

function pressKey(event) {
  console.log(event.code, screan.selectionStart, screan.selectionEnd);
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
    key.classList.contains("key__switched") ||
    key.classList.contains("key__arrow")
  ) {
    screan.value += key.textContent;
  }
  if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
    showShifted();
  }
  if (event.code == "Backspace") {
    screan.value = screan.value.slice(0, -1);
  }
  if (event.code == "Enter") {
    screan.value += `\n`;
  }
  if (event.code == "Tab") {
    screan.value += "    ";
  }
  if (event.code == "Space") {
    screan.value += " ";
  }
}

function upKey(event) {
  event.preventDefault();
  let key = document.querySelector(`#${event.code}`);
  if (event.code !== "CapsLock") key.classList.remove("pressed");
  if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
    showShifted();
  }
}

function toUpper(arr) {
  [...arr].forEach((el) => (el.innerHTML = el.innerHTML.toUpperCase()));
}
function toLower(arr) {
  [...arr].forEach((el) => (el.innerHTML = el.innerHTML.toLowerCase()));
}
function showShifted() {
  [...shifted].forEach((el) => {
    let attr = el.getAttribute("data-shift");
    let curVal = el.textContent;
    el.innerHTML = attr;
    el.setAttribute("data-shift", curVal);
  });
}
