import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

type NkoWord = {
  nko: string;
  bam: string;
  fren: string;
  eng: string;
};

type NkoDictionary = {
  dictionary: NkoWord[];
};

const streamToString = async (stream: Readable): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf-8");
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const letter = searchParams.get("letter")?.toLowerCase();

    if (letter && letter.length === 1) {
      const key = `nko-dictionary/${letter}.json`;
      try {
        const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
        const response = await s3.send(command);
        const jsonData = await streamToString(response.Body as Readable);
        return NextResponse.json(JSON.parse(jsonData));
      } catch (error: any) {
        if (error.name === "NoSuchKey") {
          return NextResponse.json({ dictionary: [] });
        }
        throw error;
      }
    } else {
      const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: "nko-dictionary/",
      });

      const listResponse = await s3.send(listCommand);
      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        return NextResponse.json({ dictionary: [] });
      }

      let allWords: NkoWord[] = [];
      for (const item of listResponse.Contents) {
        if (item.Key) {
          try {
            const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: item.Key });
            const response = await s3.send(command);
            const jsonData = await streamToString(response.Body as Readable);
            const parsedData: NkoDictionary = JSON.parse(jsonData);
            allWords = [...allWords, ...parsedData.dictionary];
          } catch (error) {
            console.error(`Failed to fetch ${item.Key}:`, error);
          }
        }
      }
      return NextResponse.json({ dictionary: allWords });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load dictionary", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newWord: NkoWord = await req.json();
    const firstLetter = newWord.nko.charAt(0).toLowerCase();
    const key = `nko-dictionary/${firstLetter}.json`;

    let dictionary: NkoDictionary = { dictionary: [] };
    try {
      const getCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
      const response = await s3.send(getCommand);
      const jsonData = await streamToString(response.Body as Readable);
      dictionary = JSON.parse(jsonData);
    } catch (error: any) {
      if (error.name !== "NoSuchKey") throw error;
    }

    dictionary.dictionary.push(newWord);
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(dictionary, null, 2),
      ContentType: "application/json",
    });

    await s3.send(putCommand);
    return NextResponse.json({ message: "Word added successfully", word: newWord });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to add new word", details: error.message },
      { status: 500 }
    );
  }
}
