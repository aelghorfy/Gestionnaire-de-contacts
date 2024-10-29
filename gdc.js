let contacts = []; 

async function myJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Le fichier n'a pas pu être trouvé");
    }
    const data = await response.json();
    console.log("Données fetchées:", data);

    if (data.contacts) {
        contacts = data.contacts; 
    }
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
    const menuDiv = document.getElementById("menuGestionnaire");
    document.getElementById("menuGestionnaire").style.display = "none";
    console.log("Contacts à lister:", contacts); 
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; 

    const titre = document.createElement("h1");
    titre.textContent = "Liste de Contacts";
    titre.style.color = "#B22430";
    contentDiv.style.textAlign = "center";
    contentDiv.appendChild(titre);
    
    const img = document.createElement('img');
    img.src = 'icon.PNG';
    contentDiv.appendChild(img);
    img.style.display = "flex";
    img.style.marginLeft = "34%";
    img.style.height = "20vh";
    
    const select = document.createElement("select");
    select.id = "menuOptions";

    const options = [
        { value: "choisis", text: "Que voulez vous faire" }, // Option par défaut
        { value: "lister", text: "Lister les contacts" },
        { value: "ajouter", text: "Ajouter un contact" },
        { value: "nombre", text: "Nombre de contacts" }
    ];
    select.style.width = "95%";
    select.style.height = "5vh";
    select.style.backgroundColor = "#B22430";
    select.style.color = "white";
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    contentDiv.appendChild(select);

    select.addEventListener("change", function() {
        const choix = select.value;
        if (choix) {
            afficherPage(choix); 
        }
    }); 

    const ul = document.createElement("section");
    contacts.forEach(contact => {
        const li = document.createElement("p");
        li.textContent = `${contact.nom} ${contact.prenom} - ${contact.telephone}`;
        ul.appendChild(li);
        contentDiv.style.textAlign = "center";
        ul.style.background = "#DDDDDD";
        ul.style.color = "#B22430"
        ul.style.borderRadius = "10px";
        ul.style.width = "95%";
        ul.style.marginLeft = "2%";
       
    });
    contentDiv.appendChild(ul);
}

function ajouterContact() {
    // const contentDiv = document.getElementById("content");
    // const titre = document.createElement("h2");
    // titre.textContent = "Ajouter un Nouveau Contact";
    // titre.style.color = "#B22430";
    // titre.style.textAlign = "center";
    // contentDiv.appendChild(titre);

    const menuDiv = document.getElementById("menuGestionnaire");
    document.getElementById("menuGestionnaire").style.display = "none";
    console.log("Contacts à lister:", contacts); 
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; 

    const titre = document.createElement("h1");
    titre.textContent = "Ajout de Contacts";
    titre.style.color = "#B22430";
    contentDiv.style.textAlign = "center";
    contentDiv.appendChild(titre);
    
    const img = document.createElement('img');
    img.src = 'icon.PNG';
    contentDiv.appendChild(img);
    img.style.display = "flex";
    img.style.marginLeft = "34%";
    img.style.height = "20vh";
    
    const select = document.createElement("select");
    select.id = "menuOptions";

    const options = [
        { value: "choisis", text: "Que voulez vous faire" }, // Option par défaut
        { value: "lister", text: "Lister les contacts" },
        { value: "ajouter", text: "Ajouter un contact" },
        { value: "nombre", text: "Nombre de contacts" }
    ];
    select.style.width = "95%";
    select.style.height = "5vh";
    select.style.backgroundColor = "#B22430";
    select.style.color = "white";
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    contentDiv.appendChild(select);

    select.addEventListener("change", function() {
        const choix = select.value;
        if (choix) {
            afficherPage(choix); 
        }
    }); 

    
    

    const form = document.createElement("form");

    form.style.backgroundColor = "#DDDDDD";
    form.style.borderRadius = "10px";
    form.style.width = "95%";
    form.style.marginLeft = "2%";
    form.style.height = "35vh";
    form.style.marginTop = "2%";


    const prenomInput = document.createElement("input");
    prenomInput.placeholder = "Prénom";
    form.appendChild(prenomInput);
    prenomInput.style.marginTop = "5%";
    prenomInput.setAttribute('required', '');

    const brInput = document.createElement("br");
    form.appendChild(brInput);

    const nomInput = document.createElement("input");
    nomInput.placeholder = "Nom";
    form.appendChild(nomInput);
    nomInput.style.marginTop = "5%";
    nomInput.setAttribute('required', '');

    const brInput1 = document.createElement("br");
    form.appendChild(brInput1);

    const numeroInput = document.createElement("input");
    numeroInput.setAttribute('type','tel');
    numeroInput.placeholder = "00 00 00 00 00";
    numeroInput.setAttribute('pattern','[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}');
    numeroInput.setAttribute('required', '');

    form.appendChild(numeroInput);
    numeroInput.style.marginTop = "5%";
    

    const brInput2 = document.createElement("br");
    form.appendChild(brInput2);

    const btnAjouter = document.createElement("button");
    btnAjouter.setAttribute('type', 'submit')
   
    btnAjouter.textContent = "Ajouter";
    form.appendChild(btnAjouter);
    btnAjouter.style.width = "50%";
    btnAjouter.style.marginTop = "10%";
    btnAjouter.style.backgroundColor = "#B22430";
    btnAjouter.style.color = "white";

    form.style.textAlign = "center";
   //contentDiv.innerHTML = "";
   

    contentDiv.appendChild(form);

    btnAjouter.addEventListener("click", function(e) {
        e.preventDefault();
        const prenom = prenomInput.value;
        const nom = nomInput.value;
        const numero = numeroInput.value;

        if (prenom && nom && numero && form.checkValidity()) {
            const newContact = {
                nom: nom,
                prenom: prenom,
                telephone: numero,
            };
            
            // Envoie des données au serveur
            fetch('http://localhost:3000/ajouter-contact', {

                //method atendue par le serveur (voir server.js l14)
                method: 'POST',
                //information importante pour que le server notament le type de fichier
                headers: {
                    'Content-Type': 'application/json',
                },
                //contenu de la requete 
                body: JSON.stringify(newContact),
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du contact');
                }
                return response.text();//transforme la reponse en chaine de charactère
    
            })

            //message = responsetext()
            .then(message => {
                console.log("message :" + message);
                contacts.push(newContact); 
                listerContacts(contacts); 
                alert("Nouveau contact ajouté avec succès");

            })
            .catch(error => {
                console.error(error);
                alert("Erreur lors de l'ajout du contact");
            });
        } else {
            alert("Respectez le format imposé!! (on a pas galerer pour rien)");
        }
    }); 
}

