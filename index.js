//DOM CACHE
const submitName = document.getElementById("form-button");
const cover = document.getElementById("landing-page");
const animalPics = document.getElementsByClassName("grid-square");
const startButton = document.getElementById("start-button");
const guesses = document.getElementById("guesses");
const guessesParent = document.getElementById("guesses-parent");
const grid = document.getElementById("grid");
const victoryMessage = document.getElementById("victory-message");
const victoryDetails = document.getElementById("victory-details");
let username = document.getElementById("user-name")

const cards = Array.from(animalPics);
const imagesSources = [
  "./images/bee.jpg",
  "./images/frog.png",
  "./images/anteater.jpg",
  "./images/cat.jpg",
];

let initialised = false;
let indexesArray = [];
let count = 0;
let numOfGuesses = 0;
let clickedImages = [];

const victory = () => {
  grid.style.display = "none";
  victoryMessage.textContent = `Well done ${username}! You did it.`;
  victoryMessage.style.display = "block";
  victoryDetails.textContent = `It took you ${numOfGuesses} guesses!`;
  victoryDetails.style.display = "block";
  startButton.innerText = "Play Again?";
  guessesParent.style.display = "none";
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
  numOfGuesses++;
  guesses.textContent = numOfGuesses;
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
  if (count < 2) {
    event.target.firstElementChild.style.display = "block";
    count++;
    clickedImages.push(event.target.firstElementChild);
    if (count === 2) {
      setTimeout(checkMatch, 500);
    }
  }
};

const assignSource = (source) => {
  const index = Math.floor(Math.random() * cards.length);
  if (!indexesArray.includes(index)) {
    cards[index].firstElementChild.src = source;
    indexesArray.push(index);
  } else {
    assignSource(source);
  }
};

const randomiseCards = () => {
  cards.forEach((card) => (card.firstElementChild.src = ""));
  indexesArray = [];
  imagesSources.forEach((source) => {
    assignSource(source);
    assignSource(source);
  });
};

const initialise = () => {
  initialised = true;
  cards.forEach((card) => {
    card.addEventListener("click", turnOver);
  });
};

const reset = () => {
  startButton.innerText = "Let's play!";
  grid.style.display = "grid";
  victoryDetails.style.display = "none";
  victoryMessage.style.display = "none";
  guessesParent.style.display = "block";
  numOfGuesses = 0;
  guesses.textContent = numOfGuesses;
  cards.forEach((card) => {
    card.firstElementChild.style.display = "none";
  });
};

startButton.addEventListener("click", () => {
  if (!initialised) initialise();
  else reset();
  randomiseCards();
});

submitName.addEventListener("click", () => {
  cover.classList.add("hide-cover");
  setTimeout(() => {cover.style.display = "none"}, 900)
  username = document.getElementById("user-name").value
});
