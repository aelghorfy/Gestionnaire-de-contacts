const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/ajouter-contact', (req, res) => {
    const newContact = req.body;
    
    // Lire le fichier existant
    fs.readFile('gdc.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier');
        }

        let contacts = [];
        try {
            contacts = JSON.parse(data).contacts;
        } catch (error) {
            return res.status(500).send('Erreur lors de la lecture des contacts');
        }

        // Ajouter le nouveau contact
        contacts.push(newContact);

        // Écrire les données mises à jour dans le fichier
        fs.writeFile('gdc.json', JSON.stringify({ contacts }, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erreur d\'écriture dans le fichier');
            }
            res.status(200).send('Contact ajouté avec succès');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});