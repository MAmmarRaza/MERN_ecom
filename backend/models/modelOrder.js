const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now 
    },
    email: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    status:{
        type:Number,
        default:0
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("orders", orderSchema);