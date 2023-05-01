export class Key {
  constructor(key) {
    this.value = key.value;
    this.shiftValue = key.shiftValue;
    this.class = key.class;
    this.id = key.id;
  }
  render() {
    let container = document.createElement("div");
    container.innerHTML = this.value;
    container.className = this.class;
    if (this.shiftValue !== undefined) {
      container.setAttribute("data-shift", this.shiftValue);
    }
    container.id = this.id;
    return container;
  }
}
