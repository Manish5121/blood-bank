const mongoose = require("mongoose")
const colors = require("colors")
require("dotenv").config()

const connectDB = async () => {
  try {
    // Log the MONGO_URL (make sure to mask sensitive parts)
    const maskedURL = process.env.MONGO_URL
      ? process.env.MONGO_URL.replace(/:([^@]+)@/, ":****@")
      : "undefined"
    console.log(`Attempting to connect with URL: ${maskedURL}`.yellow)

    // Validate MONGO_URL
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the environment variables.")
    }

    if (
      !process.env.MONGO_URL.includes("mongodb+srv://") &&
      !process.env.MONGO_URL.includes("mongodb://")
    ) {
      throw new Error("MONGO_URL must start with mongodb+srv:// or mongodb://")
    }

    // Attempt to connect
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    )
  } catch (error) {
    console.log(`Mongodb Database Error: ${error.message}`.bgRed.white)
    // Log more details about the error
    if (error.name === "MongoAPIError") {
      console.log(
        "This error often occurs due to incorrect MongoDB URI format.".yellow
      )
      console.log("Please check your MONGO_URL in the .env file.".yellow)
    }
    // Exit the process if connection fails
    process.exit(1)
  }
}

module.exports = connectDB
