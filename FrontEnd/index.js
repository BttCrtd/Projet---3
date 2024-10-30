import {initAddEventListenerModale, addPhoto, addNewProject, viewPhotoGallery, addImage} from "./modale.js"
import {loginLogout} from "./login.js"

// Fonction pour créer une fiche projet 
export function FicheProjet (idProject, Listeprojets) {
    for(const projet of Listeprojets){
        if (idProject === projet.id){
            // Création d'une balise dédiée à un projet
            const figureProjet = document.createElement("figure");
            // Création de la balide image 
            const imgProjet = document.createElement("img");
            // Création des attribus pour la balise image
            const urlImage = projet.imageUrl;
            const altImage = projet.title;
            imgProjet.src = urlImage;
            imgProjet.alt = altImage;
            // Création de la balise pour le nom du projet
            const titleProject = document.createElement("figcaption");
            titleProject.innerText = projet.title;
            // Rattachement des balises à leur élément parent	
            figureProjet.appendChild(imgProjet);
            figureProjet.appendChild(titleProject);
            return (figureProjet)
        }
    } 
}

// Fonction qui génére l'affichage des fiches projets 
export async function genererProjet(identifiantProjet) {
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionProjet = document.querySelector(".gallery");
    // Réinitialisation de la section 
    sectionProjet.innerHTML = "";
    // Récupération des projets depuis l'API
    try {
        await fetch("http://localhost:5678/api/works")
        .then((response) => {
            return response.json();
        }).then((Listeprojets) => {
            console.log(Listeprojets);
            // Création de toutes les fiches projets //
            if(identifiantProjet === undefined){
                for(const projet of Listeprojets){
                    const mesProjets = FicheProjet(projet.id, Listeprojets)
                    sectionProjet.appendChild(mesProjets);
                }
            } else {
            // Création des fiches projets en fonction de leur catégorie //
                for(const projet of Listeprojets){
                    if(identifiantProjet === projet.categoryId ){
                        const mesprojets = FicheProjet(projet.id, Listeprojets)
                        sectionProjet.appendChild(mesprojets);
                    }	
                }
            }
        })   
    } catch {
        // Gestion des erreurs
        console.log("Une erreur est survenue lors du chargement des travaux")
        const errorMessage = document.createElement("p")
        errorMessage.classList.add("error-generer-projet")
        errorMessage.innerText = "Une erreur est survenue lors du chargement des travaux"
        document.querySelector('.gallery-contener').appendChild(errorMessage)
    }
}

// Fonction qui génère les filtres 
function genererFiltres(){
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionPortfolio = document.querySelector("#portfolio")
    // Récupération de l'élément du DOM avant lequel il faudra insérer les filtres
    const div = document.querySelector(".gallery-contener")

    // Creation du conteneur des filtres
    const filtreContener = document.createElement("div")
    filtreContener.classList.add("filters-contener")

    // Récupération des catégories depuis l'API
    
    fetch("http://localhost:5678/api/categories")
    .then((response) => {
        return response.json();
    }).then((filtres) => {
        console.log(filtres);
        //////////////// Création des boutons filtres /////////////////
        // Création du bouton filtres qui affiche tous les projets
        const btnAll = document.createElement("button")
        btnAll.innerText = "Tous"
        btnAll.classList.add("btn-tous")
        
        btnAll.addEventListener("click", () => {
            genererProjet()
        })
        filtreContener.appendChild(btnAll)
        // Création des autres boutons
        for (const filtre of filtres){
            const btnFiltre = document.createElement("button");
            btnFiltre.innerText = filtre.name;
            btnFiltre.classList.add("other-btn")
            
            btnFiltre.addEventListener("click", () => {
                genererProjet(filtre.id)
            })	
            filtreContener.appendChild(btnFiltre);
        }
        // Insertion des boutons filtre avant la div de class gallery
        sectionPortfolio.insertBefore(filtreContener, div);
    })
    .catch (() => {
        console.log("Une erreur est survenue lors du chargement des filtres")
        const errorMessage = document.createElement("p")
        errorMessage.classList.add("error-generer-projet")
        errorMessage.innerText = "Une erreur est survenue lors du chargement des filtres"
        filtreContener.appendChild(errorMessage)
        sectionPortfolio.insertBefore(filtreContener, div);
    })
}
    



// Fonction qui gére l'affichage suisvant le status de l'utilisateur
function checkConnection(){
    if (sessionStorage.getItem('authenticated') === 'true'){
        console.log('Je suis bien connecter')        
        genererProjet()
        administatorTools()
        initAddEventListenerModale()
        addPhoto()
        addNewProject()
        viewPhotoGallery()
        addImage()
    } else {
        console.log('Je suis pas connecter')
        genererFiltres()
        genererProjet()
    }
    header()
    loginLogout()
}
checkConnection()

// Fonction qui génère l'affichage du mode edition et le bouton d'edition
function administatorTools(){
    //Création du bandeau 'mode édition'
    editionMode()
    //Création du bouton 'modifier' 
    editionButton()
}

// Fonction permettant de créer le bandeau 'mode edition'
function editionMode(){
    // Sélection des élèment pour placer le bandeau 'mode edition'
    const body = document.querySelector("body")
    const afterElement = document.querySelector("header")
    // Création du bandeau 'mode edition'
    const editingMode = document.createElement("div")
    editingMode.classList.add("editing-section")
    const info = document.createElement("p")
    const iconInfo = document.createElement("i")
    iconInfo.classList.add("fa-regular")
    iconInfo.classList.add("fa-pen-to-square")
    info.innerText = "Mode édition"
    editingMode.appendChild(iconInfo);
    editingMode.appendChild(info)
    // Insertion du bandeau 'mode edition'
    body.insertBefore(editingMode, afterElement)
}

// Fonction permettant de créer le bouton 'modifier'
function editionButton(){
    // Sélection des élèment pour placer le bouton 'modifier'
    const porfolioEmplacement = document.getElementById("portfolio")
    const titleH2 = document.querySelector("#portfolio h2")
    // Création d'une division contenant le titre et le bouton 'modifier' pour les afficher en ligne
    // Création de la nouvelle division
    const nvldiv = document.createElement("div")
    nvldiv.classList.add("edit-new-project")
    // Création du titre dans la div
    const h2 = document.createElement("h2")
    h2.innerText = "Mes projets"
    nvldiv.appendChild(h2)
    // création du bouton 'modifier'
    const editButton = document.createElement("button")
    const iconEditBtn = document.createElement("i")
    iconEditBtn.classList.add("fa-regular")
    iconEditBtn.classList.add("fa-pen-to-square")
    editButton.classList.add("edit-btn")
    editButton.innerText ="modifier"
    editButton.appendChild(iconEditBtn)
    nvldiv.appendChild(editButton)
    // Insertion du titre et du bouton 'modifier'
    porfolioEmplacement.insertBefore(nvldiv, titleH2)
    // Suppression de l'ancien titre
    porfolioEmplacement.removeChild(titleH2)
}

function header(){
    const newHeader = document.querySelector('header')
    if (sessionStorage.getItem('authenticated') === 'true') {
        if (!newHeader.classList.contains('header-edition-mode')) {
            newHeader.classList.add('header-edition-mode'); // Ajoute seulement si la classe n'est pas présente
        }
    } else if (newHeader.classList.contains('header-edition-mode')) {
        newHeader.classList.remove('header-edition-mode'); // Retire seulement si la classe est présente
    }
}