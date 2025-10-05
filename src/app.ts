import express from "express";
import dotenv from "dotenv";
import mailRoutes from "./routes/mail.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/contact", mailRoutes);

export default app;
