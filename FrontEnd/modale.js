import {FicheProjet, genererProjet} from "./index.js"

function afficherModale(){
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.add("active")
}

function cachermodale(){
    const onladPhoto = document.querySelector(".add-photo-here")
    const inputFile = document.getElementById('fileInput')
    const preview = document.getElementById('preview')
    const popupModale = document.querySelector(".popup")
    const popudAddProject = document.querySelector('.popup-add-project')
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.remove("active")
    if(popupModale.classList !== 'popup-active'){
        popupModale.classList.add("popup-active")
        popudAddProject.classList.remove('popup-active')
        onladPhoto.style.display = 'flex'
        inputFile.value = ''
        preview.src =''
        preview.style.display = 'none'
    }
}

function initAddEventListenerModale(){
    const buttonEdit = document.querySelector(".edit-btn")
    const modalePopup = document.querySelector(".modale")
    const popupModale = document.querySelector(".popup")
    const closeButton = document.querySelector(".fa-x")
    const closeButton2 = document.querySelector(".popup-add-project .fa-x")
    buttonEdit.addEventListener("click", () => {
        afficherModale()
        popupModale.classList.add("popup-active")
    })
    modalePopup.addEventListener("click", (event) => {
        if(event.target === modalePopup){
            cachermodale()
        }
    })
    closeButton.addEventListener("click", (event) => {
        if(event.target === closeButton){
            cachermodale()
        }
    }) 
    closeButton2.addEventListener("click", (event) => {
        if(event.target === closeButton2){
            cachermodale()
        }
    }) 
}

function addPhoto(){
    const BtnAddPhoto = document.querySelector(".add-photo")
    const popupModale = document.querySelector(".popup")
    const popudAddProject = document.querySelector('.popup-add-project')
    BtnAddPhoto.addEventListener("click", () => {
        popudAddProject.classList.add('popup-active')
        popupModale.classList.remove('popup-active')
    })
}

function afficherGaleriePhoto(){
    const backBtn = document.querySelector(".fa-arrow-left")
    const popupModale = document.querySelector(".popup")
    const popudAddProject = document.querySelector('.popup-add-project')
    backBtn.addEventListener("click", () => {
        popudAddProject.classList.remove('popup-active')
        popupModale.classList.add('popup-active')
    })
}

function afficherListeProjet(){
    const galleryListe = document.querySelector(".project-contener")
    fetch("http://localhost:5678/api/works")
    .then((response) => {
        return response.json();
    }).then((Listeprojets) => {
        console.log(Listeprojets)
        for(let projet of Listeprojets) {
            const imageProjetContener = document.createElement("div")
            const binBtn = document.createElement("button")
            const binIcon = document.createElement("i")
            binIcon.classList.add("fa-solid")
            binIcon.classList.add("fa-trash-can")
            binBtn.appendChild(binIcon)
            const imageprojet = document.createElement("img")
            const urlImage = projet.imageUrl;
            const altImage = projet.title;
            imageprojet.src = urlImage;
            imageprojet.alt = altImage;
            imageProjetContener.id = `${projet.id}`
            binBtn.id = `${projet.id}`
            binBtn.classList.add("delet-btn")
            imageProjetContener.appendChild(imageprojet)
            imageProjetContener.appendChild(binBtn)
            galleryListe.appendChild(imageProjetContener)
        }

        // Gestion pour la suppression des projets

        const deletBtn = document.querySelectorAll(".delet-btn")
        deletBtn.forEach(button => {
            button.addEventListener("click", () => {
                const btnId = button.id;
                fetch(`http://localhost:5678/api/works/${btnId}` , {
                    method: "DELETE",
                    body: btnId,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Remplace <ton_token_ici> par ton vrai token
                        'Accept': '*/*',
                    }
                })
            })
        })
        // Fin gestion supression des projet
    })
}

function choiceCategories (){
    const formSelect = document.getElementById("choice-category")

    const optionCateggory = document.createElement("option")
    optionCateggory.value = ""
    formSelect.appendChild(optionCateggory)

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

function addImage(){
    const addPhoto = document.querySelector(".plusAddPhoto")
    const onladPhoto = document.querySelector(".add-photo-here")
    const inputFile = document.getElementById('fileInput')
    const preview = document.getElementById('preview')
    addPhoto.addEventListener("click", () => {
        inputFile.click();
    })
    inputFile.addEventListener('change', (event) =>{
        const fichier = event.target.files[0];

        if(fichier) {
            const UrlImg = new FileReader();
            UrlImg.onload  = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'flex';
            }
        onladPhoto.style.display ='none'
        UrlImg.readAsDataURL(fichier)
        }
        
    })
}


function addNewProject (){
    const sendNewProject = document.querySelector(".validation-btn")

    
    sendNewProject.addEventListener("click", () => {
        const imgSrc = document.getElementById('fileInput')
        const titileProjet = document.getElementById("title")
        const catégorieProjet = document.getElementById("choice-category")
        const formData = new FormData()

        formData.append('image', imgSrc.files[0]); // Ajouter le fichier image
        formData.append('title', titileProjet.value); // Ajouter le titre
        formData.append('category', parseInt(catégorieProjet.value));
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((reponse) => {
            console.log(reponse)
            console.log(imgSrc.files[0])
            console.log(titileProjet.value)
            console.log(catégorieProjet.value)
        })
    })
}

addNewProject()


initAddEventListenerModale()
addPhoto()
afficherGaleriePhoto()
afficherListeProjet()
addImage()
choiceCategories()



