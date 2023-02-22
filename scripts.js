let mainTab = document.getElementById("mainTab");
let tab = [];

document.querySelectorAll(".level").forEach((button) =>
  button.addEventListener("click", (e) => {
    defineDifficulty(e);
  })
);
function defineDifficulty(e) {
  switch (e.target.innerHTML) {
    case "Easy":
      tabF(4);
      setTimeout(() => defineBomb(5, 4), 50);
      break;
    case "Medium":
      tabF(15);
      setTimeout(() => defineBomb(10, 15), 50);
      break;
    case "Hard":
      tabF(30);
      setTimeout(() => defineBomb(100, 30), 50);
      break;
    case "Extreme":
      tabF(60);
       setTimeout(() => defineBomb(1000, 60), 50);
      break;
  }
}
const tabF = (size) => {
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    tab.push(row);
  }
  console.log(tab);
  return tab;
};

function defineBomb(nbBombs, size) {
  console.log(tab);
  let i = 0;
  let listBomb = [];
  while (i < nbBombs) {
    let rowBomb = Math.floor(Math.random() * size);
    let colBomb = Math.floor(Math.random() * size);
    if (!(tab[rowBomb][colBomb] == "b")) {
      tab[rowBomb][colBomb] = "b";
      listBomb.push(tab[rowBomb][colBomb]);
      i++;
    }
  }
  checkNbBomb(tab);
}

function checkNbBomb(tab) {
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      try {
        if (tab[i][j] == "b") {
          tab[i - 1][j] != "b" && typeof tab[i - 1][j] === "number"
            ? tab[i - 1][j]++
            : null;
          tab[i - 1][j - 1] != "b" && typeof tab[i - 1][j - 1] === "number"
            ? tab[i - 1][j - 1]++
            : null;
          tab[i - 1][j + 1] != "b" && typeof tab[i - 1][j + 1] === "number"
            ? tab[i - 1][j + 1]++
            : null;
          tab[i][j - 1] != "b" && typeof tab[i][j - 1] === "number"
            ? tab[i][j - 1]++
            : null;
          tab[i][j + 1] != "b" && typeof tab[i][j + 1] === "number"
            ? tab[i][j + 1]++
            : null;
          tab[i + 1][j - 1] != "b" && typeof tab[i + 1][j - 1] === "number"
            ? tab[i + 1][j - 1]++
            : null;
          tab[i + 1][j] != "b" && typeof tab[i + 1][j] === "number"
            ? tab[i + 1][j]++
            : null;
          tab[i + 1][j + 1] != "b" && typeof tab[i + 1][j + 1] === "number"
            ? tab[i + 1][j + 1]++
            : null;
        }
      } catch (TypeError) {
        continue;
      }
    }
  }
  createTab(tab);
}

function createTab(tab) {
  for (let i = 0; i < tab.length; i++) {
    const row = document.createElement("tr");
    row.id = `${i}`;
    for (let j = 0; j < tab.length; j++) {
      const cell = document.createElement("td");
      const buttons = document.createElement("button");
      buttons.classList = "btn";
      buttons.id = `[${i}][${j}]`;
      buttons.dataset.rowIndex = i;
      buttons.dataset.colIndex = j;
      cell.appendChild(buttons);
      row.appendChild(cell);
    }
    mainTab.appendChild(row);
  }
  document.querySelectorAll(".btn").forEach(x => {
    x.addEventListener("mousedown", clic)
  });
  console.table(tab);
}

function clic(e) {
  const { rowIndex, colIndex } = e.target.dataset;
  const row = parseInt(rowIndex)
  const col = parseInt(colIndex)
  const num = tab[row][col]
  if (e.button == 0) {
      if (num === "b") {
    console.log("boom!")
    e.target.style.backgroundImage = "url('images/boom.png')"
      }
      else {
          e.target.style.background = "transparent"
          if (num > 0) {
            e.target.innerHTML = num
          }
          else {
            checkAround(row, col)
          }
      }
  }
  
  else if (e.button == 1) {

  };
};

