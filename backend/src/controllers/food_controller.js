const foodModel = require('../models/food-item_model')
const {v4:uuid} = require('uuid')
const {foodVideoUpload} = require('../services/imageStorage.service')

const foodItemCreate = async (req,res)=>{
    const {itemName,description} = req.body
    console.log(req.foodPartner)
    // console.log(req.body)
    // console.log(req.file);
    const result = await foodVideoUpload(req.file.buffer.toString('base64'),itemName+"-"+uuid()+req.foodPartner._id)
    // console.log('result of upload\n',result)
    const foodItem = await foodModel.create({
        itemName: itemName,
        description:description,
        video: result.url,
        foodPartner:req.foodPartner._id
    })
    console.log(foodItem)
    res.status(200).json({message:foodItem})
    
}

const getFoodList = async (req,res)=>{
    const response = await foodModel.find({})
    const allFoodList=[]
    response.map((item)=>{
        allFoodList.push(item)
    })
    console.log(allFoodList)
    res.status(200).json({list:allFoodList})
}
module.exports = {foodItemCreate,getFoodList}