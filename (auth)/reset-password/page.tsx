"use client";

import { Form, Input, Button, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <p className="text-center text-red-500">Lien Invalid.</p>;
  }

  const handleSubmit = async (values: { password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: values.password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          "Vous pouvez vous connecter avec votre nouveau mot de passe.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        router.push("/login");
      } else {
        notification.error({ message: data.message || "Error occurred" });
      }
    } catch (error) {
      notification.error({ message: "Internal Server Error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg w-full shadow-lg sm:rounded-lg p-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Nouveau mot de passe
      </h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nouveau mot de passe"
          name="password"
          rules={[{ required: true, message: "Nouveau mot de passe!" }]}
        >
          <Input.Password placeholder="Entrer un nouveau mot de passe" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Changer le mot de passe
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
