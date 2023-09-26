export function createElement(obj) {
  const elem = document.createElement(`${obj.tagName}`);
  if (obj.className) {
    elem.classList.add(`${obj.className}`);
  }
  if (obj.text) {
    elem.innerHTML = `${obj.text}`;
  }
  return elem;
}