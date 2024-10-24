//recureration des modules indispensables
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

//creation d'une variable qui executera les modules, et d'un port pour communiquer
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

//fonction qui récupérer le fichier json qui ajoute le nouveau contact et qui réecrit le fichier json 
app.post('/ajouter-contact', (req, res) => { //req = requete  res = reponse

    //on récupere le contenu de la requete (voir requete sur gdc.js l93)
    const newContact = req.body;
    
    // Lire le fichier existant
    fs.readFile('gdc.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier');
        }
  
       //stoque les données localement dans un tableau
        let contacts = [];
        try {
            contacts = JSON.parse(data).contacts;//convertit json en fichier js
        } catch (error) {
            return res.status(500).send('Erreur lors de la lecture des contacts');
        }

        // Ajoute le nouveau contact
        contacts.push(newContact);

        // ecrit tableau contacts dans gdc.json  stringify convertit fichier js en json
        fs.writeFile('gdc.json', JSON.stringify({ contacts }, 2), (err) => {
            if (err) {
                return res.status(500).send('Erreur d\'écriture dans le fichier');
            }
            res.status(200).send('Contact ajouté avec succès');
        });
    });
});

//fonction pour que le server soit pret a ecouter les requetes
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});