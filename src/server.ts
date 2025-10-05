import app from "./app.js";

const PORT = process.env.PORT || 3000;

console.log("Démarrage du serveur...");

// Gestion des erreurs non catchées
process.on('uncaughtException', (err) => {
    console.error('Erreur non catchée:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejet non géré:', promise, 'raison:', reason);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
    // Log pour vérifier que le serveur reste actif
    setTimeout(() => {
        console.log("Serveur toujours actif après 5 secondes");
    }, 5000);
});