/*          tab[i-1][j-1]++;
          tab[i-1][j+1]++;
          tab[i+1][j-1]++;
          tab[i+1][j]++;
          tab[i+1][j+1]++;
let listBomb = [];
let mainTab = document.getElementById("mainTab");

document.querySelectorAll("#level").forEach((x) =>
  x.addEventListener("click", (e) => {
    defineTab(e);
  })
);

function defineTab(e) {
  switch (e.target.innerHTML) {
    case "Easy":
      createTab(4, 4);
      break;
    case "Medium":
      createTab(15, 15);
      break;
    case "Hard":
      createTab(30, 30);
      break;
    case "Extreme":
      createTab(60, 60);
      break;
  }
  function createTab(numberRows, numberColumns) {
    mainTab.innerHTML = "";
    for (let i = 0; i < numberRows; i++) {
      const row = document.createElement("tr");
      row.id = `${i}`;
      for (let j = 0; j < numberColumns; j++) {
        const cell = document.createElement("td");
        const buttons = document.createElement("button");
        buttons.classList = "btn";
        buttons.id = `${j}`;
        buttons.textContent = `${j}`
        cell.appendChild(buttons);
        row.appendChild(cell);
      }
      mainTab.appendChild(row);
    }
    return 0;
  }      
  document
    .querySelectorAll(".btn")
       .forEach((x) =>
         x.addEventListener("click", load)
  );
}
function load(e) {
  defineBomb(e);
  document.querySelectorAll(".btn").forEach((x)=> x.removeEventListener("click", load))
}
function defineBomb(e) {
  let nbBomb = 0;
  switch (mainTab.rows.length) {
    case 4:
      nbBomb = 4;
      break;
    case 15:
      nbBomb = 16;
      break;
    case 30:
      nbBomb = 164;
      break;
    case 60:
      nbBomb = 1200;
      break;
      
  }
  while (listBomb.length < nbBomb) {
    let btns = document.querySelectorAll(".btn");
    let newBomb = Math.floor(Math.random() * btns.length);
    if (listBomb.includes(btns[newBomb]) == false && e.target != btns[newBomb]) {
      listBomb.push(btns[newBomb]);
      btns[newBomb].innerHTML = "B"
      console.log(listBomb);
    }
  }
  clic(e)
  document.querySelectorAll(".btn").forEach(x => {
    x.addEventListener("mousedown", clic)
  });
}

function clic(e) {
  if (e.button == 0) {
      if (listBomb.includes(e.target)) {
    console.log("boom!")
    e.target.style.backgroundImage = "url('images/boom.png')"
      }
      else {
          e.target.style.background = "transparent"
          let checkRow = e.target.parentNode.parentNode.id
          let checkCell = e.target.id
          console.log(checkRow, checkCell);
          checkAround(checkRow, checkCell)
      }
  }
  else if (e.button == 1) {

  };
};

function checkAround(checkRow, checkCell){
  console.log(mainTab.length);
  for (let i = 0; i < mainTab.length; i++) {
    for (let j = 0; i < mainTab.length; j++) {

      if (mainTab[i][j] === "B") {
        mainTab[i-1][j]++
        console.log("zizi")
      }
    }
  }
  console.log(mainTab[0][2])
  console.log(mainTab.rows.length)
  console.log(mainTab.rows[0].cells.length);
  }
  /*if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)-10))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)-10)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)-9))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)-9)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)-1))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)-1)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)+1))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)+1)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)+9))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)+9)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)+10))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)+10)).style.background = "transparent";
      } if (!listBomb.includes(Array.from(btns).find(btn => btn.id == parseInt(e.target.id)+11))) {
        Array.from(btns).find(btn => btn.id == parseInt((e.target.id)+11)).style.background = "transparent";
      }
}*/
