const zoneSaisie = document.getElementById("saisie-tache");

let boutonsAjouter = document.getElementsByClassName("icone-ajout");
let boutonsRetirer = document.getElementsByClassName("icone-trash");

let listeAFaire = document.getElementById("liste-afaire");
let listeFaites = document.getElementById("liste-fait");

let count = 0;

zoneSaisie.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        ajouterTache();
    }
});

for (let i = 0; i < boutonsAjouter.length; i++) {
    const bouton = boutonsAjouter[i];
    bouton.addEventListener('click', ajouterTache);
}

for (let i = 0; i < boutonsRetirer.length; i++) {
    const bouton = boutonsRetirer[i];
    bouton.addEventListener('click', viderTaches);
}

// Charger les tâches au démarrage
window.addEventListener("load", chargerTaches);



function ajouterTache() {
    let texteTache = zoneSaisie.value.trim();
    if (texteTache.length < 1) {
        console.log("Description vide");
        return;
    }

    count++;
    let tache = document.createElement('li');
    tache.innerText = texteTache;
    tache.classList.add("tache");

    const handleClick = (e) => {
        completerTache(e.target, handleClick);
    };

    tache.addEventListener('click', handleClick);
    listeAFaire.appendChild(tache);

    zoneSaisie.value = "";

    // Sauvegarde dans le stockage
    sauvegarderTaches();
}


function completerTache(tache, handleClick) {
    tache.removeEventListener('click', handleClick);
    tache.classList.add("fait");
    listeFaites.appendChild(tache);
    console.log("Tâche complétée !");
    sauvegarderTaches();
}


function viderTaches() {
    listeFaites.innerHTML = "";
    console.log("Liste de tâches faites vidée !");
    sauvegarderTaches();
}


function sauvegarderTaches() {
    // Sauvegarde les listes sous forme de texte simple
    localStorage.setItem("listeAFaire", listeAFaire.innerHTML);
    localStorage.setItem("listeFaites", listeFaites.innerHTML);
}


function chargerTaches() {
    // Vérifie si des données existent
    if (localStorage.getItem("listeAFaire") !== null) {
        listeAFaire.innerHTML = localStorage.getItem("listeAFaire");
    }
    if (localStorage.getItem("listeFaites") !== null) {
        listeFaites.innerHTML = localStorage.getItem("listeFaites");
    }

    listeAFaire.querySelectorAll("li").forEach(tache => {
        const handleClick = (e) => {
            completerTache(e.target, handleClick);
        };
        tache.addEventListener('click', handleClick);
    });

    console.log("Tâches rechargées depuis le stockage local !");
}
