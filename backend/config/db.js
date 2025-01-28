const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.API_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB Atlas");
  } catch (err) {
    console.error("Database connection error:", err.message);
    console.log(
      "Please check your MongoDB connection string, username, or password!"
    );
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
