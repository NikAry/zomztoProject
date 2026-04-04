const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    businessEmail :{
        type: String,
        required:true,
        unique: true
    },
    location: {
        type:String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

const foodPartnerModel = mongoose.model('food-partner',foodPartnerSchema)
module.exports = foodPartnerModel