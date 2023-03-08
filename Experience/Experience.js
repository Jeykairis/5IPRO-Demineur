
const plateau = [];

const composants =
{
    nbreLignes: 8,
    nbreCellules: 8,
    nbreMines: 10,
    nbreVictoire: 54
};


function facile()
{
    composants.nbreMines = 10;
    composants.nbreLignes = 8;
    composants.nbreCellules = 8;
    refreshInfos();
}

function moyen()
{
    composants.nbreMines = 15;
    composants.nbreLignes = 12;
    composants.nbreCellules = 12;
    refreshInfos();
}

function difficile()
{
    composants.nbreMines = 20;
    composants.nbreLignes = 15;
    composants.nbreCellules = 15;
    refreshInfos();
}

function refreshInfos()
{
    document.querySelector("#nbreMines").innerText = composants.nbreMines;
    document.querySelector("#nbreLignes").innerText = composants.nbreLignes;
    document.querySelector("#nbreCol").innerText = composants.nbreCellules;
}

function arcom()
{
    document.querySelector("#setup").style.visibility = "visible";
    document.querySelector("#arcom").style.visibility = "hidden";
    document.querySelector("#conclusion").innerText = "";
    document.querySelector("#paraminerestant").style.visibility = "hidden";
    //partieStatut = "Nouvel essai";
    document.querySelector("#table").innerHTML = "";
}

function creation()
{
    plateau.length = 0;
    document.querySelector("#setup").style.visibility = "hidden";
    document.querySelector("#arcom").style.visibility = "visible";
    document.querySelector("#paraminerestant").style.visibility = "visible";
    for (let i = 0; i < composants.nbreLignes; i++)
    {
        plateau[i] = [];
        for (let j = 0; j < composants.nbreCellules; j++)
        {
            plateau[i][j] =
            {
                mine: false,
                statut: "cachee",
                danger: 0,
                flag: false
            };
        }
    }
    composants.nbreVictoire = (composants.nbreLignes * composants.nbreCellules) - composants.nbreMines;
    document.querySelector("#nbreRestant").innerText = calculMine();
    minage();
    plateauHTML();
    revelation();
    console.log(plateau);
}

function minage()
{
    for (let i = 0; i < composants.nbreMines; i++)
    {
        placement();
    }
}

function placement()
{
    let nLigne = Math.floor(Math.random() * composants.nbreLignes);
    let nCellule = Math.floor(Math.random() * composants.nbreCellules);
    if (plateau[nLigne][nCellule].mine == true)
    {
        placement();
    }
    else
    {
        plateau[nLigne][nCellule].mine = true;
        numerotation(nLigne, nCellule);
        console.log(`nLigne: ${nLigne}, nCellule:${nCellule}`);
    }
}

function numerotation(nLigne, nCellule)
{
    incrementation(nLigne - 1, nCellule - 1);
    incrementation(nLigne - 1, nCellule);
    incrementation(nLigne - 1, nCellule + 1);
    incrementation(nLigne, nCellule - 1);
    incrementation(nLigne, nCellule + 1);
    incrementation(nLigne + 1, nCellule - 1);
    incrementation(nLigne + 1, nCellule);
    incrementation(nLigne + 1, nCellule + 1);
}

function incrementation(nLigne, nCellule)
{
    if (nLigne < 0 || nLigne == composants.nbreLignes || nCellule < 0 || nCellule == composants.nbreCellules)
    {
        return;
    }
    if (plateau[nLigne][nCellule].mine == true)
    {
        return;
    }
    else
    {
        plateau[nLigne][nCellule].danger++;
    }
}

function plateauHTML()
{
    let table = document.querySelector("#table");
    for (let i = 0; i < composants.nbreLignes; i++)
    {
        let nLigne = document.createElement("tr");
        for (let j = 0; j < composants.nbreCellules; j++)
        {
            let nCellule = document.createElement("td");
            nCellule.setAttribute("data-ligne", i);
            nCellule.setAttribute("data-cellule", j)
            nCellule.addEventListener("click", cliquage);
            nCellule.addEventListener("contextmenu", e =>
            {
                e.preventDefault();
                marquage();
            });
            nLigne.appendChild(nCellule);
        }
        table.appendChild(nLigne);
    }
}

