const state = {
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  pairs: 0,
  locked: false,
};
function init() {
  const app = document.createElement("div");
  app.classList.add("app");
  const header = createHeader();
  const board = createGameBoard();
  app.append(header, board);
  document.body.append(app);
}
init();
function createHeader() {
  const headerElem = document.createElement("header");
  headerElem.classList.add("header-game");
  return headerElem;
}

function createGameBoard() {
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 0; i <= 16; i++) {
    const card = createCard();
    board.append(card);
  }
  return board;
}
function createCard() {
  const element = document.createElement("div");
  element.classList.add("card");
  return element;
}
