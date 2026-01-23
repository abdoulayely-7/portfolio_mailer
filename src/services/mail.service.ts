import fs from "fs";
import path from "path";
import axios from "axios";


export class MailService {
    private baseUrl = 'https://api.brevo.com/v3';

    async sendPortfolioMail(data: { nom: string; email: string; message: string }) {
        console.log("Envoi du mail en cours");

        const apiKey = process.env.BREVO_API_KEY;
        const fromEmail = process.env.FROM_EMAIL;
        const toEmail = process.env.TO_EMAIL;

        console.log("BREVO_API_KEY défini:", !!apiKey);
        console.log("FROM_EMAIL défini:", !!fromEmail);
        console.log("TO_EMAIL défini:", !!toEmail);

        if (!apiKey) throw new Error("BREVO_API_KEY manquant");
        if (!fromEmail) throw new Error("FROM_EMAIL manquant");
        if (!toEmail) throw new Error("TO_EMAIL manquant");

        const templatePath = path.resolve("src/templates/mail.html");
        let html = fs.readFileSync(templatePath, "utf8");

        html = html
            .replace("{{nom}}", data.nom)
            .replace("{{email}}", data.email)
            .replace("{{message}}", data.message);

        const payload = {
            sender: { name: "Portfolio Contact", email: fromEmail },
            to: [{ email: toEmail }],
            subject: "📩 Nouveau message depuis ton portfolio",
            htmlContent: html
        };

        const response = await axios.post(
            `${this.baseUrl}/smtp/email`,
            payload,
            {
                headers: {
                    "api-key": apiKey,
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            }
        );

        console.log("✅ Mail envoyé avec succès via Brevo");
        return response.data;
    }
}