function marquage()
{
    let nLigne = parseInt(event.target.getAttribute("data-ligne"));
    let nCellule = parseInt(event.target.getAttribute("data-cellule"));
    let celActuelle = event.target;
    console.log(celActuelle, nLigne, nCellule, plateau[nLigne][nCellule].flag);
    if (plateau[nLigne][nCellule].statut == "revelee")
    {
        return;
    }
    if (plateau[nLigne][nCellule].flag == false)
    {
        plateau[nLigne][nCellule].flag = true;
        celActuelle.style.backgroundColor = "green";
    }
    else
    {
        plateau[nLigne][nCellule].flag = false;
        celActuelle.style.backgroundColor = "grey";
    }
    document.querySelector("#nbreRestant").innerText = calculMine();
}

function cliquage(event)
{
    let nLigne = parseInt(event.target.getAttribute("data-ligne"));
    let nCellule = parseInt(event.target.getAttribute("data-cellule"));
    if (plateau[nLigne][nCellule].mine == true)
    {
        defaite();
    }
    else
    {
        contagion(nLigne, nCellule);
    }
}

function contagion(nLigne, nCellule)
{
    if (nLigne < 0 || nLigne == composants.nbreLignes || nCellule < 0 || nCellule == composants.nbreCellules)
    {
        return;
    }
    if (plateau[nLigne][nCellule].statut == "revelee")
    {
        return;
    }
    let celActuelle = document.querySelector(`[data-ligne="${nLigne}"][data-cellule="${nCellule}"]`);
    plateau[nLigne][nCellule].statut = "revelee";
    if (celActuelle.style.backgroundColor == "green")
    {
        plateau[nLigne][nCellule].flag = false;
        document.querySelector("#nbreRestant").innerText = calculMine();
        celActuelle.style.backgroundColor = "beige";
    }
    else
    {
        celActuelle.style.backgroundColor = "beige";
    }
    if (plateau[nLigne][nCellule].danger > 0)
    {
        celActuelle.innerText = plateau[nLigne][nCellule].danger;
    }
    else
    {
        contagion(nLigne - 1, nCellule - 1);
        contagion(nLigne - 1, nCellule);
        contagion(nLigne - 1, nCellule + 1);
        contagion(nLigne, nCellule - 1);
        contagion(nLigne, nCellule + 1);
        contagion(nLigne + 1, nCellule - 1);
        contagion(nLigne + 1, nCellule);
        contagion(nLigne + 1, nCellule + 1);
    }
    checkVictoire();
}

function calculMine()
{
    let compteur = 0;
    for (let i = 0; i < composants.nbreLignes; i++)
    {
        for (let j = 0; j < composants.nbreCellules; j++)
        {
            if (plateau[i][j].flag == true)
            {
                compteur++;
            }
        }
    }
    if (composants.nbreMines - compteur < 0)
    {
        return 0;
    }
    else
    {
        return (composants.nbreMines - compteur);
    }
}

function checkVictoire()
{
    composants.nbreVictoire--;
    console.log(`nbreVictoire = ${composants.nbreVictoire}`);
    if (composants.nbreVictoire == 0)
    {
        document.querySelector("#conclusion").innerText = "Victoire !";
        document.querySelector("#conclusion").style.visibility = "visible";
        revelation();
    }
}

function defaite()
{
    console.log("rip");
    document.querySelector("#conclusion").style.visibility = "visible";
    document.querySelector("#conclusion").innerText = "Epstein didn't kill himself !";
    revelation();
}



function revelation()
{
    for (let i = 0; i < composants.nbreLignes; i++)
    {
        for (let j = 0; j < composants.nbreCellules; j++)
        {
            if (plateau[i][j].mine == true)
            {
                let celActuelle = document.querySelector(`[data-ligne="${i}"][data-cellule="${j}"]`);
                celActuelle.style.backgroundColor = "red";
            }
        }
    }
}