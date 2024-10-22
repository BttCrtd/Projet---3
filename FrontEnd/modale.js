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
    const closeButton = document.querySelector(".fa-x")
    buttonEdit.addEventListener("click", () => {
        afficherModale()
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

initAddEventListenerModale()