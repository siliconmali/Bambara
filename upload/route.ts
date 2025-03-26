import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function POST(req: NextRequest) {
  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "Nom de fichier ou type invalide" }, { status: 400 });
    }


    const key = `uploads/${Date.now()}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: fileType,
      ACL: "private",
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

    return NextResponse.json({ 
      uploadUrl, 
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

