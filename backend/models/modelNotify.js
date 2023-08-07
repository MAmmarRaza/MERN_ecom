const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    date: {
        type: Date,
        default: Date.now 
    },
    msg: {
        type: String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("notify", notifySchema);