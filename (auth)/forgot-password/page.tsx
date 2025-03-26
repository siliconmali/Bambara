"use client";
import { Form, Input, Button, notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Un lien de réinitialisation vous a été envoyé.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/login");
      } else {
        notification.error({ message: data.message || "Erreur inconnue" });
      }
    } catch (error) {
      notification.error({ message: "Erreur interne du serveur." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg w-full shadow-lg sm:rounded-lg p-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Mot de passe oublié
      </h2>
      <p className="text-center text-content-secondary mb-6">
        Entrez votre e-mail pour recevoir un lien de réinitialisation.
      </p>
      <Form layout="vertical" onFinish={handleSubmit} className="w-full">
        <Form.Item
          label="Adresse e-mail"
          name="email"
          rules={[
            { required: true, message: "Veuillez entrer votre email!" },
            { type: "email", message: "Format d'email invalide!" },
          ]}
        >
          <Input placeholder="Entrez votre e-mail" className="w-full" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="w-full"
        >
          Envoyer le lien
        </Button>
      </Form>
    </div>
  );
};

export default page;
