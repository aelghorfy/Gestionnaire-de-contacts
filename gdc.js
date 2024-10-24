let contacts = [];

document.getElementById("iconLancement").addEventListener("click", function() {
    // cacher icone après clic
    document.getElementById("iconLancement").style.display = "none";
    
    // afficher le menu
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

    // reagir au changement d'option
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
            fetchEtListerContacts();
            break;
        case "ajouter":
            ajouterContact();
            break;
        case "nombre":
            afficherNombreContacts();
            break;
    }
}

function listerContacts(contacts) {
    console.log("Contacts to list:", contacts); // contactes à lister
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; // effacer contenu precedent

    const titre = document.createElement("h2");
    titre.textContent = "Liste des Contacts";
    contentDiv.appendChild(titre);

    const ul = document.createElement("ul");
    contacts.forEach(item => {
        const contact = item.contact;
        const li = document.createElement("li");
        li.textContent = `${contact.nom} ${contact.prenom} - ${contact.telephone}`;
        ul.appendChild(li);
    });
    contentDiv.appendChild(ul);
}

async function myJson(url) {
    const raiponce = await fetch(url);
    if (!raiponce.ok) {
        throw new Error("le fichier n'a pas pu être trouvé");
    }
    const data = await raiponce.json();
    console.log("data fetch:", data);
    return data;
}

function fetchEtListerContacts() {
    myJson('gdc.json')
        .then(data => {
            if (data && data.contacts) {
                listerContacts(data.contacts); // afficher le tableau contacts sur la fonction
            } else {
                console.error("Le fichier JSON ne contient pas de contacts.");
            }
        })
        .catch(error => {
            console.error("L'operation fetch a rencontré un problème:", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    //Fetch et lister les contacts
    fetchEtListerContacts();
});

    
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

    btnAjouter.addEventListener("click", function(e) {
        e.preventDefault(); // empeche le rechargement de la page
        const prenom = prenomInput.value;
        const nom = nomInput.value;
        const numero = numeroInput.value;
        const newContact = {
            nom: nom,
            prenom: prenom,
            telephone: numero,
        };

        // Ajouter le nouveau contact à la liste en mémoire
        contacts.push({ contact: newContact });

        // Re-lister les contacts après ajout
        listerContacts(contacts);

        console.log("Nouveau contact ajouté", newContact);
    });

}

// fonction afficher le nombre de contacts
function afficherNombreContacts() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Nombre de Contacts";
    contentDiv.appendChild(titre);
    const nbContacts = contacts.length; // Nombre de contacts
    const p = document.createElement("p");
    p.textContent = `Il y a ${nbContacts} contacts dans la liste.`;
    contentDiv.appendChild(p);
}