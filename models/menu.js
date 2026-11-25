const { default: mongoose, Collection } = require("mongoose");

let menuModel = new mongoose.Schema({
    name: String,
    side: String,
    drink: String,
    sauce: String,
    price: Number
},
{
    Collection: "menu"
});
module.exports=mongoose.model('Menu',menuModel,'menu');