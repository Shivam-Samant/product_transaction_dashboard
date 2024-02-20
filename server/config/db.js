const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.mongodb.net/`,
    )
    console.log(`Connected to MongoDB database at ${mongoose.connection.host}`)
  } catch (err) {
    console.log(`Error connecting to the MongoDB database: ${err}`)
  }
}

module.exports = connectDB
