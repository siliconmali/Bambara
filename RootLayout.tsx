"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GlobalLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const pathname = usePathname();

  const publicRoutes = ["/", "/guide", "/about", "/contact", "/legal"];
  const authRoutes = ["/login", "/register", "/approval", "forgot-password", "/reset-password"];

  const shouldShowHeaderFooter =
    !authRoutes.includes(pathname) && 
    (publicRoutes.includes(pathname) || 
    (session &&
      session.user.role !== "admin" &&
      session.user.role !== "manager" &&
      session.user.status === "APPROVED"));
 console.log(shouldShowHeaderFooter)
  return (
    <>
      {shouldShowHeaderFooter && <Header user={session?.user} />}
      <main className="min-h-[85vh] mt-12">{children}</main>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}