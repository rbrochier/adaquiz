

const ecranAccueil = document.getElementById("ecran-accueil");
const btnCommencer = document.getElementById("btn-commencer");
const ecranQuestion = document.getElementById("ecran-question");
const compteurQuestions = document.getElementById("compteur-questions");
const texteQuestion = document.getElementById("texte-question");
const listeReponses = document.getElementById("liste-reponses");
const messageReponse = document.getElementById("message-reponse");
const barProgression = document.getElementById("avancement");
const btnSuivant = document.getElementById("btn-suivant");
const ecranResultats = document.getElementById("ecran-resultats");
const scoreFinal = document.getElementById("score-final");
const messageFin = document.getElementById("message-fin");
const btnRejouer = document.getElementById("btn-rejouer");

let indexCourant = 0; 
let score = 0; 

const afficher = (ecran) => {
  ecranAccueil.classList.add("cache");
  ecranQuestion.classList.add("cache");
  ecranResultats.classList.add("cache");
  ecran.classList.remove("cache");
};

const afficherQuestion = () => {
  const questionCourante = questions[indexCourant];
  texteQuestion.textContent = questionCourante.question;

  compteurQuestions.textContent =
    "QUESTION " + (indexCourant + 1) + "/" + (questions.length/2);
  barProgression.value = indexCourant;
  barProgression.max = questions.length;
  btnSuivant.classList.add("cache");
  listeReponses.textContent = "";
  messageReponse.textContent = "";
  questionCourante.reponses.forEach((reponse, index) => {
    const itemReponse = document.createElement("li");
    const btn = document.createElement("button"); // créer
    btn.textContent = reponse;
    btn.classList.add("btn-reponse"); // modifier
    btn.addEventListener("click", () => {
      // écouter
      verifierReponse(index);
    });

    itemReponse.appendChild(btn);
    listeReponses.appendChild(itemReponse); // insérer
  });

  btnSuivant.classList.add("cache");
  document.querySelector(".btn-reponse").focus();
};


const verifierReponse = (indexChoisi) => {
  const questionCourante = questions[indexCourant];
  btnSuivant.classList.remove("cache");
  const boutonsReponse = document.querySelectorAll(".btn-reponse");
  boutonsReponse.forEach((bouton) => {
    bouton.disabled = true;
  });
  boutonsReponse[questionCourante.bonne_reponse].classList.add("correcte");
  if (indexChoisi === questionCourante.bonne_reponse) {
    score = score + 1;
    messageReponse.textContent = "Bonne réponse !";
  } else {
    boutonsReponse[indexChoisi].classList.add("incorrecte");
    messageReponse.textContent = "Mauvaise réponse !";
  }
  btnSuivant.classList.remove("cache");
  btnSuivant.focus();
};


const afficherResultats = () => {
  scoreFinal.textContent = score + "/" + questions.length;

  if (score === questions.length) {
    messageFin.textContent = "Parfait, bravo !";
  } else if (score >= questions.length / 2) {
    messageFin.textContent = "Bien joué, continue comme ça !";
  } else {
    messageFin.textContent = "Courage, réessaie !";
  }
  afficher(ecranResultats);
};


  const melangerQuestions = () => { 
    for (let i = questions.length - 1; i > 0; i-- ) {
    const j = Math.floor(Math.random() * (i+1));
    const temporaire = questions[i];
    questions[i] = questions[j];
    questions[j] = temporaire;
     }

  };
btnCommencer.addEventListener("click", () => {
  melangerQuestions();
  afficher(ecranQuestion);
  afficherQuestion();
});


btnSuivant.addEventListener("click", () => {
  indexCourant++;
  if (indexCourant < questions.length) {
    afficherQuestion();
  } else {
    afficherResultats();
  }

  if (indexCourant === questions.length - 1) {
    btnSuivant.textContent = "AFFICHER LES RESULTATS";
  } else {
    btnSuivant.textContent = "QUESTION SUIVANTE";
  }
});

btnRejouer.addEventListener("click", () => {
  indexCourant = 0;
  score = 0;
  afficher(ecranAccueil);
  btnCommencer.focus();
});
