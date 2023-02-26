let mainTab = document.getElementById("mainTab");
let tab = [];
let listBomb = [];
let difficulty = "";
let size = 0;
let nbBombs = 0;

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
document.getElementById("smileyButton").addEventListener("click", () => {
  tabF(size);
  setTimeout(() => defineBomb(nbBombs, size), 50);
});
document.querySelectorAll(".level").forEach((button) =>
  button.addEventListener("click", (e) => {
    defineDifficulty(e);
  })
);
function defineDifficulty(e) {
  switch (e.target.innerHTML) {
    case "Easy":
      difficulty = "Easy";
      size = 9;
      nbBombs = 10;
      tabF(size);
      setTimeout(() => defineBomb(nbBombs, size), 50);
      break;
    case "Medium":
      difficulty = "Medium";
      size = 16;
      nbBombs = 40;
      tabF(size);
      setTimeout(() => defineBomb(nbBombs, size), 50);
      break;
    case "Hard":
      difficulty = "Hard";
      size = 21;
      nbBombs = 99;
      tabF(size);
      setTimeout(() => defineBomb(nbBombs, size), 50);
      break;
    case "Extreme":
      difficulty = "Extreme";
      size = 27;
      nbBombs = 150;
      tabF(size);
      setTimeout(() => defineBomb(nbBombs, size), 50);
      break;
  }
}
const tabF = (size) => {
  document.getElementById("smileyImage").src = "images/smileyHappy.png";
  document.getElementById("winText").innerHTML = "";
  document.getElementById("smileyButton").removeAttribute("hidden");
  tab = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    tab.push(row);
  }
  return tab;
};

function defineBomb(nbBombs, size) {
  listBomb = [];

  let i = 0;
  while (i < nbBombs) {
    let rowBomb = Math.floor(Math.random() * size);
    let colBomb = Math.floor(Math.random() * size);
    if (!(tab[rowBomb][colBomb] == "b")) {
      tab[rowBomb][colBomb] = "b";
      listBomb.push(tab[rowBomb][colBomb]);
      i++;
    }
  }
  createTab();
}
function createTab() {
  mainTab.innerHTML = "";
  for (let i = 0; i < tab.length; i++) {
    const row = document.createElement("tr");
    row.id = `${i}`;
    for (let j = 0; j < tab.length; j++) {
      const cell = document.createElement("td");
      const buttons = document.createElement("button");
      buttons.classList = "btn";
      buttons.id = `${i}-${j}`;
      buttons.dataset.rowIndex = i;
      buttons.dataset.colIndex = j;
      cell.appendChild(buttons);
      row.appendChild(cell);
    }
    mainTab.appendChild(row);
  }
  document.querySelectorAll(".btn").forEach((x) => {
    x.addEventListener("mousedown", clic);
  });
}
function clic(e) {
  const { rowIndex, colIndex } = e.target.dataset;
  const row = parseInt(rowIndex);
  const col = parseInt(colIndex);
  const num = tab[row][col];
  if (e.button == 0) {
    if (num === "b") {
      gameOver();
      e.target.style.backgroundImage = "url('images/boom.png')";
    } else {
      checkMines(row, col, e);
    }
  } else if (e.button == 2) {
    if (e.target.innerText == "") {
      e.target.innerText = "🚩";
      document.getElementById(row + "-" + col).classList.add("clicked");
    } else if (e.target.innerText == "🚩") {
      e.target.innerText = "?";
      document.getElementById(row + "-" + col).classList.remove("clicked");
    } else if (e.target.innerText == "?") {
      e.target.innerText = "";
    }
  }
  let nbClicked = document.querySelectorAll(".clicked");
  let nbFlag = 0;
  document
    .querySelectorAll(".clicked")
    .forEach((x) => (x.innerHTML.includes("🚩") ? nbFlag++ : null));
  if (nbClicked.length == size * size && nbFlag == 10) {
    document.getElementById("smileyImage").src = "images/smileyWin.png";
    document.querySelectorAll(".btn").forEach((x) => {
      x.removeEventListener("mousedown", clic);
    });
    document.getElementById("winText").innerHTML = "You win ! Nicely done";
  }
}
function checkMines(row, col, e) {
  if (row < 0 || col < 0 || row >= tab.length || col >= tab.length) {
    return;
  }

  if (document.getElementById(row + "-" + col).classList.contains("clicked")) {
    return;
  }
  document.getElementById(row + "-" + col).classList.add("clicked");
  document.getElementById(row + "-" + col).style.background = "lightgrey";

  let mine = 0;
  mine += checkTile(row - 1, col - 1);
  mine += checkTile(row - 1, col);
  mine += checkTile(row - 1, col + 1);
  mine += checkTile(row, col - 1);
  mine += checkTile(row, col + 1);
  mine += checkTile(row + 1, col - 1);
  mine += checkTile(row + 1, col);
  mine += checkTile(row + 1, col + 1);
  if (mine > 0) {
    document.getElementById(row + "-" + col).innerHTML = mine;
  } else {
    checkMines(row - 1, col - 1, e);
    checkMines(row - 1, col, e);
    checkMines(row - 1, col + 1, e);
    checkMines(row, col - 1, e);
    checkMines(row, col + 1, e);
    checkMines(row + 1, col - 1, e);
    checkMines(row + 1, col, e);
    checkMines(row + 1, col + 1, e);
  }
}
function checkTile(row, col) {
  if (row < 0 || col < 0 || row >= tab.length || col >= tab.length) {
    return 0;
  }
  if (tab[row][col] == "b") {
    return 1;
  }
  return 0;
}
function gameOver() {
  seeAllBombs();
  document.querySelectorAll(".btn").forEach((x) => {
    x.removeEventListener("mousedown", clic);
  });
}
function seeAllBombs() {
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (listBomb.includes(tab[i][j])) {
        document.getElementById(i + "-" + j).style.backgroundImage =
          "url('images/boom.png')";
      }
    }
  }
  document.getElementById("smileyImage").src = "images/smileyDead.png";
}
