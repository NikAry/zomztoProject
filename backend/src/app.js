const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/authRoutes');
const foodRouter = require('./routers/foodRoutes');
const cors = require('cors');
const { profileRouter } = require('./routers/profileRoutes');
const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=> {
   res.send('hello')
})
app.use('/auth',authRouter)
app.use('/food',foodRouter)
app.use('/view',profileRouter)
module.exports = app