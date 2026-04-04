const userModel = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req,res)=>{
    const {fullName,email,password,phoneNumber} = req.body
    console.log(fullName,email,phoneNumber)
    
    // userfinding
    const userAlreadyExist = await userModel.findOne({email})
    
    if (userAlreadyExist) {
        return res.status(400).json({message: 'User already exists'})
    }

    const hashPass = await bcrypt.hash(password,10)

    // user creation
    const user = await userModel.create({fullName,email,password:hashPass,phoneNumber:phoneNumber})

    // token
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload,process.env.secretKey)
    res.cookie('token',token)
    res.status(201).json({
        message:'user registered successfully',
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

const signIn = async (req,res)=>{
    const {email,password} = req.body
    // userfinding
    const user = await userModel.findOne({email})
    if (!user) {
        return res.status(400).json({message: "Invalid email or password"})
    }
    // password check
    const rightPass = await bcrypt.compare(password,user.password)
    if (!rightPass) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const payload = {
        id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload,process.env.secretKey)
    res.cookie('token',token)
    res.status(201).json({
        message:'user signedin successfully',
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })



}

const signOut = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Signout successful"})
}
module.exports = {signUp,signIn,signOut,}