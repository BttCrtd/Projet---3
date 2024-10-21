///////////////////////////////////// Fonction pour générer une fiche projet /////////////////////////////////////
function FicheProjet (nomProjet, Listeprojets) {
    for(const projet of Listeprojets){
        if (nomProjet === projet.title){
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
            const nomProjet = document.createElement("figcaption");
            nomProjet.innerText = projet.title;
            // Rattachement des balises à leur élément parent	
            figureProjet.appendChild(imgProjet);
            figureProjet.appendChild(nomProjet);
            return (figureProjet)
        }
    } 
}

///////////////////////////////////// Fonction qui génére les fiches projets /////////////////////////////////////
function genererProjet(identifiantProjet) {
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionProjet = document.querySelector(".gallery");
    // Réinitialisation de la section 
    sectionProjet.innerHTML = "";
    // Récupération des projets depuis l'API
    fetch("http://localhost:5678/api/works")
    .then((response) => {
        return response.json();
    }).then((Listeprojets) => {
        console.log(Listeprojets);
        // Création de toutes les fiches projets //
        if(identifiantProjet === undefined){
            for(const projet of Listeprojets){
                const mesProjets = FicheProjet(projet.title, Listeprojets)
                sectionProjet.appendChild(mesProjets);
            }
        } else {
        // Création des fiches projets en fonction de leur catégorie //
            for(const projet of Listeprojets){
                if(identifiantProjet === projet.categoryId ){
                    const mesprojets = FicheProjet(projet.title, Listeprojets)
                    sectionProjet.appendChild(mesprojets);
                }	
            }
        }
    })
}

///////////////////////////////////// Fonction qui génére les boutons /////////////////////////////////////
function genererFiltres(){
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionPortfolio = document.querySelector("#portfolio")
    // Récupération de l'élément du DOM avant lequel il faudra insérer les filtres
    const div = document.querySelector(".gallery")

    // Creation du conteneur des filtres
    const filtreContener = document.createElement("div")
    filtreContener.classList.add("filters-contener")

    // Création des boutons filtres
    const btnFiltre = document.createElement("button")
    // Création du bouton filtres qui affiche tous les projets
    btnFiltre.innerText = "Tous"
    btnFiltre.classList.add("btn-tous")
    
    btnFiltre.addEventListener("click", () => {
        genererProjet()
    })

    // Insertion du filtre à son élément parent
    filtreContener.appendChild(btnFiltre)

    // Récupération des catégories depuis l'API
    fetch("http://localhost:5678/api/categories")
    .then((response) => {
        return response.json();
    }).then((filtres) => {
        console.log(filtres);
        for (const filtre of filtres){
            // Création des boutons filtres
            const btnFiltre = document.createElement("button");
            btnFiltre.innerText = filtre.name;
            btnFiltre.classList.add("other-btn")
            
            btnFiltre.addEventListener("click", () => {
                genererProjet(filtre.id)
            })
            // Rattachement des boutons à leur élément parent	
            filtreContener.appendChild(btnFiltre);
        }
    })
    // Insertion des boutons filtre avant la div de class gallery
    sectionPortfolio.insertBefore(filtreContener, div);
}


function SuisJeConnecter(){
    if (localStorage.getItem('authenticated') === 'true'){
        console.log('Je suis bien connecter')
        administatorTools()
    } else {
        console.log('Je suis pas connecter')
    }
}

function administatorTools (){
    const body = document.querySelector("body")
    const afterElement = document.querySelector("header")
    const editingMode = document.createElement("div")
    editingMode.classList.add("editing-section")
    const info = document.createElement("p")
    const iconInfo = document.createElement("i")
    iconInfo.classList.add("fa-regular")
    iconInfo.classList.add("fa-pen-to-square")
    info.innerText = "Mode édition"
    editingMode.appendChild(iconInfo);
    editingMode.appendChild(info)

    body.insertBefore(editingMode, afterElement)
}

// Appel aux fonctions
genererFiltres()
genererProjet()
SuisJeConnecter()












