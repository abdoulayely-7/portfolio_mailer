import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

export class MailService {
    async sendPortfolioMail(data: { nom: string; email: string; message: string }) {
        console.log("Envoi du mail en cours");
        console.log("SENDGRID_API_KEY défini:", !!process.env.SENDGRID_API_KEY);
        console.log("FROM_EMAIL défini:", !!process.env.FROM_EMAIL);
        console.log("TO_EMAIL défini:", !!process.env.TO_EMAIL);

        // Configurer SendGrid
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

        const templatePath = path.resolve("src/templates/mail.html");
        let html = fs.readFileSync(templatePath, "utf8");

        // Remplace les placeholders
        html = html
            .replace("{{nom}}", data.nom)
            .replace("{{email}}", data.email)
            .replace("{{message}}", data.message);

        const msg = {
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL!, // Adresse vérifiée sur SendGrid
            subject: "📩 Nouveau message depuis ton portfolio",
            html,
        };

        try {
            await sgMail.send(msg);
            console.log("✅ Mail envoyé avec succès via SendGrid API");
        } catch (error: any) {
            console.error("Erreur SendGrid:", error.response?.body?.errors || error.message);
            throw error;
        }
    }
}
