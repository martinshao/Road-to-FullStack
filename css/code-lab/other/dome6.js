
const card = document.querySelector('.card');
const cardRect = card.getBoundingClientRect();
console.info(cardRect);
console.info(cardRect.right - cardRect.left);
card.addEventListener('mousedown', e => {
  console.info(e.clientX, e.clientY);
})

const title = document.querySelector('.title');
console.info(title.getBoundingClientRect())