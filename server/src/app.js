const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('../config/db')
const apiRoutes = require('./routers')

// env config
dotenv.config()

// mongodb connection
connectDB()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8000

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
