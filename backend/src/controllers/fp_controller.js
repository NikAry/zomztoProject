const foodPartnerModel = require('../models/food-partner_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fpSignup = async (req,res)=>{
    const {businessName,businessEmail,location,contactNumber,password} = req.body
    
    // userfinding
    const userAlreadyExist = await foodPartnerModel.findOne({businessEmail})
    
    if (userAlreadyExist) {
        return res.status(400).json({message: 'Food-partner already exists'})
    }

    const hashPass = await bcrypt.hash(password,10)

    // user creation
    const foodPartner = await foodPartnerModel.create({businessName,businessEmail,location,contactNumber,password:hashPass})

    // token
    
    const payload = {
        id: foodPartner._id
    }
    const token = jwt.sign(payload,process.env.secretKey)
    res.cookie('token',token)
    res.status(201).json({
        message:'Food-partner registered successfully',
        foodPartner: {
            _id: foodPartner._id,
            businessEmail: foodPartner.businessEmail,
            businessName: foodPartner.businessName,
            location: foodPartner.location,
            contactNumber: foodPartner.contactNumber
        }
    })
}

const fpSignin = async (req,res)=>{
    const {businessEmail,password} = req.body
    // food-partner finding
    const foodPartner = await foodPartnerModel.findOne({businessEmail})
    if (!foodPartner) {
        return res.status(400).json({message: "Invalid email or password"})
    }
    // password check
    const rightPass = await bcrypt.compare(password,foodPartner.password)
    if (!rightPass) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const payload = {
        id: foodPartner._id
    }
    const token = jwt.sign(payload,process.env.secretKey)
    res.cookie('token',token)
    res.status(201).json({
        message:'Food-partner signedin successfully',
        user: {
            _id: foodPartner._id,
            businessEmail: foodPartner.businessEmail,
            businessName: foodPartner.businessName,
            location: foodPartner.location
        }
    })
}

const fpSignout = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Signout successful"})
}

module.exports = {fpSignin,fpSignup,fpSignout}