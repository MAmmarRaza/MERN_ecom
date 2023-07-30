const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    order_id: {
        type: String,
        required:true
    },
    orderDetail: {
        type: Array,
        required: true 
    },
    address: {
        type: String,
        required:true
    },
    country: {
        type: String
    },
    statee:{
        type: String
    },
    zip:{
        type:Number
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("orderDetail", orderDetailSchema);