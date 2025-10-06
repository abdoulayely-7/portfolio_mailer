import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export class MailService {
    async sendPortfolioMail(data: { nom: string; email: string; message: string }) {
        console.log("Envoi du mail en cours");
        console.log("EMAIL_USER défini:", !!process.env.EMAIL_USER);
        console.log("EMAIL_PASS défini:", !!process.env.EMAIL_PASS);
        console.log("TO_EMAIL défini:", !!process.env.TO_EMAIL);
        const templatePath = path.resolve("src/templates/mail.html");
        let html = fs.readFileSync(templatePath, "utf8");

        // Remplace les placeholders
        html = html
            .replace("{{nom}}", data.nom)
            .replace("{{email}}", data.email)
            .replace("{{message}}", data.message);

        // Configuration SendGrid SMTP (plus fiable pour les déploiements cloud)
        const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "apikey", // SendGrid utilise "apikey" comme user
                pass: process.env.SENDGRID_API_KEY, // Clé API SendGrid
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Abdoulaye" <${process.env.FROM_EMAIL}>`, // Adresse vérifiée sur SendGrid
            to: process.env.TO_EMAIL,
            subject: "📩 Nouveau message depuis ton portfolio",
            html,
        });

        console.log("✅ Mail envoyé avec succès via SendGrid");
    }
}
