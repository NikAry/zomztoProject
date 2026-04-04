const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food-partner"   
    }

},{timestamps:true})

const foodModel = mongoose.model("food",foodItemSchema)

module.exports = foodModel