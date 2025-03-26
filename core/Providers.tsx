'use client'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import AppThemeProvider from "../ThemeProvider/AppTheme";

export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </SessionProvider>
  );
}