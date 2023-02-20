const ROWS = 10;
const COLS = 10;
const MINES = 10;
const board = document.getElementById("board");
const grid = [];
let mineLocations = [];

function createBoard() {
  for (let row = 0; row < ROWS; row++) {
    const tr = document.createElement("tr");
    grid[row] = [];
    for (let col = 0; col < COLS; col++) {
      const td = document.createElement("td");
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        revealCell(row, col);
      });
      td.appendChild(button);
      tr.appendChild(td);
      grid[row][col] = { button, revealed: false, value: 0 };
    }
    board.appendChild(tr);
  }
}

function plantMines() {
  for (let i = 0; i < MINES; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * ROWS);
      col = Math.floor(Math.random() * COLS);
    } while (grid[row][col].value === "mine");
    grid[row][col].value = "mine";
    mineLocations.push([row, col]);
  }
}

function setNumbers() {
  for (let [row, col] of mineLocations) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          grid[r][c].value !== "mine"
        ) {
          grid[r][c].value += 1;
        }
      }
    }
  }
}

function revealCell(row, col) {
  const cell = grid[row][col];
  if (cell.revealed) {
    return;
  }
  cell.revealed = true;
  cell.button.disabled = true;
  if (cell.value === "mine") {
    gameOver();
  } else if (cell.value > 0) {
    cell.button.textContent = cell.value;
  } else {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          !grid[r][c].revealed
        ) {
          revealCell(r, c);
        }
      }
    }
  }
}

function
