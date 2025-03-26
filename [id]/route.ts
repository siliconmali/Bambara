import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";


const updateSchema = z.object({
  bambara: z.string().optional(),
  nko: z.string().optional(),
  frenbam: z.string().optional(),
  english: z.string().optional(),
  userId: z.string().min(1, "ID utilisateur requis"),
});


export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID de traduction invalide." }, { status: 400 });
    }

    const translation = await db.data.findUnique({
      where: { id },
    });

    if (!translation) {
      return NextResponse.json({ error: "Traduction introuvable." }, { status: 404 });
    }

    return NextResponse.json(translation, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID de la donnée invalide." }, { status: 400 });
    }

    const body = await request.json();
    const { userId, ...updatedData } = body;

    if (!userId) {
      return NextResponse.json({ error: "L'ID de l'utilisateur est requis." }, { status: 400 });
    }


    const existingData = await db.data.findUnique({
      where: { id },
      select: { contributorIds: true },
    });

    if (!existingData) {
      return NextResponse.json({ error: "Donnée introuvable." }, { status: 404 });
    }


    const updatedContributors = [
      ...new Set([userId, ...existingData.contributorIds.filter(id => id !== userId)])
    ];

    const updatedEntry = await db.data.update({
      where: { id },
      data: {
        ...updatedData,
        contributorIds: updatedContributors,
      },
    });

    return NextResponse.json({ message: "Donnée mise à jour avec succès.", data: updatedEntry }, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID de traduction invalide." }, { status: 400 });
    }

    await db.data.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Traduction supprimée avec succès." }, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}