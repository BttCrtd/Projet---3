function afficherModale(){
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.add("active")
}

function cachermodale(){
    const popupModale = document.querySelector(".popup")
    const popudAddProject = document.querySelector('.popup-add-project')
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.remove("active")
    if(popupModale.classList !== 'popup-active'){
        popupModale.classList.add("popup-active")
        popudAddProject.classList.remove('popup-active')
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
        for(projet of Listeprojets) {
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
            imageProjetContener.appendChild(imageprojet)
            imageProjetContener.appendChild(binBtn)
            galleryListe.appendChild(imageProjetContener)
        }
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
        for(filtre of filtres){
            const optionCateggory = document.createElement("option")
            optionCateggory.value = `${filtre.id}`
            optionCateggory.innerText = `${filtre.name}`
            formSelect.appendChild(optionCateggory)
        }
    })
}

initAddEventListenerModale()
addPhoto()
afficherGaleriePhoto()
afficherListeProjet()
choiceCategories()
