import { Keyboard } from "./keyboard.js";

const body = document.querySelector("body");

if (!localStorage.getItem("keyboard-lang")) {
  localStorage.setItem("keyboard-lang", "en");
  console.log(localStorage.getItem("keyboard-lang"));
  let board = new Keyboard(localStorage.getItem("keyboard-lang"));
  body.prepend(board.render());
} else if (localStorage.getItem("keyboard-lang") === "en") {
  let board = new Keyboard("en");
  body.prepend(board.render());
} else {
  let board = new Keyboard("ru");
  body.prepend(board.render());
}

let screan = document.querySelector(".screan");
let letters = document.querySelectorAll(".key__letter");
let shifted = document.querySelectorAll(".key__switched");

window.addEventListener("keydown", (event) => {
  pressKey(event);
});
window.addEventListener("keyup", (event) => {
  upKey(event);
});
window.addEventListener("mousedown", (event) => {
  pressMouse(event);
});
window.addEventListener("mouseup", (event) => {
  upMouse(event);
});

function pressKey(event) {
  console.log(event.code, screan.selectionEnd, screan.value.length);
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
    if (screan.selectionEnd == screan.value.length) {
      screan.value += key.textContent;
    } else {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      left += key.textContent;
      screan.value = left + right;
      screan.selectionEnd = position + 1;
    }
  }
  if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
    showShifted();
    toUpper(letters);
  }
  if (event.code == "Backspace" && screan.selectionEnd !== 0) {
    if (screan.selectionEnd == screan.value.length) {
      screan.value = screan.value.slice(0, -1);
    } else {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      left = left.slice(0, -1);
      screan.value = left + right;
      screan.selectionEnd = position - 1;
    }
  }
  if (event.code == "Delete" && screan.selectionEnd !== screan.value.length) {
    let position = screan.selectionEnd;
    let left = screan.value.slice(0, position);
    let right = screan.value.slice(position, screan.value.length);
    right = right.slice(1);
    screan.value = left + right;
    screan.selectionEnd = position;
  }
  if (event.code == "Enter") {
    if (screan.selectionEnd == screan.value.length) {
      screan.value += `\n`;
    } else {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      left += `\n`;
      screan.value = left + right;
      screan.selectionEnd = position + 1;
    }
  }
  if (event.code == "Tab") {
    if (screan.selectionEnd == screan.value.length) {
      screan.value += "    ";
    } else {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      left += "    ";
      screan.value = left + right;
      screan.selectionEnd = position + 4;
    }
  }
  if (event.code == "Space") {
    if (screan.selectionEnd == screan.value.length) {
      screan.value += " ";
    } else {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      left += " ";
      screan.value = left + right;
      screan.selectionEnd = position + 1;
    }
  }
  if (event.altKey && event.ctrlKey) {
    let text = screan.value;
    if (localStorage.getItem("keyboard-lang") === "en") {
      console.log("rus");
      localStorage.setItem("keyboard-lang", "ru");
      body.innerHTML = "";
      let board = new Keyboard("ru");
      body.prepend(board.render());
    } else {
      console.log("en");
      localStorage.setItem("keyboard-lang", "en");
      body.innerHTML = "";
      let board = new Keyboard("en");
      body.prepend(board.render());
    }
    screan = document.querySelector(".screan");
    letters = document.querySelectorAll(".key__letter");
    shifted = document.querySelectorAll(".key__switched");
    screan.value = text;
  }
}

function upKey(event) {
  event.preventDefault();
  let key = document.querySelector(`#${event.code}`);
  if (event.code !== "CapsLock") key.classList.remove("pressed");
  if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
    showShifted();
    toLower(letters);
  }
}

function pressMouse(event) {
  if (event.target.id) {
    let key = document.querySelector(`#${event.target.id}`);
    if (event.target.id === "CapsLock") {
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
      if (screan.selectionEnd == screan.value.length) {
        screan.value += key.textContent;
      } else {
        let position = screan.selectionEnd;
        let left = screan.value.slice(0, position);
        let right = screan.value.slice(position, screan.value.length);
        left += key.textContent;
        screan.value = left + right;
        screan.selectionEnd = position + 1;
      }
    }
    if (event.target.id == "ShiftLeft" || event.target.id == "ShiftRight") {
      showShifted();
      toUpper(letters);
    }
    if (event.target.id == "Backspace" && screan.selectionEnd !== 0) {
      if (screan.selectionEnd == screan.value.length) {
        screan.value = screan.value.slice(0, -1);
      } else {
        let position = screan.selectionEnd;
        let left = screan.value.slice(0, position);
        let right = screan.value.slice(position, screan.value.length);
        left = left.slice(0, -1);
        screan.value = left + right;
        screan.selectionEnd = position - 1;
      }
    }
    if (
      event.target.id == "Delete" &&
      screan.selectionEnd !== screan.value.length
    ) {
      let position = screan.selectionEnd;
      let left = screan.value.slice(0, position);
      let right = screan.value.slice(position, screan.value.length);
      right = right.slice(1);
      screan.value = left + right;
      screan.selectionEnd = position;
    }
    if (event.target.id == "Enter") {
      if (screan.selectionEnd == screan.value.length) {
        screan.value += `\n`;
      } else {
        let position = screan.selectionEnd;
        let left = screan.value.slice(0, position);
        let right = screan.value.slice(position, screan.value.length);
        left += `\n`;
        screan.value = left + right;
        screan.selectionEnd = position + 1;
      }
    }
    if (event.target.id == "Tab") {
      if (screan.selectionEnd == screan.value.length) {
        screan.value += "    ";
      } else {
        let position = screan.selectionEnd;
        let left = screan.value.slice(0, position);
        let right = screan.value.slice(position, screan.value.length);
        left += "    ";
        screan.value = left + right;
        screan.selectionEnd = position + 4;
      }
    }
    if (event.target.id == "Space") {
      if (screan.selectionEnd == screan.value.length) {
        screan.value += " ";
      } else {
        let position = screan.selectionEnd;
        let left = screan.value.slice(0, position);
        let right = screan.value.slice(position, screan.value.length);
        left += " ";
        screan.value = left + right;
        screan.selectionEnd = position + 1;
      }
    }
  }
}

function upMouse(event) {
  if (event.target.id) {
    let key = document.querySelector(`#${event.target.id}`);
    if (event.target.id !== "CapsLock") key.classList.remove("pressed");
    if (event.target.id == "ShiftLeft" || event.target.id == "ShiftRight") {
      showShifted();
      toLower(letters);
    }
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
