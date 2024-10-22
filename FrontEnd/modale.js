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

initAddEventListenerModale()
addPhoto()
afficherGaleriePhoto()

