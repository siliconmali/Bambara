import React from "react";

export default function ApprovalEmailTemplate({
  data,
  title,
}: {
  data: any;
  title: string;
}) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://nko-don.vercel.app/logo.png"
          alt="N'KO DON Logo"
          style={{ maxWidth: "150px" }}
        />
      </div>

      <h2 style={{ textAlign: "center", color: "#333" }}>{title}</h2>
      <p style={{ fontSize: "16px", color: "#555" }}>Bonjour {data.name},</p>

      {data.type === "PENDING" && (
        <p style={{ fontSize: "16px", color: "#555" }}>
          Votre demande d'inscription est en attente de validation. Nous vous
          informerons une fois qu'elle sera traitée.
        </p>
      )}
      {data.type === "APPROVED" && (
        <p style={{ fontSize: "16px", color: "#28a745" }}>
          🎉 Félicitations ! Votre compte a été approuvé. Vous pouvez maintenant
          accéder à la plateforme en cliquant ci-dessous.
        </p>
      )}
      {data.type === "DISMISSED" && (
        <p style={{ fontSize: "16px", color: "#d9534f" }}>
          ❌ Nous sommes désolés, mais votre demande a été supendu. Contactez
          notre équipe pour plus d'informations sur Bambaranko@gmail.com.
        </p>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a
          href="https://nko-don.vercel.app"
          style={{
            textDecoration: "none",
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 20px",
            borderRadius: "5px",
            display: "inline-block",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Aller sur N'KO DON
        </a>
      </div>

      <p
        style={{
          fontSize: "16px",
          color: "#555",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <strong>L'équipe N'KO DON</strong> |
        <a
          href="https://nko-don.vercel.app"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Visitez notre site
        </a>
      </p>
    </div>
  );
}
