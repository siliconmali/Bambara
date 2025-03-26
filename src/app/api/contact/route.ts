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

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone_number,
      message: userMessage,
    } = await req.json();

    if (!name || !email || !phone_number || !userMessage) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"N'KO DON Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      subject: `📩 Nouveau Message de Contact de ${name}`,
      text: `Nom: ${name}\nTéléphone: ${phone_number}\nEmail: ${email}\n\nMessage:\n${userMessage}`,
      html: `
        <h3>📩 Nouveau Message de Contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Téléphone:</strong> ${phone_number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${userMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email envoyé avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
