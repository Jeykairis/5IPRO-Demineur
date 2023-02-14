let btns = document.querySelectorAll(".btn");
let listBomb = [];

document
  .querySelectorAll("#level")
  .forEach((x) => x.addEventListener("click", async (e) => {
    await defineTab(e);
    defineBomb(e)
  }));
function defineTab(e){
  return 0
}
function defineBomb(e) {
    let nbBomb = 0;
  if (document.querySelector("#level")) {
    switch (e.target.innerHTML) {
      case "Easy":
        nbBomb = 5;
        break;
      case "Middle":
        nbBomb = 10;
        break;
      case "Hard":
        nbBomb = 15;
        break;
      case "Extreme":
        nbBomb = 20;
        break;
        
    }
  }
    while (listBomb.length < parseInt(nbBomb)) {
      let newBomb = Math.floor(Math.random() * nbBomb);
      if (listBomb.includes(btns[newBomb]) == false) {
        listBomb.push(btns[newBomb]);
        console.log(listBomb);
      }
    }
  }
