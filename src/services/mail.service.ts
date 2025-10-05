import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export class MailService {
    async sendPortfolioMail(data: { nom: string; email: string; message: string }) {
        console.log("Envoi du mail en cours");
        const templatePath = path.resolve("src/templates/mail.html");
        let html = fs.readFileSync(templatePath, "utf8");

        // Remplace les placeholders
        html = html
            .replace("{{nom}}", data.nom)
            .replace("{{email}}", data.email)
            .replace("{{message}}", data.message);

        // ✅ Transporteur SendGrid
        const transporter = nodemailer.createTransport({
            service: "SendGrid",
            auth: {
                api_key: process.env.SENDGRID_API_KEY!,
            } as any,
        });

        await transporter.sendMail({
            from: `"Portfolio Abdoulaye" <no-reply@tondomaine.com>`,
            to: process.env.TO_EMAIL,
            subject: "📩 Nouveau message depuis ton portfolio",
            html,
        });

        console.log("✅ Mail envoyé avec succès via SendGrid");
    }
}
