/*


// Importing required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import path from "path";
// http = require('http');
// import conn from './conn';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Getting current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Importing route handlers
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
// import connectDB from "./connectMongoDb.js";
// require("./conn");

dotenv.config();
// connectDB();

// Creating an Express application
const app = express();

// Middlewares for parsing JSON and handling CORS
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a stack overflow clone API")
// })

// Setting up routes for different API endpoints
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

// Connecting to MongoDB database
const DATABASE_URL = process.env.CONNECTION_URL


mongoose.connect(DATABASE_URL ,
{useNewUrlParser:true , useUnifiedTopology:true,autoIndex:true}
).then(()=>{
    console.log("conection successfulllll");
}).catch((e)=>{
    console.log("error in connection" + e);
})

// Serving static files in production and redirecting other routes to the client-side app
if ("production" == "production") {
   
 
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
    })
}


// Configuring another instance of middleware for url-encoded data
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});




*/


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Importing route handlers
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

dotenv.config();

// Creating an Express application
const app = express();

// Middlewares for parsing JSON and handling CORS
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Setting up routes for different API endpoints
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

// Connecting to MongoDB database
const DATABASE_URL = process.env.CONNECTION_URL;
console.log(DATABASE_URL);

mongoose
  .connect(`${DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Serving static files in production
if ("production" === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Configuring middleware for url-encoded data
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
