const keySound = new Audio("assets/key.mp3");

export const type = (paragraph, text) => {
  const duration = Number(paragraph.dataset.duration) || 5000;
  const portions = ~~(duration / text.length);
  for (let i = 0; i <= text.length; i++) {
    setTimeout(() => {
      paragraph.textContent = text.substring(0, i);
      keySound.currentTime = 0;
      keySound.play();
    }, i * portions);
  }
}

export const typewriter = (paragraph) => {
  const delay = paragraph.dataset.delay || 0;
  const text = paragraph.textContent;
  paragraph.textContent = "";
  setTimeout(() => type(paragraph, text), delay);
}
