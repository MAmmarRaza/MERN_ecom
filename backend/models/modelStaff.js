const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: Number,
        default: 1
    },
    date:{
        type:Date,
        default: Date.now()
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("staff", staffSchema);