const state = {
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  pairs: 0,
  locked: false,
  timerId: null,
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
init();

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
function compareFn(a, b) {
  if (a.moves !== b.moves) {
    return a.moves - b.moves;
  } else {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }
}

function saveResult() {
  //получили data
  let rawData = localStorage.getItem("data");
  let data = rawData ? JSON.parse(rawData) : [];

  //добавили новый результат
  data.push({
    moves: state.moves,
    date: new Date(),
  });
  data.sort(compareFn);
  data = data.slice(0, 10);
  // здесь сортируем data
  localStorage.setItem("data", JSON.stringify(data));
}
function init() {
  const app = document.createElement("div");
  app.classList.add("app");
  // const cards = createDeck();
  const board = createGameBoard();
  const header = createHeader();
  createLeaderboardModal();
  createVictoryModal();
  app.append(header, board);
  document.body.append(app);
}
/*
// header //
*/
function createHeader() {
  const headerElem = document.createElement("header");
  headerElem.classList.add("header-game");

  const movesElem = document.createElement("p");
  movesElem.classList.add("moves");
  movesElem.textContent = `moves: ${state.moves}`;

  const pairElem = document.createElement("p");
  pairElem.classList.add("pair");
  pairElem.textContent = `pair: ${state.pairs}`;

  const newGameBtn = document.createElement("button");
  newGameBtn.textContent = "new game";
  newGameBtn.addEventListener("click", newGame);

  const leaderBoard = document.createElement("button");
  leaderBoard.textContent = "leaderBoard";
  leaderBoard.classList.add("leaderBoard");
  leaderBoard.addEventListener("click", showLeaderboard);

  headerElem.append(movesElem, pairElem, newGameBtn, leaderBoard);

  return headerElem;
}

function showLeaderboard() {
  console.log("leaderboard click");
  const rawData = localStorage.getItem("data");
  const data = rawData ? JSON.parse(rawData) : [];
  const results = document.querySelector(".leaderboard-results");
  results.replaceChildren();
  data.forEach((result, index) => {
    const item = createLeaderboardItem(result, index + 1);
    results.append(item);
  });
  const modal = document.querySelector(".leaderboard-modal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function createLeaderboardModal() {
  const divModal = document.createElement("div");
  divModal.classList.add("leaderboard-modal");

  const divContentModal = document.createElement("div");
  divContentModal.classList.add("leaderboard-modal-content");

  const title = document.createElement("h2");
  title.textContent = "Leaderboard";

  const results = document.createElement("div");
  results.classList.add("leaderboard-results");

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";

  closeBtn.addEventListener("click", closeLeaderboard);

  divContentModal.append(title, results, closeBtn);
  divModal.append(divContentModal);
  document.body.append(divModal);
}

function createLeaderboardItem(result, place) {
  const item = document.createElement("div");
  item.classList.add("leaderboard-item");

  const placeElem = document.createElement("span");
  placeElem.textContent = place;

  const movesElem = document.createElement("span");
  movesElem.textContent = result.moves;

  const dateElem = document.createElement("span");
  dateElem.textContent = formatDate(result.date);

  item.append(placeElem, movesElem, dateElem);

  return item;
}

function formatDate(date) {
  const dateObj = new Date(date);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}
/*
create Victory Modal

*/

function createVictoryModal() {
  const divModal = document.createElement("div");
  divModal.classList.add("victory-modal");
  const divContentModal = document.createElement("div");
  divContentModal.classList.add("modal-content");
  const winText = document.createElement("p");
  const movesText = document.createElement("p");
  movesText.classList.add("movesText");
  const newGameBtn = document.createElement("button");
  const closeBtn = document.createElement("button");
  newGameBtn.textContent = "New game";
  closeBtn.textContent = "Close";
  winText.textContent = "You win!";
  movesText.textContent = `moves: ${state.moves}`;

  newGameBtn.addEventListener("click", newGame);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      console.log(e.key);
      closeModal();
      closeLeaderboard();
    }
  });

  divContentModal.append(winText, movesText, newGameBtn, closeBtn);
  divModal.append(divContentModal);
  document.body.append(divModal);
}

function closeModal() {
  const modal = document.querySelector(".victory-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function openModal() {
  const modal = document.querySelector(".victory-modal");
  const movesText = document.querySelector(".movesText");

  document.body.style.overflow = "hidden";

  movesText.textContent = `moves: ${state.moves}`;

  modal.classList.add("open");
}

function closeLeaderboard() {
  const modal = document.querySelector(".leaderboard-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
/*
updateStats(...)
*/

function updateStats() {
  const movesElem = document.querySelector(".moves");
  const pairElem = document.querySelector(".pair");
  console.log(movesElem);
  movesElem.textContent = `moves: ${state.moves}`;
  pairElem.textContent = `pair: ${state.pairs}`;
}
/*
newGame
*/

function newGame() {
  const modal = document.querySelector(".victory-modal");
  modal.classList.remove("open");
  clearTimeout(state.timerId);
  state.timerId = null;
  //Сбросить firstCard
  state.firstCard = null;
  //Сбросить secondCard
  state.secondCard = null;
  //Сбросить moves
  state.moves = 0;
  //Сбросить pairs
  state.pairs = 0;
  //Сбросить locked
  state.locked = false;

  updateStats();
  // Создать новое поле
  const board = document.querySelector(".board");
  board.replaceWith(createGameBoard());
}

/*
createGameBoard()
*/
function createGameBoard() {
  state.cards = createDeck();
  const board = document.createElement("div");
  board.classList.add("board");
  console.log(state.cards.length);
  for (let i = 0; i < state.cards.length; i++) {
    const card = createCard(state.cards[i]);
    board.append(card);
  }
  console.log(board);
  console.log(state.cards);
  return board;
}

function createCard(imageName) {
  const front = document.createElement("div");
  front.classList.add("card-front");
  const back = document.createElement("div");
  back.classList.add("card-back");
  const element = document.createElement("div");
  element.dataset.name = imageName;
  const image = document.createElement("img");
  image.src = `./assets/${imageName}.png`;
  front.append(image);
  element.append(front);
  element.append(back);
  element.classList.add("card");

  element.addEventListener("click", () => {
    if (state.locked) {
      return;
    }

    if (element.classList.contains("open")) {
      return;
    }

    if (element.classList.contains("matched")) {
      return;
    }

    element.classList.add("open");
    if (state.firstCard === null) {
      state.firstCard = element;
    } else {
      state.secondCard = element;
      state.moves += 1;
      state.locked = true;

      updateStats();
      if (state.firstCard.dataset.name === state.secondCard.dataset.name) {
        console.log("pair");
        state.pairs += 1;
        updateStats();
        state.firstCard.classList.add("matched");
        state.secondCard.classList.add("matched");
        state.firstCard = null;
        state.secondCard = null;
        state.locked = false;
        if (state.pairs === 8) {
          openModal();
          saveResult();
        }
      } else {
        state.timerId = setTimeout(() => {
          state.firstCard.classList.remove("open");
          state.secondCard.classList.remove("open");
          state.locked = false;
          state.firstCard = null;
          state.secondCard = null;
          state.timerId = null;
        }, 1000);
      }
    }
  });

  return element;
}
