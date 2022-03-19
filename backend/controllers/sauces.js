const Sauce = require('../models/Sauce'); 



//on exporte la logique de création d'une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); 
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
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : {...req.body};


    /*updateOne permet de mettre à jour le Thing qui correspond à l'objet que nous 
    passons comme premier argument. Nous utilisons le paramètre id passé dans la demande et le 
    remplaçons par le Thing passé comme second argument.
    */
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }; 

//on exporte la logique de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    //accéder au fichier
    Sauce.findOne({_id: req.params.id})
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