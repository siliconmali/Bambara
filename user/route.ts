import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod"; 
// define a schema for input validation with zod
const schema = z.object({ 
   surname: z.string().min(3, "Le prénom est requis"),
  lastName: z.string().min(3, "Le nom est requis"),
   email: z.string().email('Adresse email invalide').refine((val) => val.length > 0, { message: 'Ce champ est requis' }),
   password: z.string().min(8, 'Entre au moins 8 characteres').max(50, 'Mot de passe trop long').refine((val) => val.length > 0, { message: 'Ce champ est requis' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, surname, lastName } = schema.parse(body);
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Cet utlisateur exist deja" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: { surname, lastName,email, password: hashedPassword },
    });


    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "Utilisateur cree avec succes" }, { status: 201 });
  } catch (error) {
   return NextResponse.json({ user: null, message: "Une erreur s'est produite" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    


    const totalUsers = await db.user.count(
      {where: { role: { not: "admin" } },}
    );


    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        surname: true,
        lastName: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        data: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json({ users, total: totalUsers });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Échec de la récupération des utilisateurs." },
      { status: 500 }
    );
  }
}