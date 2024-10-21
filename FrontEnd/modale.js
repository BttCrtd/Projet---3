function afficherModale(){
    let modalePopup = document.querySelector('.modale')
    modalePopup.classList.add("active")
}

function initAddEventListenerModale(){
    const buttonEdit = document.querySelector(".edit-btn")
    //let modalePopup = document.querySelector(".modale")
    buttonEdit.addEventListener("click", () => {
        afficherModale()
    })
}

initAddEventListenerModale()