"use client";
import AuthForm from "@/components/AuthForm";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Connexion réussie. Connectez-vous!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/login");
      } else {
        notification.error({ message: data.message });
      }
    } catch (error) {
      notification.error({ message: "Une erreur s'est produite" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg w-full">
      <h2 className="text-center text-3xl font-bold">Créer un compte</h2>
      <p className="mt-2  text-center text-sm">
        Ou{" "}
        <Link
          href="/login"
          className="font-medium text-primary-default hover:text-light-default"
        >
          connectez-vous
        </Link>
      </p>
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-4 shadow-lg sm:rounded-lg sm:px-10">
          <AuthForm
            isLoading={loading}
            onFinish={handleRegister}
            type="register"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
