const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    suplier: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    contact: {
        type: String,
        required:true
    },
    item:{
        type:String
    },
    amount: {
        type: Number
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("purchase", purchaseSchema);