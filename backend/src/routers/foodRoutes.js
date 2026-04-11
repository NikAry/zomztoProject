const express = require('express')
const { foodPartnerMiddleware, userMiddleware } = require('../middleware/authentication')
const { foodItemCreate, getFoodList } = require('../controllers/food_controller')
const multer = require('multer')

const foodRouter = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

foodRouter.post('/',foodPartnerMiddleware,upload.single('food-video'),foodItemCreate)
foodRouter.get('/',getFoodList)

module.exports = foodRouter