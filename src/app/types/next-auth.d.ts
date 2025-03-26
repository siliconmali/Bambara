import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    surname?: string; 
    lastName?: string; 
    role: string;
    status: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      surname?: string; 
      lastName?: string;
      role: string;
      status: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    surname?: string; 
    lastName?: string; 
    role: string;
    status: string;
  }
}