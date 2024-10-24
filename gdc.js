let contacts = []; 
async function myJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Le fichier n'a pas pu être trouvé");
    }
    const data = await response.json();
    console.log("Données fetchées:", data);
    contacts = data.contacts && []; 
    console.log("Contacts chargés:", contacts);
    return data;
}

function fetchEtListerContacts() {
    myJson('gdc.json')
        .then(() => {
            listerContacts(contacts); 
        })
        .catch(error => {
            console.error("L'opération fetch a rencontré un problème:", error);
        });
}

function listerContacts(contacts) {
    console.log("Contacts à lister:", contacts); 
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; 
    const titre = document.createElement("h2");
    titre.textContent = "Liste des Contacts";
    contentDiv.appendChild(titre);

    const ul = document.createElement("ul");
    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `${contact.nom} ${contact.prenom} - ${contact.telephone}`;
        ul.appendChild(li);
    });
    contentDiv.appendChild(ul);
}

function ajouterContact() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Ajouter un Nouveau Contact";
    contentDiv.appendChild(titre);

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
        e.preventDefault(); 
        const prenom = prenomInput.value;
        const nom = nomInput.value;
        const numero = numeroInput.value;

        if (prenom && nom && numero) {
            const newContact = {
                nom: nom,
                prenom: prenom,
                telephone: numero,
            };
            
            // Envoie des données au serveur
            fetch('http://localhost:3000/ajouter-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du contact');
                }
                return response.text();
            })
            .then(message => {
                console.log(message);
                contacts.push(newContact); // Ajoutez le contact localement
                listerContacts(contacts); 
                alert("Nouveau contact ajouté avec succès");
            })
            .catch(error => {
                console.error(error);
                alert("Erreur lors de l'ajout du contact");
            });
        } else {
            alert("Tous les champs sont obligatoires !");
        }
    });
}

document.getElementById("iconLancement").addEventListener("click", function() {
    
    document.getElementById("iconLancement").style.display = "none";
    
 
    document.getElementById("menuGestionnaire").style.display = "block";
    
    afficherMenu();
});

function afficherMenu() {
    const menuDiv = document.getElementById("menuGestionnaire");

   
    menuDiv.innerHTML = "";

    
    const titre = document.createElement("h1");
    titre.textContent = "Gestionnaire de Contacts";
    menuDiv.appendChild(titre);

    
    const select = document.createElement("select");
    select.id = "menuOptions";

   
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

   
    menuDiv.appendChild(select);

    
    select.addEventListener("change", function() {
        const choix = select.value;

        if (choix) {
            afficherPage(choix); 
        }
    });
}

function afficherPage(choix) {
    const contentDiv = document.getElementById("content");
    contentDiv.style.display = "block"; 
    contentDiv.innerHTML = ""; 

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

document.addEventListener('DOMContentLoaded', () => {
    
    fetchEtListerContacts();
});


function afficherNombreContacts() {
    const contentDiv = document.getElementById("content");
    const titre = document.createElement("h2");
    titre.textContent = "Nombre de Contacts";
    contentDiv.appendChild(titre);

    const nbContacts = contacts.length; 
    const p = document.createElement("p");
    p.textContent = `Il y a ${nbContacts} contact(s) dans la liste.`;
    contentDiv.appendChild(p);
}