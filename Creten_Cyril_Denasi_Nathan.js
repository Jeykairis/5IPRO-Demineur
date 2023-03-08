
// Déclaration de la variable qui autorise ou non le cliquage sur le plateau
let partieStatut = false;

// Déclaration de l'array 2d 'plateau' dans laquelle on va stocker les objets de nos cases
const plateau = [];

// Déclaration des composants du plateau qui seront souvent référencés dans le reste du code
const composants =
{
    nbreLignes: 8,
    nbreCellules: 8,
    nbreMines: 10,
    nbreVictoire: 54
};

// 3 Fonctions de réglage de difficulté, une pour chaque bouton
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

// Fonction pour rafraîchir les données affichées à l'écran d'accueil
// À enclencher à la fin de chaque bouton de difficulté
function refreshInfos()
{
    document.querySelector("#nbreMines").innerText = composants.nbreMines;
    document.querySelector("#nbreLignes").innerText = composants.nbreLignes;
    document.querySelector("#nbreCol").innerText = composants.nbreCellules;
}

// Fonction de retour à l'écran d'accueil
function arcom()
{
    document.querySelector("#setup").style.visibility = "visible";
    document.querySelector("#arcom").style.visibility = "hidden";
    document.querySelector("#conclusion").innerText = "";
    document.querySelector("#paraminerestant").style.visibility = "hidden";
    document.querySelector("#table").innerHTML = "";
}

// Fonction mère
// Crée le plateau sous forme d'array 2d composé d'objets dans lesquels sont stockés les infos de chaque case
// Switch l'état de partie à 'true' ce qui autorise le clic gauche et droit sur la table HTML
// Étage creation(): 1
function creation()
{
    plateau.length = 0;
    partieStatut = true;
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
    //revelation();             à dé-commenter pour afficher les mines dès le départ (dev tool)
    console.log(plateau);
}

// Première fonction enfant appelée lors de l'enclenchement de sa fonction parente 'creation'
// Lance la fonction de placement de mine sur le plateau fraîchement créé, autant de fois qu'il y a de mines au total
// Étage creation(): 1.1
function minage()
{
    for (let i = 0; i < composants.nbreMines; i++)
    {
        placement();
    }
}

// Fonction de placement individuel de mine selon des coordonnées aléatoires
// La fonction est récursive pour si jamais les coordonnées générées sont déjà en présence de mine
// Une fois l'emplacement trouvé, la fonction lance la fonction de numérotation
// Étage creation(): 1.1.1
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

// Fonction de numérotation
// pour chaque case entourant la case ciblée qui soit dans les confins de l'array 2d plateau, on lance la fonction d'incrémentation de danger
// Étage creation(): 1.1.1.1
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

// Fonction d'incrémentation de la propriété 'danger' de l'objet correspondant aux coordonnées dans l'array 2d plateau
// C'est ce chiffre qui sera imprimé dans les cases 'td' da la table html
// Étage creation(): 1.1.1.1.1
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

// Fonction de création de la table HTML
// Deuxième fonction enfant appelée lors de l'enclenchement de sa fonction parente 'creation'
// Pour chaque 'td' créé, on lui ajoute 2 attributs de coordonnée + 2 eventListeners pour les clics gauche et droit
// La method '.preventDefault()' permet de nous débarrasser du menu contextuel qui apparaît lorsqu'on fait un clic droit
// Injection de cette cellule 'td' dans une ligne 'tr' qui à son tour sera injectée dans la balise 'table' présente dans l'HTML
// Étage creation(): 1.2
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

// Fonction mère
// Fonction de marquage de cases suspectes à l'aide du clic droit qui les repeindra en vert (ou gris)
// Uniquement applicable sur des objets correspondants de l'array 2d plateau qui soient encore non révélées
// Leur switch la propriété 'flag'
// Une fonction sera appelée à la fin pour calculer le nombre théorique de mines restantes à repérer
// Étage marquage(): 1
function marquage()
{
    if (partieStatut)
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
}

// Fonction mère
// Fonction qui sera exécutée lors du clic gauche sur une case de la table HTML
// Si l'homologue de l'array 2d plateau comporte la propriété 'mine == true', la fonction defaite() est lancée
// Sinon la fonction 'contagion()' est lancée
// Étage cliquage(): 1
function cliquage(event)
{
    if (partieStatut)
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
}

// Fonction récursive gérant les cases "safe"
// Après avoir confirmé que l'objet sur lequel fait effet cette fonction existe bien dans les confins de l'array 2d plateau,
// La fonction révèle la valeur de la propriété danger
// Si celui-ci est de 0, cela signifie que la case est vide et n'est pas non plus une bordure de mine,
// Et donc que cette même fonction se propagera dans toutes les cases entourant la position de l'objet
// En conclusion, la fonction 'checkVictoire()' est appelée pour compter le nombre de cases "safe" restantes à cliquer pour gagner
// Étage cliquage(): 1.1
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
    }
    celActuelle.style.backgroundColor = "beige";
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

// Fonction de calcul théorique de mines restantes dont la valeur sortante est imprimée dans le 'p: <p id="paraminerestant">'
// Elle passe en revue l'array 2d tableau en quête d'objets dont la propriété 'flag == true' et en calcule la récurence dans un compteur
// La différence entre le nombre total réel de mines et ce compteur est alors renvoyée comme valeur sortante
// Dans le cas où cette valeur serait négative, la valeur renvoyée est alors '0'
// Étage marquage(): 1.1
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

// La fonction pour checker si le joueur remporte la partie
// Lancée en conclusion de la fonction 'contagion()'
// Chaque objet ayant sa propriété 'statut == "revelee"' diminue de 1 un compteur (initialement déclaré ayant comme valeur nbreLignes * nbreCellules - nbreMines)
// Une fois ce compteur réduit à 0, lance la fonction de révélation des mines sur le terrain et switch l'état de la partie à 'false', ce qui nullifie les clics sur la table HTML
// Étage cliquage() 1.1.1
function checkVictoire()
{
    composants.nbreVictoire--;
    //console.log(`nbreVictoire = ${composants.nbreVictoire}`);
    if (composants.nbreVictoire == 0)
    {
        document.querySelector("#conclusion").innerText = "Victoire !";
        document.querySelector("#conclusion").style.visibility = "visible";
        revelation();
        partieStatut = false;
    }
}

// Fonction lancée lorsque le joueur clique sur une case dotée de la propriété 'mine == true' de l'objet de l'array 2d correspondant aux coordonnées
// Switch l'état de la partie à 'false' ce qui nullifie le clics sur la table HTML
// Lance la fonction qui révèle la position des mines
// Étage cliquage() 1.1
function defaite()
{
    console.log("rip");
    document.querySelector("#conclusion").style.visibility = "visible";
    document.querySelector("#conclusion").innerText = "Epstein didn't kill himself !";
    revelation();
    partieStatut = false;
}

// Fonction de révélation de position des mines sur la table HTML
// Appelée soit lors de la victoire/défaite, soit à la fin de l'initialisation de la table HTML en temps qu'outil de dev
// Elle repeint les cases correspondantes aux coordonnées de l'array 2d en rouge
// Étages multiples
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