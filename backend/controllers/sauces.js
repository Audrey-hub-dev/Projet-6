const Sauce = require('../models/Sauce'); 

//pour pouvoir accéder au système de fichiers, on importe fs de node et avoir
// accès aux différentes opérations liées aux fichiers
const fs = require ('fs'); 



//on exporte la logique de création d'une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); 
    //suppression de l'id généré automatiquement par mongodb
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        //url de l'image: protocole, nom d'hôte, dossier, nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({error}));
};

// on exporte la logique de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    //si le fichier req.file existe 
    {
        ...JSON.parse(req.body.sauce),//récupération des informations de l'objet sur cette partie de la requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//on génère une nouvelle image

    } : {...req.body};//si le fichier req.file n'existe pas 

    /*updateOne permet de mettre à jour la modification peu importe son format et on met à jour
    l'identifiant de la sauce correspondant aux paramètres des requêtes
    */
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }; 

//on exporte la logique de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    //accéder au fichier
    Sauce.findOne({_id: req.params.id})//id qui correspond aux paramètres de la requête
        //récupérer le nom du fichier précisément
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1/*on récupère le nom du fichier ce qui 
            vient après le dossier images donc le deuxième élément. Le premier élément
            est ce qui vient avant le dossier images*/];
            //on appelle fs pour supprimer le fichier 
            fs.unlink(`images/${filename}`, () => {
                //ce qu'il faut faire une fois le fichier supprimé
                 /*la méthode deleteOne() fonctionne comme findOne() et updateOne() dans le sens
                    où nous lui passons un objet correspondant au document à supprimer. Suppression
                    dans la base de données. */
                Sauce.deleteOne({ _id: req.params.id })
                /*Nous envoyons une réponse de réussite ou d'échec au front-end*/
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            })

        })
        .catch(error => res.status(500).json({error})); 
}; 


  //on exporte la logique de récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
    //findOne pour trouver un seul objet et pas tous
    //trouver le Thing unique ayant le même id que le paramètre de la requête
    Sauce.findOne({ _id: req.params.id })
        //promise
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}; 

//on exporte la logique de récupération de toutes les sauces 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}; 