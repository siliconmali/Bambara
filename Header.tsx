"use client";
import { Avatar, Button, Drawer, Skeleton } from "antd";
import {
  BookOpen,
  FileUp,
  LanguagesIcon,
  LogOutIcon,
  Menu,
  SendIcon,
  SidebarCloseIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MobileNav from "./MobileNave";
import { useSession } from "next-auth/react";
import AppLogo from "./ui/AppLogo";
import UserProfile from "./ui/UserProfile";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

type Props = {
  user?: User;
  isLoading?: boolean;
};
function Header({ user, isLoading }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-light-default shadow-md fixed inset-x-0 top-0 z-50 text-content-default  font-bold ">
      <div className="max-w-8xl mx-auto px-3">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Avatar size="large">
                <AppLogo />
              </Avatar>
              <span className="ml-2 text-lg sm:text-xl font-bold">
                N&apos;KO
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center gap-20 ">
            <div className="flex md:space-x-4 lg:space-x-8 ">
              <Link
                href="/guide"
                className="flex items-center gap-2 text-sm  lg:text-base hover:text-primary-default"
              >
                <BookOpen size={20} /> Guide
              </Link>
              {user && (
                <div className="flex md:space-x-4 lg:space-x-8 ">
                  <Link
                    href="/upload"
                    className="flex items-center gap-2 text-sm  lg:text-base hover:text-primary-default"
                  >
                    <SendIcon size={20} /> Téléverser
                  </Link>
                  <Link
                    href="/translate"
                    className="flex items-center gap-2 text-sm  lg:text-base hover:text-primary-default"
                  >
                    <LanguagesIcon size={20} /> Traduire
                  </Link>
                </div>
              )}
            </div>

            {isLoading ? (
              <Skeleton avatar className="flex items-start" />
            ) : !user ? (
              <Button
                type="primary"
                size="large"
                className="hidden lg:inline-flex"
                onClick={() => router.replace("/login")}
              >
                Se connecter
              </Button>
            ) : (
              <UserProfile user={user} />
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button type="default" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <SidebarCloseIcon className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <Drawer
          placement="right"
          style={{
            background: "#d9f2e5",
          }}
          onClose={() => setIsOpen(false)}
          // extra={
          //   <div
          //     onClick={() => setIsOpen(false)}
          //     className="flex size-10 items-center justify-center rounded-full bg-surface-secondary p-1"
          //   >
          //     <img src="img1.jpg" alt="Mali_flag" />
          //   </div>
          // }
          width={240}
          open={isOpen}
          footer={
            <>
              {user ? (
                <UserProfile user={user} />
              ) : (
                <Button
                  type="primary"
                  size="large"
                  className="w-full"
                  onClick={() => router.replace("/login")}
                >
                  Se connecter
                </Button>
              )}
            </>
          }
        >
          <div className="flex flex-col gap-5 text-content-default font-bold">
            <Link
              href="/guide"
              className="flex items-center gap-5 text-base hover:text-primary-default"
            >
              <BookOpen size={20} /> Guide
            </Link>
            {user && (
              <div className="flex flex-col gap-5 ">
                <Link
                  href="/upload"
                  className="flex items-center gap-5 text-base hover:text-primary-default"
                >
                  <SendIcon size={20} /> Téléverser
                </Link>
                <Link
                  href="/translate"
                  className="flex items-center gap-5 text-base hover:text-primary-default"
                >
                  <LanguagesIcon size={20} /> Traduire
                </Link>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </nav>
  );
}

export default Header;
