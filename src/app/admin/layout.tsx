"use client";

import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Avatar, Divider } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Menu as MenuIcon,
  X,
  LogOutIcon,
  Heart,
  Database,
  BookAIcon,
  BookImage,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import "antd/dist/reset.css";
import { signOut, useSession } from "next-auth/react";
import { Footer } from "antd/es/layout/layout";
import NavLink from "@/components/admin/NavLink";
import UserProfile from "@/components/ui/UserProfile";

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [hasUpdated, setHasUpdated] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.refresh();
      window.location.reload();
    }
  }, [status, router]);

  return (
    <Layout className="-mt-12 max-h-screen">
      <Sider trigger={null} className="bg-light-default" width={170}>
        <div className="flex items-center gap-3 p-3 text-primary-default font-bold">
          <Avatar shape="circle" size={"large"} src="/logo.png" />
          <h2 className="text-xl mt-2  ">NKO DON</h2>
        </div>
        <Divider className="-mt-1" />
        <Menu
          mode="inline"
          className="bg-light-default text-content-default font-bold"
          selectedKeys={[pathname]}
          items={[
            {
              key: "/admin/dashboard",
              icon: <LayoutDashboard />,
              label: <NavLink href="/admin/dashboard">Tableau</NavLink>,
            },
            {
              key: "/admin/users",
              icon: <Users />,
              label: <NavLink href="/admin/users">Utilisateurs</NavLink>,
            },
            {
              key: "/admin/data",
              icon: <Database />,
              label: <NavLink href="/admin/data">Données</NavLink>,
            },
            {
              key: "/admin/dictionary",
              icon: <BookAIcon />,
              label: <NavLink href="/admin/dictionary">Dictionnaire</NavLink>,
            },
            {
              key: "/admin/nko",
              icon: <BookImage />,
              label: <NavLink href="/admin/nko">Nko</NavLink>,
            },
          ]}
        />
        <div className="absolute bottom-3 w-full p-3">
          <Button
            type="primary"
            icon={<LogOutIcon />}
            onClick={handleLogout}
            loading={loading}
          >
            Se déconnecter
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          className="bg-light-default mx-1 h-12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <UserProfile user={session?.user} />
          </div>
        </Header>
        <Content className="p-3 h-screen">{children}</Content>
        <Footer className="h-1 m-3 text-center z-20 flex justify-center items-center gap-3 bg-light-default text-content-default">
          Par <span className="text-sm text-primary-default">NKODON</span> @2025
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
