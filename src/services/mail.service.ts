import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export class MailService {
    async sendPortfolioMail(data: { nom: string; email: string; message: string }) {
        const templatePath = path.resolve('src/templates/mail.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        html = html
            .replace('{{nom}}', data.nom)
            .replace('{{email}}', data.email)
            .replace('{{message}}', data.message);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Abdoulaye" <${process.env.EMAIL_USER}>`,
            to: process.env.TO_EMAIL, // ton mail
            subject: '📩 Nouveau message depuis ton portfolio',
            html,
        });
    }
}
