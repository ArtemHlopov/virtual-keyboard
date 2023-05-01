export class Key {
  constructor(key) {
    this.value = key.value;
    if (key.shiftValue !== undefined) {
      this.shiftValue = key.shiftValue;
    }
    this.class = key.class;
  }
  render() {
    let container = document.createElement("div");
    container.innerHTML = this.value;
    container.className = this.class;
    return container;
  }
}
