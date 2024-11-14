import {initAddEventListenerModale, goAddPhoto, addNewProject, viewPhotoGallery, addImage,} from "./modale.js";
import { loginLogout } from "./login.js";

// Fonction pour créer une fiche projet
export function projectSheet(idProject, listProject) {
  for (const project of listProject) {
    if (idProject === project.id) {
      // Création d'une balise dédiée à un projet
      const figureProject = document.createElement("figure");
      // Création de la balide image
      const imgProject = document.createElement("img");
      // Création des attribus pour la balise image
      const urlImage = project.imageUrl;
      const altImage = project.title;
      imgProject.src = urlImage;
      imgProject.alt = altImage;
      // Création de la balise pour le nom du projet
      const titleProject = document.createElement("figcaption");
      titleProject.innerText = project.title;
      // Rattachement des balises à leur élément parent
      figureProject.appendChild(imgProject);
      figureProject.appendChild(titleProject);
      return figureProject;
    }
  }
}

// Fonction qui génére l'affichage des fiches projets
export async function generateProjects(idProjectCategory) {
  // Récupération de l'élément du DOM qui accueillera les projets
  const containerProjects = document.querySelector(".gallery");
  // Réinitialisation de la section
  containerProjects.innerHTML = "";
  // Récupération des projets depuis l'API
  try {
    await fetch("http://localhost:5678/api/works")
      .then((response) => {
        return response.json();
      })
      .then((listProject) => {
        // Création de toutes les fiches projets //
        if (idProjectCategory === undefined) {
          for (const project of listProject) {
            const myProject = projectSheet(project.id, listProject);
            containerProjects.appendChild(myProject);
          }
        } else {
          // Création des fiches projets en fonction de leur catégorie //
          for (const project of listProject) {
            if (idProjectCategory === project.categoryId) {
              const myProject = projectSheet(project.id, listProject);
              containerProjects.appendChild(myProject);
            }
          }
        }
      });
  } catch {
    // Gestion des erreurs
    console.log("Une erreur est survenue lors du chargement des travaux");
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("project-generation-error");
    errorMessage.innerText = "Une erreur est survenue lors du chargement des travaux";
    document.querySelector(".gallery-container").appendChild(errorMessage);
  }
}

// Fonction qui génère les filtres
function generateFilters() {
  // Récupération de l'élément du DOM qui accueillera les projets
  const portfolioSection = document.querySelector("#portfolio");
  // Récupération de l'élément du DOM avant lequel il faudra insérer les filtres
  const galleryContainer = document.querySelector(".gallery-container");

  // Creation du conteneur des filtres
  const filtersContainer = document.createElement("div");
  filtersContainer.classList.add("filters-container");

  // Récupération des catégories depuis l'API

  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((filters) => {
      //////////////// Création des boutons filtres /////////////////
      // Création du bouton filtres qui affiche tous les projets
      const btnAll = document.createElement("button");
      btnAll.innerText = "Tous";
      btnAll.classList.add("filter-btn");
      btnAll.id = "active-btn"

      btnAll.addEventListener("click", () => {
        filterBtnAppearance(btnAll)
        generateProjects();
      });
      filtersContainer.appendChild(btnAll);
      // Création des autres boutons
      for (const filter of filters) {
        const filterBtn = document.createElement("button");
        filterBtn.innerText = filter.name;
        filterBtn.classList.add("filter-btn");

        filterBtn.addEventListener("click", () => {
          filterBtnAppearance(filterBtn)
          generateProjects(filter.id);
        });
        filtersContainer.appendChild(filterBtn);
      }
      // Insertion des boutons filtre avant la div de class gallery
      portfolioSection.insertBefore(filtersContainer, galleryContainer);
    })
    .catch(() => {
      console.log("Une erreur est survenue lors du chargement des filtres");
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("filter-generation-filter");
      errorMessage.innerText = "Une erreur est survenue lors du chargement des filtres";
      filtersContainer.appendChild(errorMessage);
      portfolioSection.insertBefore(filtersContainer, galleryContainer);
    });
}

// Fonction qui gére l'affichage suivant le status de l'utilisateur
function checkConnection() {
  if (sessionStorage.getItem("authenticated") === "true") {
    generateProjects();
    administatorTools();
    initAddEventListenerModale();
    goAddPhoto();
    addNewProject();
    viewPhotoGallery();
    addImage();
  } else {
    generateFilters();
    generateProjects();
  }
  header();
  loginLogout();
}
checkConnection();

// Fonction qui génère l'affichage du mode edition et le bouton d'edition
function administatorTools() {
  //Création du bandeau 'mode édition'
  editionMode();
  //Création du bouton 'modifier'
  editionButton();
}

// Fonction permettant de créer le bandeau 'mode edition'
function editionMode() {
  // Sélection des élèment pour placer le bandeau 'mode edition'
  const body = document.querySelector("body");
  const afterElement = document.querySelector("header");
  // Création du bandeau 'mode edition'
  const editingMode = document.createElement("div");
  editingMode.classList.add("edition-mode-banner");
  const information = document.createElement("p");
  const iconInformation = document.createElement("i");
  iconInformation.classList.add("fa-regular");
  iconInformation.classList.add("fa-pen-to-square");
  information.innerText = "Mode édition";
  editingMode.appendChild(iconInformation);
  editingMode.appendChild(information);
  // Insertion du bandeau 'mode edition'
  body.insertBefore(editingMode, afterElement);
}

// Fonction permettant de créer le bouton 'modifier'
function editionButton() {
  // Sélection des élèment pour placer le bouton 'modifier'
  const porfolioEmplacement = document.getElementById("portfolio");
  const titleH2 = document.querySelector("#portfolio h2");
  // Création d'une division contenant le titre et le bouton 'modifier' pour les afficher en ligne
  // Création de la nouvelle division
  const editBtnContainer = document.createElement("div");
  editBtnContainer.classList.add("container-edit-btn");
  // Création du titre dans la div
  const h2Title = document.createElement("h2");
  h2Title.innerText = "Mes projets";
  editBtnContainer.appendChild(h2Title);
  // création du bouton 'modifier'
  const editButton = document.createElement("button");
  const iconEditBtn = document.createElement("i");
  iconEditBtn.classList.add("fa-regular");
  iconEditBtn.classList.add("fa-pen-to-square");
  editButton.classList.add("edit-btn");
  editButton.innerText = "modifier";
  editButton.appendChild(iconEditBtn);
  editBtnContainer.appendChild(editButton);
  // Insertion du titre et du bouton 'modifier'
  porfolioEmplacement.insertBefore(editBtnContainer, titleH2);
  // Suppression de l'ancien titre
  porfolioEmplacement.removeChild(titleH2);
}

// Fonction qui gère la position de l'en-tête
function header() {
  const newHeader = document.querySelector("header");
  if (sessionStorage.getItem("authenticated") === "true") {
    // On vérifie si header à la class 'header-edition-mode'
    if (!newHeader.classList.contains("header-edition-mode")) {
      newHeader.classList.add("header-edition-mode"); 
    }
  } else {
    if (newHeader.classList.contains("header-edition-mode")) {
      newHeader.classList.remove("header-edition-mode");
    }
  }
}

// Fonction qui gére l'apparence des boutons de filtrage 
function filterBtnAppearance(btnClicked) {
  // Récupération de tous les boutons
  const buttons = document.querySelectorAll(".filter-btn");
  // Réinitialisation de l'identifiant actif des boutons
  buttons.forEach(button => button.id = "");
  // Ajout de l'identifiant actif du bouto qui a été clické
  btnClicked.id = "active-btn";
}

