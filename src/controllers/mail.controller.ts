import { Request, Response } from "express";
import { MailService } from "../services/mail.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export class MailController {
    private mailService: MailService;

    constructor() {
        this.mailService = new MailService();
    }

    async sendMail(req: Request, res: Response): Promise<Response> {
        const { nom, email, message } = req.body;

        if (!nom || !email || !message) {
            return res.status(400).json(errorResponse("Tous les champs sont obligatoires."));
        }

        try {
            await this.mailService.sendPortfolioMail({ nom, email, message });
            return res.status(200).json(successResponse("Email envoyé avec succès ✅"));
        } catch (err: any) {
            console.error("Erreur:", err);
            return res.status(500).json(errorResponse("Erreur lors de l'envoi du mail."));
        }
    }
}
