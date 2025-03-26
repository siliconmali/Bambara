import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function GET(req: NextRequest) {
  try {
    // ✅ Ensure user is authenticated
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // ✅ Get audio ID from request
    const { searchParams } = new URL(req.url);
    const audioId = searchParams.get("id");

    if (!audioId) {
      return NextResponse.json({ error: "ID audio manquant" }, { status: 400 });
    }

    // ✅ Fetch the audio file from database
    const audio = await db.data.findUnique({
      where: { id: audioId },
    });

    if (!audio) {
      return NextResponse.json({ error: "Fichier audio introuvable" }, { status: 404 });
    }

    let fileKey;
    if (audio.audio.startsWith("https://")) {
      const urlParts = new URL(audio.audio);
      fileKey = urlParts.pathname.substring(1); // Remove leading slash
    } else {
      return NextResponse.json({ error: "Clé de fichier invalide" }, { status: 400 });
    }

    // ✅ Stream the audio securely (NO PUBLIC URL)
    if (!process.env.AWS_BUCKET_NAME) {
      return NextResponse.json({ error: "Nom de bucket AWS manquant" }, { status: 500 });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    const audioStream = s3.getObject(params).createReadStream();
    return new Response(audioStream as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'audio:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}