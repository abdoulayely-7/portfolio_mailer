import app from "./app.js";

const PORT = process.env.PORT || 3000;

console.log("Démarrage du serveur...");

app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
