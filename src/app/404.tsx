import React from "react";
import { Home } from "lucide-react";
import { Button } from "antd";
import Link from "next/link";

export const Custom404 = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center">
      <Home size={64} className="text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold text-black mb-2">
        Page Non Trouve
      </h1>
      <p className="text-gray-600  mb-6">
        Cette page est en cours de construction
      </p>
      <Link
        href={"/"}
      >
        <Button type="primary">Go Home</Button>
      </Link>
    </div>
  );
};
