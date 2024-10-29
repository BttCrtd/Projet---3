import {FicheProjet, genererProjet} from "./index.js"

// Fonction permettant d'ouvrir la modale
function modalDisplay(){
    const modalePopup = document.querySelector('.modale')
    modalePopup.classList.add("active")
}

// Fonction permettant de fermer la modale 
function modalHide(){
    // Fermeture de la modale
    const modalePopup = document.querySelector('.modale')
    modalePopup.classList.remove("active")
    // Réinitialisation de l'affichage de la popup
    const popupModale = document.querySelector(".popup")
    const popudAddProject = document.querySelector('.popup-add-project')
    if(!popupModale.classList.contains('popup-active')){
        popupModale.classList.add("popup-active")
        popudAddProject.classList.remove('popup-active') 
        // Gestion d'apparence et réinitialisation du conteneur d'image dans la popup 'Ajouter Photo'
        modaleManagement()
    }
     // Réinitialisation des messages d'erreurs
    resetErrorMessages()
}

// Function gérant l'ouverture et la fermeture de la modale
export function initAddEventListenerModale(){
    // Ciblage du bouton permettant d'afficher la modale
    const buttonEdit = document.querySelector(".edit-btn")
    // Sélection de la popup à afficher
    const popupModale = document.querySelector(".popup")
    // Ciblage des différents éléments servant à fermer la modale
    const modalePopup = document.querySelector(".modale")
    const closeButton = document.querySelectorAll(".close")
    // Gestion d'ouverture de la modale
    buttonEdit.addEventListener("click", () => {
        modalDisplay()
        // Affichage de la popup 'Galerie Photo'
        popupModale.classList.add("popup-active")
    })
    // Gestion de la fermeture de la modale
    modalePopup.addEventListener("click", (event) => {
        if(event.target === modalePopup){
            modalHide()
        }
    })
    closeButton.forEach(button => {
        button.addEventListener("click", modalHide)
    })
}

// Function permettant de naviguer de Galerie Photo à Ajouter photo
export function addPhoto(){
    const popupModale = document.querySelector(".popup")
    const popupAddProject = document.querySelector('.popup-add-project')

    // Ciblage des éléments du formulaire
    const titleProject = document.getElementById("title")
    const categoryProject = document.getElementById("choice-category")
    
    const btnAddPhoto = document.querySelector(".add-photo")
    btnAddPhoto.addEventListener("click", () => {
        // Réinitialisation des messages d'erreurs 
        resetErrorMessages()
        // Gestion d'apparence et réinitialisation du conteneur d'image dans la popup 'Ajouter Photo'
        modaleManagement()
        // Gestion de l'affichage des popups"
        popupModale.classList.remove('popup-active')
        popupAddProject.classList.add('popup-active')
        // Réinitialisation des valeurs du formulaire
        titleProject.value = ''
        categoryProject.value = ''
    })
}

// Function permettant de naviguer de Ajouter Photo à Galerie Photo
export function viewPhotoGallery(){
    const popupModale = document.querySelector(".popup")
    const popupAddProject = document.querySelector('.popup-add-project')

    const backBtn = document.querySelector(".back")
    backBtn.addEventListener("click", () => {
        // Gestion d'apparance de la modale Ajouter photo
        popupModale.classList.add('popup-active')
        popupAddProject.classList.remove('popup-active')
    })
}

// Function permettant de récupérer la liste des projet et de l'afficher dans Galerie Photo
export function afficherListeProjet(){
    const galleryListe = document.querySelector(".project-contener")
    galleryListe.innerHTML = ''
    fetch("http://localhost:5678/api/works")
    .then((response) => {
        return response.json();
    }).then((Listeprojets) => {
        console.log(Listeprojets)
        for(let projet of Listeprojets) {
            // Création d'un conteneur pour le projet
            const imageProjectContener = document.createElement("div")
            imageProjectContener.id = `${projet.id}`
            // Creation de l'image du projet
            const imageProject = document.createElement("img")
            imageProject.src = projet.imageUrl;
            imageProject.alt = projet.title;
            // Creation du bouton pour supprimer l'image
            const binBtn = document.createElement("button")
            binBtn.id = `${projet.id}`
            binBtn.classList.add("delete-btn")
            const binIcon = document.createElement("i")
            binIcon.classList.add("fa-solid")
            binIcon.classList.add("fa-trash-can")
            binBtn.appendChild(binIcon)
            // Assemblage et ajout du projet dans la gallerie
            imageProjectContener.appendChild(imageProject)
            imageProjectContener.appendChild(binBtn)
            galleryListe.appendChild(imageProjectContener)
        }
        removeProject()
    })
    .catch(() =>{
        console.log('Une erreur est survenue lors de la récupération des projets')
        const errorMessage = document.createElement("p")
        errorMessage.classList.add("error-view-project-list")
        errorMessage.innerText = "Une erreur est survenue lors de la récupération des projets"
        galleryListe.appendChild(errorMessage)
    })
}

// Fonction permettant la suppression des projets
function removeProject(){
    const operationStatus = document.getElementById("operation-status-remove-project")
    // Sélection du conteneur des projets
    const galleryListe = document.querySelector(".project-contener")  
    // Sélection de tous les boutons de suppression  
    const deleteBtn = document.querySelectorAll(".delete-btn")
    deleteBtn.forEach(button => {
        button.addEventListener("click", () => {
            // Récupération de l'identifiant du bouton de suppression et du projet à supprimer
            const btnId = button.id;
            // Envoie d'une requête à l'API pour supprimer le projet
            fetch(`http://localhost:5678/api/works/${btnId}` , {
                method: "DELETE",
                body: btnId,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Remplace <ton_token_ici> par ton vrai token
                    'Accept': '*/*',
                }
            })
            .then((reponse) =>{
                if(reponse.ok){
                    const deletedProject = document.getElementById(btnId);
                    if (deletedProject) {
                        operationStatus.innerText = "Le projet à bien été supprimé"
                        galleryListe.removeChild(deletedProject);
                        genererProjet()
                    }
                }
            })
            .catch(() =>{
                console.log('Une erreur est survenue lors de la suppression du projet')
                operationStatus.innerText = "Une erreur est survenue. Veuillez réessayer plus tard."
            })
        })
    })
}


