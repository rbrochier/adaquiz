// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════

const ecranAccueil = document.getElementById("ecran-accueil");
const btnCommencer = document.getElementById("btn-commencer");
const ecranQuestion = document.getElementById("ecran-question");
const compteurQuestions = document.getElementById("compteur-questions");
const texteQuestion = document.getElementById("texte-question");
const listeReponses = document.getElementById("liste-reponses");

const barProgression = document.getElementById("avancement");
const btnSuivant = document.getElementById("btn-suivant");
const ecranResultats = document.getElementById("ecran-resultats");
const scoreFinal = document.getElementById("score-final");
const messageFin = document.getElementById("message-fin");
const btnRejouer = document.getElementById("btn-rejouer");

// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

// let questions = []   // tableau des questions chargées depuis le JSON
let indexCourant = 0; // numéro de la question en cours (commence à 0)
let score = 0; // nombre de bonnes réponses

// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecran) => {
  ecranAccueil.classList.add("cache");
  ecranQuestion.classList.add("cache");
  ecranResultats.classList.add("cache");
  ecran.classList.remove("cache");
};

// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════

// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante : questions[indexCourant]
//   2. Mettre à jour la barre de progression
//   3. Mettre à jour le compteur ("Question X / Y")
//   4. Afficher le texte de la question dans #texte-question
//   5. Cacher le bouton "Question suivante"
//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic

const afficherQuestion = () => {
  const questionCourante = questions[indexCourant];
  texteQuestion.textContent = questionCourante.question;

  compteurQuestions.textContent =
    "QUESTION " + (indexCourant + 1) + "/" + questions.length;
  barProgression.value = indexCourant;
  barProgression.max = questions.length;
  btnSuivant.classList.add("cache");
  listeReponses.textContent = "";

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
};

// ── TODO : verifierReponse ───────────────────
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante
//   2. Désactiver tous les boutons de réponse
//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
//   5. Si la réponse est bonne, incrémenter le score
//   6. Afficher le bouton "Question suivante"

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
  } else {
    boutonsReponse[indexChoisi].classList.add("incorrecte");
  }
};

btnSuivant.classList.remove("cache");

// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :
//   1. Afficher le score dans #score-final (ex. "4 / 7")
//   2. Afficher un message dans #message-fin selon le score
//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats

const afficherResultats = () => {
  scoreFinal.textContent = score + "/" + questions.length;

  if (score === questions.length){
    messageFin.textContent = "Parfait, bravo !";
  } else if (score >= questions.length / 2) {
    messageFin.textContent = "Bien joué, continue comme ça !";
  } else {
    messageFin.textContent = "Courage, réessaie !";
  }
   afficher(ecranResultats);
};



// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :
//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
//   - btn-suivant   → passer à la question suivante ou aux résultats
//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

btnCommencer.addEventListener("click", () => {
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

  if (indexCourant === questions.length-1) {
    btnSuivant.textContent = "AFFICHER LES RESULTATS"
  } else {
    btnSuivant.textContent = "QUESTION SUIVANTE"
  }

});

btnRejouer.addEventListener("click", () => {
  indexCourant = 0;
  score = 0;
  afficher(ecranAccueil);
});
