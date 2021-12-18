// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const modalBody = modalbg.querySelector(".modal-body");


class Reservation {

    constructor() {
        this.formHTML = null;
        this.estValide = true; //On part du principe que le formulaire est valide
    }

    /**
     * Cette méthode permet d'écouter les clicks utilisateurs
     * Elle me permet d'assurer la soumission du formulaire, l'ouverture et la fermeture du modal
     */
    init() {
            let objetReservation = this;
            // launch modal event
            modalBtn.forEach((btn) => btn.addEventListener("click", function() {
                objetReservation.launchModal();
            }, false));

            document.getElementsByName("reserve")[0].addEventListener("submit", function(event) {
                event.preventDefault();
                objetReservation.validate(event);
            });
            //Close Modal
            modalClose.addEventListener("click", function() {
                objetReservation.closeModal();
            }, false);
        }
        // launch modal form
    closeModal() {
        modalbg.style.display = "none";

        if (this.formHTML != null) { //Cas où on avait stoqué le formulaire
            modalBody.innerHTML = this.formHTML; //Je remets le formulaire à sa place
            this.init();
        }

    }

    // launch modal form
    launchModal() {
        modalbg.style.display = "block";
    }

    /**
     * Méthode qui traite la soumission du formulaire
     * @returns 
     */
    validate(event) {
        event.preventDefault();
        this.estValide = true; //On part du principe que le formulaire est valide
        this.checkChampMin2Caracteres("first");
        this.checkChampMin2Caracteres("last");
        this.checkChampDate("birthdate");
        this.checkChampEmail("email");
        this.checkChampNumber("quantity");
        this.checkChampRadio("location");
        this.checkChampCheckbox("conditions");

        if (this.estValide) {
            //On soumet le formulaire au serveur # TODO

            //Si pas d'erreur, le formulaire est soumis et on affiche le message de succès à l'utilisateur
            this.afficherMessageSucces();
        }
        return false;
    }

    /**
     * Cette fonction sert à vérifier le champ date du formulaire
     * @param {*} name 
     */
    checkChampDate(name) {

        //Je crée mon regex
        const regex = new RegExp('[0-9]{4}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}');

        //Je récupère la valeur de mon champ date et je trim la valeur pour enlever les espaces avant et après
        let date = document.getElementsByName(name)[0].value.trim();
        let divErreur = document.getElementById("erreur-" + name);

        if (regex.test(date) == true) { //Cas de champ vérifié
            divErreur.style.display = "none";
            divErreur.previousElementSibling.style.border = "0";
        } else { //Sinon
            divErreur.style.display = "block";
            divErreur.previousElementSibling.style.border = "solid red 2px";
            this.estValide = false; // On indique le formulaire n'est pas valide
        }
    }

    /**
     * Fonction qui permet de vérifier une adresse e-mail
     * @param {*} name 
     */
    checkChampEmail(name) {
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        let email = document.getElementsByName(name)[0].value.trim();

        let divErreur = document.getElementById("erreur-" + name);

        if (regex.test(email)) {
            divErreur.style.display = "none";
            divErreur.previousElementSibling.style.border = "0";
        } else {
            divErreur.style.display = "block";
            divErreur.previousElementSibling.style.border = "solid red 2px";
            this.estValide = false;
        }
    }

    /**
     * Cette fonction permet de vérifier les champs qui doivent contenir au minimum deux caractères
     * @param {*} name 
     */
    checkChampMin2Caracteres(name) {
        let element = document.getElementsByName(name)[0];
        let divErreur = document.getElementById("erreur-" + name);

        if (element.value.trim().length >= 2) { //Cas pas d'erreur
            divErreur.style.display = "none";
            divErreur.previousElementSibling.style.border = "0";
        } else { //Sinon
            divErreur.style.display = "block";
            divErreur.previousElementSibling.style.border = "solid red 2px";
            this.estValide = false;
        }
    }



    /**
     * Fonction qui permet de certifier que le champ contient bien un nombre
     * @param {*} name 
     * @returns boolean
     */
    checkChampNumber(name) {
        let element = document.getElementsByName(name)[0];
        let nombre = element.value.trim();

        let divErreur = document.getElementById("erreur-" + name);

        if (nombre == "" || isNaN(nombre)) { //Si c'est un nombre'
            divErreur.style.display = "block";
            divErreur.previousElementSibling.style.border = "solid red 2px";
            this.estValide = false;

        } else { //Sinon
            divErreur.style.display = "none";
            divErreur.previousElementSibling.style.border = "0";
        }
    }


    /**
     * Fonction qui permet de savoir si le champ est vide
     * @param {*} name 
     * @returns boolean
     */
    checkChampRadio(name) {

        let divErreur = document.getElementById("erreur-" + name);

        if (document.reserve.location.value) {
            divErreur.style.display = "none";
        } else {
            divErreur.style.display = "block";
            this.estValide = false;
        }
    }


    /**
     * Fonction qui permet de savoir si le champ est vide
     * @param {*} name 
     * @returns boolean
     */
    checkChampCheckbox(name) {
            let element = document.getElementsByName(name)[0];
            let divErreur = document.getElementById("erreur-" + name);

            if (element.checked) {
                divErreur.style.display = "none";
            } else {
                divErreur.style.display = "block";
                this.estValide = false;
            }
        }
        /**
         * Fonction qui permet d'afficher un message en cas de succès du formulaire
         */
    afficherMessageSucces() {

        //Création des éléments
        let conteneur = document.createElement("div");
        let boutonClose = document.createElement("button");

        //Ajout du texte aux éléments crées
        conteneur.innerHTML = "Merci ! Votre réservation a été reçue.";
        boutonClose.innerHTML = "fermer";

        //Ajout des classes
        conteneur.classList.add("form-retour");
        boutonClose.classList.add("button");
        boutonClose.classList.add("button-close");

        let objetReservation = this;
        //On écoute le click sur le bouton
        boutonClose.addEventListener("click", function() {
            objetReservation.closeModal();
        }, false);

        //Je sauvegarde le formulaire (contenu du modal)
        this.formHTML = modalBody.innerHTML;

        modalBody.innerHTML = ""; //J'efface le contenu du modal

        modalBody.appendChild(conteneur); //J'affiche le message succès
        modalBody.appendChild(boutonClose); //J'affiche le bouton close
    }


}

var reservation = new Reservation();
reservation.init();