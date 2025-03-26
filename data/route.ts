import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import * as z from "zod"; 


const dataSchema = z.object({
  audio: z.string().url("URL audio invalide"),
  bambara: z.string().optional(),
  nko: z.string().optional(),
  frenbam: z.string().optional(),
  english: z.string().optional(),
  userId: z.string().min(1, "User ID requis"),
});


export async function GET(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    let data;

    if (token.role === "admin") {
      data = await db.data.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else {
      data = await db.data.findMany({
        where: {
          OR: [
            { bambara: null },
            { bambara: "" },
            { nko: null },
            { nko: "" },
            { frenbam: null },
            { frenbam: "" },
            { english: null },
            { english: "" },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    }

    const modifiedData = data.map((item) => ({
      ...item,
      audio: `/api/get-audio?id=${item.id}`, 
    }));

    return NextResponse.json(modifiedData);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors du chargement des données" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = dataSchema.safeParse(body);

    if (!validatedData.success) {

      return NextResponse.json({ error: "Données invalides", details: validatedData.error }, { status: 400 });
    }

    const { audio, bambara, nko, frenbam, english, userId } = validatedData.data;

    const newData = await db.data.create({
      data: {
        audio,
        bambara,
        nko,
        frenbam,
        english,
        userId,
        contributorIds: [userId],
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création des données" }, { status: 500 });
  }
}