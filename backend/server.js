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
    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "./client/build/index.html"),
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("An error occurred while serving the file.");
                }
            }
        );
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
