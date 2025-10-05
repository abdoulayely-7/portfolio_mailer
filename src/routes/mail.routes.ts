import { Router } from "express";
import { MailController } from "../controllers/mail.controller.js";

const router = Router();
const mailController = new MailController();

router.post("/", (req, res) => mailController.sendMail(req, res));

export default router;
