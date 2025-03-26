import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

const emailTemplates = {
  PENDING: {
    subject: "Votre demande est en attente",
    message: `Bonjour,<br><br>Votre demande d'inscription est actuellement en cours d'examen. Vous recevrez une notification une fois qu'elle aura été traitée.<br><br>Cordialement,<br>L'équipe <strong>N'KO DON</strong>`,
  },
  APPROVED: {
    subject: "Votre compte a été approuvé",
    message: `Félicitations ! 🎉<br><br>Votre compte a été approuvé avec succès. Vous pouvez maintenant accéder à la plateforme et commencer à contribuer.<br><br>
    <a href="https://nko-don.vercel.app/login" style="padding: 10px 20px; background-color: #008751; color: white; text-decoration: none; border-radius: 5px;">Se connecter</a><br><br>
    Merci de faire partie de notre communauté !<br><br>Cordialement,<br>L'équipe <strong>N'KO DON</strong>`,
  },
  DISMISSED: {
    subject: "Votre compte a été suspendu",
    message: `Bonjour,<br><br>Nous sommes désolés de vous informer que votre compte a été suspendu.<br>Si vous souhaitez en savoir plus, veuillez nous contacter à <a href="mailto:nkodonteam@gmail.com">nkodonteam@gmail.com</a>.<br><br>Merci de votre compréhension.<br><br>Cordialement,<br>L'équipe <strong>N'KO DON</strong>`,
  },
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, status } = await req.json();

    if (!email || !status) {
      return NextResponse.json({ error: "L'adresse e-mail et le statut sont requis" }, { status: 400 });
    }

    const template = emailTemplates[status as keyof typeof emailTemplates];
    if (!template) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    const emailHtml = `
      <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <img src="https://nko-don.vercel.app/logo.png" alt="NKO DON Logo" style="width: 150px; margin-bottom: 20px;">
        <h2 style="color: #008751;">${template.subject}</h2>
        <p style="font-size: 16px; color: #333;">${template.message}</p>
        <hr style="border: 1px solid #ddd; margin-top: 20px;">
        <p style="font-size: 12px; color: #999;">&copy; 2025 N'KO DON. Tous droits réservés.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: emailHtml,
    });


    return NextResponse.json({ message: "Email envoyé avec succès", id: info.messageId }, { status: 200 });
  } catch (error) {

    return NextResponse.json({ error: "Échec de l'envoi de l'email", details: error }, { status: 500 });
  }
}