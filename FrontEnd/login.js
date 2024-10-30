// Fonction permettant de gérer le contenue du lien pour accéder à la page de connection
export function loginLogout() {
  const loginLink = document.querySelector('nav a[href="login.html"]');
  loginLink.innerText = "";
  if (sessionStorage.getItem("authenticated") === "true") {
    loginLink.innerText = "logout";
  } else {
    loginLink.innerText = "login";
  }
}

loginLogout();

// Récupération du bouton "Se connecter"
const submit = document.getElementById("Se-connecter");
if (submit) {
  // Ecoute du bouton "Se connecter"
  submit.addEventListener("click", (event) => {
    // On empêche le rechargement par défault de la page
    try {
      // Réinitialisation du message d'erreur
      document.getElementById("error-message").innerText = "";
      event.preventDefault();
      // Récupération de la valeur saisie pour l'email
      const userEmail = document.getElementById("E-mail").value;
      // Récupération de la valeur saisie pour le mot de passe
      const userPassword = document.getElementById("password").value;
      // Stockage des valeurs à envoyer à l'API
      const dataLogin = {
        email: userEmail,
        password: userPassword,
      };
      // Envoie des données de connection à l'API
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(dataLogin),
        headers: { "Content-Type": "application/json" },
      })
        // Traitement de la réponse de l'API
        .then((reponse) => {
          return answerManagement(reponse);
        })
        // Gestion du token
        .then((data) => {
          if (data.token) {
            // Stockage du token dans le sessionStorage
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("authenticated", "true");
            window.location.href = "index.html";
            loginLogout();
          }
        })
        .catch(() => {
          document.getElementById("error-message").innerText =
            "Une erreur est survenue, veuillez réessayer ultérieurement.";
          sessionStorage.setItem("authenticated", "false");
        });
    } catch {
      console.log(
        "Une erreur est survenue, veuillez réessayer ultérieurement."
      );
      document.getElementById("error-message").innerText =
        "Une erreur est survenue, veuillez réessayer ultérieurement.";
    }
  });
}

// Fonction permettant de cibler le type d'erreur
function answerManagement(reponseApi) {
  if (reponseApi.status === 404 || reponseApi.status === 401) {
    document.getElementById("error-message").innerText =
      "Erreur dans l’identifiant ou le mot de passe";
    sessionStorage.setItem("authenticated", "false");
    loginLogout();
    return reponseApi.json();
  }
  if (reponseApi.status === 200) {
    return reponseApi.json();
  }
  if (
    reponseApi.status !== 404 &&
    reponseApi.status !== 401 &&
    reponseApi.status !== 200
  ) {
    loginLogout();
    return null;
  }
}
