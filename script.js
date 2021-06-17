const winsText = document.querySelector(".wins span");
const lossesText = document.querySelector(".losses span");
const drawsText = document.querySelector(".draws span");
const gameStatus = document.querySelector(".gameStatus");
const restartGameButton = document.querySelector(".reset");

let winRatio = 0;
let loseRatio = 0;
let drawRatio = 0;

moves = 0;

const winningMoves = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

let availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let allChoices = [];
let playerChoices = [];
let aiChoices = [];

winsText.innerText = winRatio;
lossesText.innerText = loseRatio;
drawsText.innerText = drawRatio;

const pickPersonChoice = (e) => {
  const target = e.target;
  if (!target.classList.contains("chosen")) {
    const oneB = e.target.id;
    const thisElement = document.getElementById(`${oneB}`);
    const circle = document.createElement("div");
    circle.classList.add("playerChoose");
    circle.classList.add("chosen");
    thisElement.appendChild(circle);
    let singlePick = e.target.dataset.option;
    allChoices.push(Number(singlePick));
    playerChoices.push(Number(singlePick));
    aiChoice();
    checkPlayer();
    checkAi();
  } else {
    return;
  }
};

const aiChoice = () => {
  const pickedNumber = availableNumbers.filter(
    (ev) => !allChoices.includes(ev)
  );
  if (aiChoices.length !== 4) {
    const index = Math.floor(Math.random() * pickedNumber.length);
    const element = document.getElementById(`${pickedNumber[index]}`);
    const cross = document.createElement("div");
    cross.classList.add("aiChoose");
    cross.classList.add("chosen");
    cross.innerText = "X";
    element.appendChild(cross);
    let singlePick = element.dataset.option;
    allChoices.push(Number(singlePick));
    aiChoices.push(Number(singlePick));
  } else if (allChoices.length === 9) {
    addScore("draw");
    drawsText.innerText = drawRatio;
    gameStatus.classList.add("finish");
    gameStatus.textContent = "Remis!";
    gameStatus.style.backgroundColor = "rgba(216, 216, 25, 0.4)";
  }
};

const addScore = (type) => {
  if (type === "up") {
    winRatio = winRatio + 1;
  } else if (type === "lose") {
    loseRatio = loseRatio + 1;
  } else if (type === "draw") {
    drawRatio = drawRatio + 1;
  }
};

const checkAi = () => {
  for (i = 0; i < winningMoves.length; i++) {
    let winAi = winningMoves[i].filter((ev) => aiChoices.includes(ev));
    if (winAi.length === 3) {
      addScore("lose");
      lossesText.innerText = loseRatio;
      gameStatus.classList.add("finish");
      gameStatus.textContent = "Przegrałeś!";
      gameStatus.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
    }
  }
};

const checkPlayer = () => {
  for (i = 0; i < winningMoves.length; i++) {
    let winPlayer = winningMoves[i].filter((ev) => playerChoices.includes(ev));
    if (winPlayer.length === 3) {
      addScore("up");
      winsText.innerText = winRatio;
      if (drawRatio !== 0) {
        drawRatio = drawRatio - 1;
      }

      drawsText.innerText = drawRatio;
      gameStatus.classList.add("finish");
      gameStatus.textContent = "Wygrałeś!";
      gameStatus.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
    }
  }
};

const restartGame = () => {
  gameStatus.classList.remove("finish");
  playerChoices = [];
  aiChoices = [];
  allChoices = [];
  document.querySelectorAll(".playerChoose").forEach((el) => el.remove());
  document.querySelectorAll(".aiChoose").forEach((el) => el.remove());
};

document
  .querySelectorAll(".gameBtn")
  .forEach((el) => el.addEventListener("click", pickPersonChoice));

restartGameButton.addEventListener("click", restartGame);
