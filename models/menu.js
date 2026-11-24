const { default: mongoose, Collection } = require("mongoose");

let menuModel = mongoose.Schema({
    name: String,
    side: String,
    drink: String,
    sauce: String,
    price: Number
},
{
    Collection: "menu"
});
module.exports=mongoose.model('Menu',menuModel);