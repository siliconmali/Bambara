export async function uploadToS3(file: File): Promise<string | null> {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    const { uploadUrl, fileUrl } = await response.json();
    if (!uploadUrl) throw new Error("Impossible d'obtenir l'URL de téléversement");

    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    return fileUrl;
  } catch (error) {
    console.error("Erreur d'upload:", error);
    return null;
  }
}