const foodModel = require('../models/food-item_model')
const foodPartner = require('../models/food-partner_model.js')
const profileController = require('../controllers/profileController.js')
const express = require('express')
const { userMiddleware } = require('../middleware/authentication.js')
const profileRouter = express.Router()

profileRouter.get('/food-partner/:id',userMiddleware,profileController.FoodPartnerId)
profileRouter.get('/user/profile',userMiddleware,profileController.userProfile)
module.exports = {profileRouter}