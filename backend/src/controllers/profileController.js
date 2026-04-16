const foodPartnerModel = require('../models/food-partner_model')
const foodModel = require('../models/food-item_model')

const FoodPartnerProfile = async(req,res)=>{
    const PartnerId = req.params.id 
    const foodByPartner = await foodModel.find({foodPartner:PartnerId})
    const foodPartner = await foodPartnerModel.findById(PartnerId)
    console.log('food By partner', foodByPartner)
    res.status(200).json({
      foodInfo: foodByPartner,
      foodPartner
    })
}

module.exports = {FoodPartnerProfile}