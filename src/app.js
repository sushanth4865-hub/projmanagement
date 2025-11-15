import express from "express"
import cors from "cors";

const app = express();

//middleware basic configuration
app.use(express.json({limit: "16kb"}));// so anybody can send json data 

app.use(express.urlencoded({extended:true, limit: "16kb"})); // to allow params in the url itslef.

app.use(express.static("public")) // to serve any particular files/folder to public, here images can be shown to public.

// cors configurations
app.use(
  cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
  credentials:true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders:["Authorization", "Content-Type"]
}),
)

//import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/instagram", (req, res) => {
  res.send("this is an instagram page");
});

export default app;