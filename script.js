const state = {
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  pairs: 0,
  locked: false,
};

const cardImages = [
  "cat",
  "dog",
  "fox",
  "lion",
  "bear",
  "panda",
  "wolf",
  "tiger",
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); //12
    const temp = array[i]; //15
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function createDeck() {
  const cards = [...cardImages, ...cardImages];
  return shuffle(cards);
}

function init() {
  const app = document.createElement("div");
  app.classList.add("app");
  const cards = createDeck();

  const header = createHeader();
  const board = createGameBoard(cards);
  app.append(header, board);
  document.body.append(app);
}

init();
function createHeader() {
  const headerElem = document.createElement("header");
  headerElem.classList.add("header-game");
  return headerElem;
}

function createGameBoard(cards) {
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i]);
    board.append(card);
  }
  console.log(board);
  return board;
}
function createCard(imageName) {
  const element = document.createElement("div");
  const image = document.createElement("img");
  image.src = `./assets/${imageName}.png`;
  element.append(image);
  element.classList.add("card");
  return element;
}
