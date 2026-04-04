const express = require('express')
const {signUp,signIn,signOut} = require('../controllers/user_controller')
const {fpSignup,fpSignin,fpSignout} = require('../controllers/fp_controller')

const authRouter = express.Router()

//User routes
authRouter.post('/user/signup',signUp)
authRouter.post('/user/signin',signIn)
authRouter.get('/user/signout',signOut)

// food-partner routes
authRouter.post('/food-partner/signup',fpSignup)
authRouter.post('/food-partner/signin',fpSignin)
authRouter.get('/food-partner/signout',fpSignout)


module.exports = authRouter