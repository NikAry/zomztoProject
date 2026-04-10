const foodPartnerModel = require('../models/food-partner_model')
const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')

const foodPartnerMiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Invalid request, login required"
        })
    }
    try {
        const checker = jwt.verify(token,process.env.secretKey)
        const foodPartner = await foodPartnerModel.findById(checker.id)
        req.foodPartner = foodPartner
        next()
        
    } catch (error) {
        return res.status(401).json({
            message:'Invalid token'
        })
    }

}

const userMiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Invalid request, login required"
        })
    }
    try {
        const checker = jwt.verify(token,process.env.secretKey)
        const user = await userModel.findById(checker.id)
        req.user = user
        next()
        
    } catch (error) {
        return res.status(401).json({
            message:'Invalid token'
        })
    }

}

module.exports = {foodPartnerMiddleware, userMiddleware}