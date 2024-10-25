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
    menuDiv.innerHTML = ""; // effacer le contenu pour "nvl" page
    menuDiv.style.textAlign = "center"; // Centre le contenu du menu

    const titre = document.createElement("h1");
    titre.textContent = "Gestionnaire de Contacts";
    menuDiv.appendChild(titre);

    // créer menu déroulant 
    const select = document.createElement("select");
    select.id = "menuOptions";

    select.style.backgroundColor = "#8B0000"; // Fond rouge
    select.style.color = "white";
    // options menu déroulant
    const options = [
        { value: "", text: "Que voulez vous faire" }, // Option par défaut
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
    contentDiv.innerHTML = ""; // efface le contenu precedent
    contentDiv.style.textAlign = "center"; // Centrer

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

function ajouterContact() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Ajouter un Nouveau Contact";
    contentDiv.appendChild(titre);

    // formulaire pour ajouter contact
    const form = document.createElement("form");
    form.style.border = "2px solid black";
    form.style.padding = "10px"; 
    form.style.display = "inline-block";
    form.style.margin = "20px auto"; 
    

    const prenomInput = document.createElement("input");
    prenomInput.placeholder = "Prénom";
    form.appendChild(prenomInput);

    const brInput = document.createElement("br");
    form.appendChild(brInput);


    const nomInput = document.createElement("input");
    nomInput.placeholder = "Nom";
    form.appendChild(nomInput);

    const brInput2 = document.createElement("br");
    form.appendChild(brInput2);


    const numeroInput = document.createElement("input");
    numeroInput.placeholder = "Numéro de téléphone";
    form.appendChild(numeroInput);

    const brInput3 = document.createElement("br");
    form.appendChild(brInput3);


    const btnAjouter = document.createElement("button");
    btnAjouter.textContent = "Ajouter";
    form.appendChild(btnAjouter);

    contentDiv.appendChild(form);

    // Ajout d'un écouteur d'événements sur le bouton "Ajouter"
    btnAjouter.addEventListener("click", function(e) {
        e.preventDefault(); // empêche le rechargement de la page
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
 
    myJson("gdc.json")
        .then(data => {
            if (data && data.contacts) {
                const nbreContact = data.contacts.length;
                const p = document.createElement("p");
                p.textContent = `Vous avez ${nbreContact} contact(s)`;
                contentDiv.appendChild(p);
            } else {
                console.error("Le fichier JSON ne contient pas de contacts");
            }
        })
        .catch(error => {
            console.error("L'opérateur fetch a rencontré un problème :", error);
        });
}
