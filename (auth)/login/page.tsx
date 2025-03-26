"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session) {
      const { role, status } = session.user;

      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        if (status === "PENDING") {
          router.replace("/approval");
        } else if (status === "DISMISSED") {
          router.replace("/dismissed");
        } else if (status === "APPROVED") {
          router.replace("/home");
        }
      }
    }
  }, [session, router]);

  const handleLogin = async (values: any) => {
    setLoading(true);
    setErrorMessage(null);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      await update(); 
      toast.success("Connexion réussie", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      router.refresh();
      await new Promise((resolve) => setTimeout(resolve, 50));
      await update();
      const newSession = await getSession();

      if (!newSession?.user) {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        return;
      }

      if (newSession.user.role === "admin") {
        await update(); 
        router.replace("/admin/dashboard");
      } else {
        if (newSession.user.status === "PENDING") {
          router.replace("/approval");
        } else if (newSession.user.status === "DISMISSED") {
          router.replace("/dismissed");
        } else if (newSession.user.status === "APPROVED") {
          router.replace("/home");
        }
      }
    } else {
      setErrorMessage("Email ou mot de passe incorrect.");
    }

    setLoading(false);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg w-full shadow-lg sm:rounded-lg">
      <h2 className="mt-3 text-center text-3xl font-bold">
        Connexion à votre compte
      </h2>
      <p className="mt-2 text-center text-sm">
        Ou{" "}
        <Link
          href="/register"
          className="font-medium text-primary-default hover:text-light-default"
        >
          créez un nouveau compte
        </Link>
      </p>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sm:px-10 p-4">
          <AuthForm
            onFinish={handleLogin}
            isLoading={loading}
            type="login"
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