// Function qui génére dynamiquement le choix des catégorie des projets dans le formulaire
export function choiceCategories (){
    const formSelect = document.getElementById("choice-category")
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    formSelect.appendChild(defaultOption)

    fetch("http://localhost:5678/api/categories")
    .then((response) => {
        return response.json();
    }).then((filtres) => {
        for(let filtre of filtres){
            const optionCateggory = document.createElement("option")
            optionCateggory.value = `${filtre.id}`
            optionCateggory.innerText = `${filtre.name}`
            formSelect.appendChild(optionCateggory)
        }
    })
}

// Function permettant d'ajouter une photo dans le formulaire
export function addImage(){
    const errorPhoto = document.getElementById("error-photo")
    
    const uploadPhoto = document.querySelector(".add-photo-here")
    uploadPhoto.classList.add("active")

    const viewPhoto = document.querySelector(".viewPhoto")
    const inputFile = document.getElementById('fileInput')
    const preview = document.getElementById('preview')
     
    const addPhotoButton = document.querySelector(".plusAddPhoto")
    addPhotoButton.addEventListener("click", () => {
        inputFile.click();
    })
    inputFile.addEventListener('change', (event) =>{
        const file = event.target.files[0];

        if(file) {
            const urlImg = new FileReader();
            urlImg.onload  = function (e) {
                preview.src = e.target.result;
                viewPhoto.classList.add("active")
                // Réinitialisation indépendante du message d'erreur lors de l'ajout de l'image//
                errorPhoto.innerText = ""
            }
        uploadPhoto.classList.remove("active");
        urlImg.readAsDataURL(file)
        }
    })
}

// Fonction permettant de créer et d'envoyer un nouveau projet
export function addNewProject (){
    const sendNewProject = document.querySelector(".validation-btn") 
    // Sélection du conteneur du message du status de la requête
    const operationStatus = document.getElementById("operation-status-add-new-project")
    
    sendNewProject.addEventListener("click", () => {
        const imgSrc = document.getElementById('fileInput')
        const titleProject = document.getElementById("title")
        const categoryProject = document.getElementById("choice-category")
        const formData = new FormData()

        formData.append('image', imgSrc.files[0]); // Ajouter le fichier image
        formData.append('title', titleProject.value); // Ajouter le titre
        formData.append('category', parseInt(categoryProject.value));
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then((reponse) => {
            if(reponse.ok){
                operationStatus.innerText = "Le projet à bien été ajouté"
                // Réintialisation des messages d'erreurs
                resetErrorMessages()
                // Affichage du nouveau projet
                genererProjet()
                afficherListeProjet()
                
            } else {
                // Affichage des messages d'erreurs
                displayErrorMessagesAddNewProject(imgSrc, titleProject, categoryProject)
            }
            
        })
        .catch((error) => {
            console.log ("Erreur lors de l'ajout du projet :", error)
            operationStatus.innerText = "Une erreur est survenue. Veuillez réessayer plus tard."
        })
    })
}

function displayErrorMessagesAddNewProject(imgSrc, titleProject, categoryProject){
    const errorPhoto = document.getElementById("error-photo")
    const errorTitle = document.getElementById("error-title")
    const errorCategory = document.getElementById("error-category")
    if (imgSrc.files.length === 0){
        errorPhoto.innerText = "Veuillez choisir une photo"
    } else {
        errorPhoto.innerText = ""
    }
    if(titleProject.value === ''){
        errorTitle.innerText = "Veuillez attribuer un titre au projet"
    } else {
        errorTitle.innerText = ""
    }
    if(categoryProject.value === ""){
        errorCategory.innerText = "Veuillez sélectionner une catégorie"
    } else {
        errorCategory.innerText = ""
    }
}

// Réinitialisation des messages d'erreurs et de validation du formulaire d'envoie d'un nouveau projet et de la suppression d'un d'un projet
function resetErrorMessages(){
    // Sélection des conteneurs de message d'erreur
    const errorPhoto = document.getElementById("error-photo")
    const errorTitle = document.getElementById("error-title")
    const errorCategory = document.getElementById("error-category")
    const operationStatusAddnewProject = document.getElementById("operation-status-add-new-project")
    const operationStatusRemoveProject = document.getElementById("operation-status-remove-project")
    // Suppression des messages d'erreurs 
    errorPhoto.innerText = ''
    operationStatusAddnewProject.innerText = ""
    errorTitle.innerText = ''
    errorCategory.innerText = ''
    operationStatusRemoveProject.innerText = ''
}

// Gestion et réinitialisation  de l'apparence du conteneur permetant d'ajouter une image 
function modaleManagement(){
    // Ciblage des conteneur gérant l'affichage de l'image importée
    const onladPhoto = document.querySelector(".add-photo-here")
    const viewPhoto = document.querySelector(".viewPhoto")
    // Ciblage des éléments du conteneur viewPhoto
    const inputFile = document.getElementById('fileInput')
    const preview = document.getElementById('preview')
    // Gestion de l'apparence du conteneur affichant l'image importée
    onladPhoto.classList.add("active")
    viewPhoto.classList.remove("active")
    // Réinitialisation de l'image
    preview.src = ''
    inputFile.value = ''
}