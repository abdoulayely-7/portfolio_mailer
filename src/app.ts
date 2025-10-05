import express from "express";
import dotenv from "dotenv";
import mailRoutes from "./routes/mail.routes.js";

dotenv.config();
console.log("Variables d'environnement chargées");

const app = express();
app.use(express.json());
console.log("Middleware JSON configuré");

// Routes
app.use("/api/contact", mailRoutes);
console.log("Routes mail configurées");

export default app;
