const express = require("express");
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/DB");
const cors = require("cors");
const journalRouter = require("./routes/journalRoutes");

require("dotenv").config();

// REST Object
const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// create a write stream
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"));

// log request to file
app.use(
  morgan("tiny", {
    skip: (req) => req.url === "/favicon.ico",
    stream: logStream,
  })
);

// connect to MongoDB
connectDB();

// test route
app.get("/test", (req, res) => {
  res.status(200).send(`<H1>MongoDB Connected Succcessfully!!</H1>`);
});

// routes
app.use("/api/v1/journal", journalRouter);

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`.red);
});
