import express from "express";
import dotenv from "dotenv";
import mailRoutes from "./routes/mail.routes.js";
import cors from 'cors';


dotenv.config();
console.log("Variables d'environnement chargées");

const app = express();
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    // Autoriser les requêtes sans origine (comme les appels d'API mobile ou Postman)
    if (!origin) return callback(null, true);
    
    // Liste des origines autorisées
    const allowedOrigins = ['https://abdoulaye-lydev.vercel.app','https://abdoulaye-ly-dev-folio.vercel.app'];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
console.log("Middleware JSON configuré");

// Routes
app.use("/api/contact", mailRoutes);
console.log("Routes mail configurées");

export default app;
