const express = require('express')
const { foodPartnerMiddleware } = require('../middleware/authentication')
const { foodItemCreate } = require('../controllers/food_controller')
const multer = require('multer')

const foodRouter = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

foodRouter.post('/',foodPartnerMiddleware,upload.single('food-video'),foodItemCreate)


module.exports = foodRouter