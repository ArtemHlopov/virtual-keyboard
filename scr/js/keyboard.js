import { Key } from "./key.js";
import { KEYDATA_EN } from "./keydata.js";

export class Keyboard {
  constructor(lang) {
    this.lang = lang;
  }
  render() {
    if (!this.lang) {
      this.lang = localStorage.getItem("keyboardLang")
        ? localStorage.getItem("keyboardLang")
        : "en";
    }

    let data;

    this.lang === "en" ? (data = KEYDATA_EN) : (data = "");

    let keyboardBlock = document.createElement("div");
    keyboardBlock.classList.add("wrapper");

    let title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "RSS Виртуальная клавиатура";

    let screan = document.createElement("textarea");
    screan.classList.add("screan");

    let keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");

    console.log(data);
    let row;
    for (let i = 0; i < data.length; i++) {
      if (i == 0 || i == 14 || i == 29 || i == 42 || i == 55) {
        row = document.createElement("div");
        row.classList.add("row");
        keyboard.append(row);
        row.innerHTML = "";
      }
      let key = new Key(data[i]);
      let keyBlock = key.render();
      row.append(keyBlock);
    }

    keyboardBlock.append(title);
    keyboardBlock.append(screan);
    keyboardBlock.append(keyboard);

    return keyboardBlock;
  }
}
