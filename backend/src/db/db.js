const mongoose = require('mongoose')

const connectDb = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/zomztoApp")
    .then(()=>{console.log("Database Connected successfully")})
    .catch((err)=>{console.log(`Database Connection error: ${err}`)})
}



module.exports = connectDb