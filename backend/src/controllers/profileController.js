const foodPartnerModel = require('../models/food-partner_model')
const foodModel = require('../models/food-item_model')

const FoodPartnerId = async(req,res)=>{
    const PartnerId = req.params.id 
    const foodByPartner = await foodModel.find({foodPartner:PartnerId})
    const foodPartner = await foodPartnerModel.findById(PartnerId)
    console.log('food By partner', foodByPartner)
    res.status(200).json({
      foodInfo: foodByPartner,
      foodPartner
    })
}

const   userProfile = async (req,res) => {

  const user = req.user
  // console.log('user profile',user)
  res.status(200).json({user})
}
module.exports = {FoodPartnerId, userProfile}