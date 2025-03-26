import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { Dictionary, Word } from "@/app/types/dictionary";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

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
      const key = `dictionary/${letter}.json`;

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
        Prefix: "dictionary/",
      });

      const listResponse = await s3.send(listCommand);

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        return NextResponse.json({ dictionary: [] });
      }

      let allWords: Word[] = [];

      for (const item of listResponse.Contents) {
        if (item.Key) {
          try {
            const command = new GetObjectCommand({
              Bucket: BUCKET_NAME,
              Key: item.Key,
            });
            const response = await s3.send(command);
            const jsonData = await streamToString(response.Body as Readable);
            const parsedData: Dictionary = JSON.parse(jsonData);

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
    const newWord: Word = await req.json();
    const firstLetter = newWord.word.charAt(0).toLowerCase();
    const key = `dictionary/${firstLetter}.json`;

    let dictionary: Dictionary = { dictionary: [] };

    try {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });
      const response = await s3.send(getCommand);
      const jsonData = await streamToString(response.Body as Readable);
      dictionary = JSON.parse(jsonData);
    } catch (error: any) {
      if (error.name !== "NoSuchKey") throw error;
    }

    const wordExists = dictionary.dictionary.some(
      (entry) => entry.word.toLowerCase() === newWord.word.toLowerCase()
    );

    if (wordExists) {
      return NextResponse.json(
        { error: "This word already exists in the dictionary." },
        { status: 400 }
      );
    }

    dictionary.dictionary.push(newWord);

    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(dictionary, null, 2),
      ContentType: "application/json",
    });

    await s3.send(putCommand);

    return NextResponse.json({
      message: "Word added successfully",
      word: newWord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to add new word", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedWord: Word = await req.json();
    const firstLetter = updatedWord.word.charAt(0).toLowerCase();
    const key = `dictionary/${firstLetter}.json`;

    let dictionary: Dictionary = { dictionary: [] };

    try {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });
      const response = await s3.send(getCommand);
      const jsonData = await streamToString(response.Body as Readable);
      dictionary = JSON.parse(jsonData);
    } catch (error: any) {
      if (error.name !== "NoSuchKey") throw error;
    }

    const wordIndex = dictionary.dictionary.findIndex(
      (entry) => entry.word.toLowerCase() === updatedWord.word.toLowerCase()
    );

    if (wordIndex === -1) {
      return NextResponse.json(
        { error: "Word not found in dictionary." },
        { status: 404 }
      );
    }

    dictionary.dictionary[wordIndex] = updatedWord; 

    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(dictionary, null, 2),
      ContentType: "application/json",
    });

    await s3.send(putCommand);

    return NextResponse.json({
      message: "Word updated successfully",
      word: updatedWord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update word", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wordToDelete = searchParams.get("word");

    if (!wordToDelete) {
      return NextResponse.json(
        { error: "Missing word parameter." },
        { status: 400 }
      );
    }

    const firstLetter = wordToDelete.charAt(0).toLowerCase();
    const key = `dictionary/${firstLetter}.json`;

    let dictionary: Dictionary = { dictionary: [] };

    try {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });
      const response = await s3.send(getCommand);
      const jsonData = await streamToString(response.Body as Readable);
      dictionary = JSON.parse(jsonData);
    } catch (error: any) {
      if (error.name === "NoSuchKey") {
        return NextResponse.json(
          { error: "Dictionary file not found." },
          { status: 404 }
        );
      }
      throw error;
    }

    const newDictionary = dictionary.dictionary.filter(
      (entry) => entry.word.toLowerCase() !== wordToDelete.toLowerCase()
    );

    if (newDictionary.length === dictionary.dictionary.length) {
      return NextResponse.json({ error: "Word not found." }, { status: 404 });
    }

    dictionary.dictionary = newDictionary;

    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(dictionary, null, 2),
      ContentType: "application/json",
    });

    await s3.send(putCommand);

    return NextResponse.json({ message: "Word deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete word", details: error.message },
      { status: 500 }
    );
  }
}
