import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.js";

console.log("hi, I am at halth route");

const router = Router();

router.route("/").get(healthCheck);
export default router;