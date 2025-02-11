const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const books = require("./routes/bookroute.js");
const path = require("path");
// const helmet = require("helmet");
require("dotenv").config({ path: "./config.env" });

// CONNECT TO DB
connectDB();

// INITIATE APP
const app = express();

// HANDLE MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(helmet());

// API ROUTES
app.use("/api/books", books);

app.get("/home", (req, res) => {
    res.send("HomePage");
});

// SERVE STATIC FILES IN PRODUCTION
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get('/api/books', async (req, res) => {
        try {
          const books = await Book.find(); // Fetch all books from MongoDB
          res.json(books);
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      });
      
}

// HANDLE UNMATCHED API ROUTES
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});
