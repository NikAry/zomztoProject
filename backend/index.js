const app = require('./src/app')
const connectDb = require('./src/db/db')
require('dotenv').config()

// Middleware

// Database connection
connectDb()



app.listen(3000,()=>{console.log('Server started at 3000');
})