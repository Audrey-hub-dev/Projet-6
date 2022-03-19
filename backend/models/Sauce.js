const mongoose = require('mongoose');

//création d'un schéma de données qui contient les chmaps souhaités pour chaque sauce
const sauceSchema = mongoose.Schema({



  
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', sauceSchema);