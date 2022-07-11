const animalPics = document.getElementsByClassName("grid-square");
const cards = Array.from(animalPics);
const imagesSources = ["./images/bee.jpg", "./images/frog.png"];
const indexesArray = [];

let count = 0;
let clickedImages = [];

const victory = () => {
  console.log("YOU WIN");
};

const checkWin = () => {
  let isWin = true;
  cards.forEach((card) => {
    if (card.firstElementChild.style.display !== "block") {
      isWin = false;
    }
  });
  if (isWin) {
    victory();
  }
};

const checkMatch = () => {
  count = 0;
  if (clickedImages[0].src !== clickedImages[1].src) {
    clickedImages[0].style.display = "none";
    clickedImages[1].style.display = "none";
    clickedImages = [];
  } else {
    clickedImages = [];
    checkWin();
  }
};

const turnOver = (event) => {
  event.target.firstElementChild.style.display = "block";
  count++;
  clickedImages.push(event.target.firstElementChild);
  if (count === 2) {
    setTimeout(checkMatch, 2000);
  }
};

const assignSource = (source) => {
  const index = Math.floor(Math.random() * cards.length);
  if (!indexesArray.includes(index)) {
    cards[index].firstElementChild.src = source;
    indexesArray.push(index);
  } else {
    console.log("<<< inside recursion");
    assignSource(source);
  }
};

//EVENT LISTENERS

cards.forEach((card) => {
  card.addEventListener("click", turnOver);
});

imagesSources.forEach((source) => {
  assignSource(source);
  assignSource(source);
});
