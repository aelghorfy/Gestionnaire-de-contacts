document.getElementById("iconLancement").addEventListener("click", function() {
    // cacher icone après clic
    document.getElementById("iconLancement").style.display = "none";
    
    // cfficher le menu
    document.getElementById("menuGestionnaire").style.display = "block";
    
    // fonction pour menu déroulant
    afficherMenu();
});

function afficherMenu() {
    const menuDiv = document.getElementById("menuGestionnaire");

    // effacer le contenu pour "nvl" page
    menuDiv.innerHTML = "";

    // titre
    const titre = document.createElement("h1");
    titre.textContent = "Gestionnaire de Contacts";
    menuDiv.appendChild(titre);

    // créer menu déroulant 
    const select = document.createElement("select");
    select.id = "menuOptions";

    // options menu déroulant
    const options = [
        { value: "", text: "Sélectionnez une option" }, // Option par défaut
        { value: "lister", text: "Lister les contacts" },
        { value: "ajouter", text: "Ajouter un contact" },
        { value: "nombre", text: "Nombre de contacts" }
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    // ajouter select a la page
    menuDiv.appendChild(select);

    // ecouteur event pour reagir au changement d'option
    select.addEventListener("change", function() {
        const choix = select.value;

        if (choix) {
            afficherPage(choix); // affiche la page choisie
        }
    });
}

function afficherPage(choix) {
    const contentDiv = document.getElementById("content");
    contentDiv.style.display = "block"; // affiche le choix
    contentDiv.innerHTML = ""; // efface le contenu d'avant


    switch (choix) {
        case "lister":
            listerContacts();
            break;
        case "ajouter":
            ajouterContact();
            break;
        case "nombre":
            afficherNombreContacts();
            break;
    }
}


// lister les contacts
function listerContacts() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Liste des Contacts";
    contentDiv.appendChild(titre);
    
    // charger et afficher les contacts depuis XML (expliquée pendant le cours)
    fetch('./gdc.xml')
    .then(response => response.text())
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const contacts = xmlDoc.getElementsByTagName("contact");

        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            const prenom = contact.getElementsByTagName("prenom")[0].textContent;
            const nom = contact.getElementsByTagName("nom")[0].textContent;
            const numero = contact.getElementsByTagName("numero")[0].textContent;

            const contactDiv = document.createElement('div');
            contactDiv.innerHTML = `<p>${prenom} ${nom}</p>
                                    <p>${numero}</p>`;
            contentDiv.appendChild(contactDiv);
        }
    }).catch(error => console.log(error));
}

// fonction pour ajouter des contacts
function ajouterContact() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Ajouter un Nouveau Contact";
    contentDiv.appendChild(titre);

    // formulaire pour ajouter contact
    const form = document.createElement("form");

    const prenomInput = document.createElement("input");
    prenomInput.placeholder = "Prénom";
    form.appendChild(prenomInput);

    const nomInput = document.createElement("input");
    nomInput.placeholder = "Nom";
    form.appendChild(nomInput);

    const numeroInput = document.createElement("input");
    numeroInput.placeholder = "Numéro de téléphone";
    form.appendChild(numeroInput);

    const btnAjouter = document.createElement("button");
    btnAjouter.textContent = "Ajouter";
    form.appendChild(btnAjouter);

    contentDiv.appendChild(form);

    option.addEventListener("click", function(e) {
        e.preventDefault(); // empeche le rechargement de la page
        const prenom = prenomInput.value;
        const nom = nomInput.value;
        const numero = numeroInput.value;

        console.log(`Nouveau contact: ${prenom} ${nom}, ${numero}`);
    });
}

// fonction afficher le nombre de contacts
function afficherNombreContacts() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Nombre de Contacts";
    contentDiv.appendChild(titre);

    // charger et compter les contacts depuis XML
    fetch('./contacts.xml')
    .then(response => response.text())
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const contacts = xmlDoc.getElementsByTagName("contact");

        const nombreContacts = contacts.length;
        const p = document.createElement("p");
        p.textContent = `Vous avez ${nombreContacts} contacts.`;
        contentDiv.appendChild(p);
    }).catch(error => console.log(error));
}
