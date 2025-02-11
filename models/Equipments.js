const mongoose = require("mongoose");

const Equipments = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    availableQuantity:{
        type: Number,
        required: true,
    },
    TotalQuantity:{
        type: Number,
    }
})

module.exports = mongoose.model("Equipment", Equipments);