
// Récupération du bouton "Se connecter"
const submit = document.getElementById("Se-connecter");
// Ecoute du bouton "Se connecter"
submit.addEventListener("click", (event) => {
    // On empêche le rechargement par défault de la page 
    try{
        document.getElementById("error-message").innerText = ""
        event.preventDefault();

        // Récupération de la valeur saisie pour l'email
        const email = document.getElementById("E-mail").value;
        // Récupération de la valeur saisie pour le mot de passe
        const motDePasse = document.getElementById("mot-de-passe").value;
    
        const dataLogin = {
            "email" : email, 
            "password": motDePasse}
        // Envoie des données de connection à l'API
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify(dataLogin),
            headers: { "Content-Type": "application/json" }
            })
        // Traitement de la réponse de l'API
        .then((reponse) => {
            return answerManagement(reponse)
        })
        // Gestion du token
        .then((data) => {
            if (data.token) {                
                // Stockage du token dans le localStorage 
                localStorage.setItem('token', data.token); 
                localStorage.setItem('authenticated', 'true');
                window.location.href = "index.html";
            }
        })
        .catch(() => {
            document.getElementById("error-message").innerText = "Une erreur est survenue, veuillez réessayer ultérieurement.";
            localStorage.setItem('authenticated', 'false');
        });
    } catch {
        console.log("Une erreur est survenue, veuillez réessayer ultérieurement.")
        document.getElementById("error-message").innerText = "Une erreur est survenue, veuillez réessayer ultérieurement."
    }
})


function answerManagement(reponseApi){
    if(reponseApi.status === 404 || reponseApi.status === 401){
        document.getElementById("error-message").innerText = "Erreur dans l’identifiant ou le mot de passe";
        localStorage.setItem('authenticated', 'false'); 
        return reponseApi.json();        
    }
    if(reponseApi.status === 200) {
        return reponseApi.json();
    }
    if(reponseApi.status !== 404 && reponseApi.status !== 401 && reponseApi.status !== 200){
        return null
    }
}