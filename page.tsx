"use client";
import Header from "@/components/Header";
import HomePage from "@/features/HomePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const userRole = session?.user?.role;

      if (userRole === "admin") {
        router.replace("/dashboard"); 
      } else {
        router.replace("/home"); 
      }
    }
  }, [status, session, router]);
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}
