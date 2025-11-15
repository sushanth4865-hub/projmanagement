import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js";

// to get secrets from .env
dotenv.config({
Path: "./.env",
})

// let myusername = process.env.username;

// console.log("username: ", myusername);
console.log("Start of a backend project");

const port = process.env.PORT || 3000;

// only listen after connecting to database
connectDB()
  .then(()=>{
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err)=>{
    console.error("MongoDB connection error", err);
    process.exit(1);
  })