function icon() {
document.getElementById("iconLancement").addEventListener("click", function(e) {
    
    document.getElementById("iconLancement").style.display = "none";
    
 
    document.getElementById("menuGestionnaire").style.display = "block";
    e.preventDefault();
    });

}
icon();

afficherMenu();
const bordure = document.getElementById("bordure");
bordure.style.border = "6px solid black";
bordure.style.borderRadius = "15px"
bordure.style.minHeight = "90vh";
bordure.style.width = "60vh";
bordure.style.margin = "auto";

function afficherMenu() {
    const menuDiv = document.getElementById("menuGestionnaire");
    /* document.getElementById("iconRegulier") */
   
    menuDiv.innerHTML = "";
    
    const titre = document.createElement("h1");
    titre.textContent = "Gestionnaire de Contacts";
    titre.style.color = "#B22430";
    menuDiv.style.textAlign = "center";
    menuDiv.appendChild(titre);
    
    const img = document.createElement('img');
    img.src = 'icon.PNG';
    menuDiv.appendChild(img);
    img.style.display = "flex";
    img.style.marginLeft = "34%";
    img.style.height = "20vh";
    
    const select = document.createElement("select");
    select.id = "menuOptions";

    const options = [
        { value: "choisis", text: "Que voulez vous faire" }, // Option par défaut
        { value: "lister", text: "Lister les contacts" },
        { value: "ajouter", text: "Ajouter un contact" },
        { value: "nombre", text: "Nombre de contacts" }
    ];
    select.style.width = "95%";
    select.style.height = "5vh";
    select.style.backgroundColor = "#B22430";
    select.style.color = "white";
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

const afficherOption = document.createElement("p")
const menuDiv = document.getElementById("menuGestionnaire");
afficherOption.textContent = `Choisir une option.`;
afficherOption.style.textAlign = "center";
afficherOption.style.backgroundColor = "#DDDDDD";
afficherOption.style.color = "#B22430"
afficherOption.style.borderRadius = "10px";
afficherOption.style.width = "95%";
afficherOption.style.margin = "auto";
afficherOption.style.height = "15vh";
afficherOption.style.alignContent = "center";
afficherOption.style.marginTop = "10%";
menuDiv.appendChild(afficherOption);

const contentDiv = document.getElementById("content");


if (contentDiv.style.display === "block" ){
    afficherOption.style.display = "none"
} else {
    afficherOption.style.display = "block"
}

const selectElement = document.getElementById("menuGestionnaire");

selectElement.addEventListener("change", function() {
    afficherOption.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    
    fetchEtListerContacts();
});


function afficherNombreContacts() {
    const menuDiv = document.getElementById("menuGestionnaire");
    document.getElementById("menuGestionnaire").style.display = "none";
    const contentDiv = document.getElementById("content");

    const titre = document.createElement("h1");
    titre.textContent = "Nombre de Contacts";
    titre.style.color = "#B22430";
    contentDiv.style.textAlign = "center";
    contentDiv.appendChild(titre);
    
    const img = document.createElement('img');
    img.src = 'icon.PNG';
    contentDiv.appendChild(img);
    img.style.display = "flex";
    img.style.marginLeft = "34%";
    img.style.height = "20vh";
    
    const select = document.createElement("select");
    select.id = "menuOptions";

    const options = [
        { value: "choisis", text: "Que voulez vous faire" }, // Option par défaut
        { value: "lister", text: "Lister les contacts" },
        { value: "ajouter", text: "Ajouter un contact" },
        { value: "nombre", text: "Nombre de contacts" }
    ];
    select.style.width = "95%";
    select.style.height = "5vh";
    select.style.backgroundColor = "#B22430";
    select.style.color = "white";
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    contentDiv.appendChild(select);

    select.addEventListener("change", function() {
        const choix = select.value;
        if (choix) {
            afficherPage(choix); 
        }
    }); 
    const nbContacts = contacts.length; 
    const p = document.createElement("p");
    p.textContent = `Il y a ${nbContacts} contact(s) dans la liste.`;
    p.style.textAlign = "center";
    p.style.backgroundColor = "#DDDDDD";
    p.style.color = "#B22430"
    p.style.borderRadius = "10px";
    p.style.width = "95%";
    p.style.margin = "auto";
    p.style.height = "15vh";
    p.style.alignContent = "center";
    p.style.marginTop = "10%";
    contentDiv.appendChild(p);
}