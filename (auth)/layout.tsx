import "../globals.css";
import "antd/dist/reset.css";
import Providers from "@/components/core/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (

        <Providers session={session}>
          <div className="min-h-screen flex flex-col items-center justify-center p-5 gap-5 ">
            <div className="flex items-center justify-center gap-2">
              <img src="/logo.png" alt="Nkodon-Logo" className="w-20 h-20 rounded-full " />
              <h1 className="text-6xl font-bold mt-7">Nkodon</h1>
            </div>
            {children}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Providers>
  );
}
