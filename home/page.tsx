"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HomePage from "@/features/HomePage";

export default function Home() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [hasUpdated, setHasUpdated] = useState(false); 



  useEffect(() => {
    if (!session && status === "unauthenticated" && !hasUpdated) {
      update().then(() => {
        setHasUpdated(true); 
      });
    }
  }, [session, status, update, hasUpdated]);


  useEffect(() => {
    if (status === "unauthenticated" && hasUpdated) {
      router.refresh(); 
      window.location.reload(); 
    }
  }, [status, hasUpdated, router]);

 

  return (
    <div>
      <Header user={session?.user} isLoading={status === "loading"} />
      <HomePage />
    </div>
  );
}