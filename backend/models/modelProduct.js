const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    featured:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    size:{
        type:Array,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    date:{
        type:Date,
        default: Date.now()
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("products" , productSchema);