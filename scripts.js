let btns = document.querySelectorAll(".btn");
let listBomb = [];
document.getElementById("validBomb").addEventListener("click", defineBomb);
function defineBomb() {
  let nbBomb = parseInt(document.querySelector("#nbBomb").value);
  if (nbBomb > 9 || nbBomb < 1) {
    alert("NTM")
  } else {
    while (listBomb.length < parseInt(nbBomb)) {
      let newBomb = Math.floor(Math.random() * nbBomb);
      console.log(Math.floor(Math.random() * nbBomb));
      if (listBomb.includes(btns[newBomb]) == false) {
        listBomb.push(btns[newBomb]);
        console.log(listBomb);
      }
    }
  }
}
