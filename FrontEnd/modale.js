function afficherModale(){
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.add("active")
}

function cachermodale(){
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.remove("active")
}

function initAddEventListenerModale(){
    const buttonEdit = document.querySelector(".edit-btn")
    const modalePopup = document.querySelector(".modale")
    const popupModale = document.querySelector(".popup")
    const closeButton = document.querySelector(".fa-x")
    buttonEdit.addEventListener("click", () => {
        afficherModale()
        popupModale.classList.add("popup-active")
    })
    modalePopup.addEventListener("click", (event) => {
        if(event.target === modalePopup || event.targer === closeButton){
            cachermodale()
        }
    })
    closeButton.addEventListener("click", (event) => {
        if(event.target === closeButton){
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

initAddEventListenerModale()
addPhoto()

