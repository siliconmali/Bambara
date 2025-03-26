"use client";

import { useState } from "react";
import { Card, Form, Typography } from "antd";
import UploadForm from "@/components/UploadForm";
import { uploadToS3 } from "@/utils/UploadToS3";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function UploadPage() {
  const [form] = Form.useForm();
  const [fileType, setFileType] = useState<"nko" | "bambara">("bambara");
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (values: any, audioFile: File | null) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let audioUrl = null;

      if (audioFile) {
        audioUrl = await uploadToS3(audioFile);
        if (!audioUrl) {
          setErrorMessage(
            "Le téléversement de l'audio a échoué. Veuillez réessayer."
          );
          return;
        }
      }

      const endpoint = fileType === "nko" ? "/api/nko" : "/api/bambara";


      const payload = fileType === "nko"
        ? {
            nko: values.nko,
            bambara: values.frenbam || "",
            english: values.english || "",
            userId: session?.user.id,
          }
        : {
            audio: audioUrl, 
            bambara: values.bambara || "",
            nko: values.nko || "",
            frenbam: values.frenbam || "",
            english: values.english || "",
            userId: session?.user.id,
          };

      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Televersement du formulaire reussie.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            form.resetFields();
            setFileType("bambara");
          },
        });
        router.push('/translate')


      }
    } catch (error) {
      setErrorMessage("Erreur lors du téléversement. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 md:px-4 mt-20">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl rounded-lg p-2">
          <Title level={2} className="text-center mb-2">
            Téléverser et Traduire des Documents
          </Title>
          <h2 className="text-xl font-semibold mb-2 text-center">
            Sélectionnez le type de document
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              className={`p-2 border-2 rounded-lg transition-all duration-200 ${
                fileType === "bambara"
                  ? "border-primary-default bg-light-default shadow-md"
                  : "border-solid-50 hover:border-primary-default hover:shadow"
              }`}
              onClick={() => setFileType("bambara")}
            >
              <h3 className="text-lg font-semibold  text-center">
                Bambara
              </h3>
              <p className="text-content-secondary text-center">
                Documents en langue Bambara
              </p>
            </button>
            <button
              className={`p-2 border-2 rounded-lg transition-all duration-200 ${
                fileType === "nko"
                  ? "border-primary-default bg-light-default shadow-md"
                  : "border-solid-50 hover:border-primary-default hover:shadow"
              }`}
              onClick={() => setFileType("nko")}
            >
              <h3 className="text-lg font-semibold text-center">N'ko</h3>
              <p className="text-content-secondary text-center">
                Documents en langue N'ko
              </p>
            </button>
          </div>

          <div className="mt-6">
            {fileType && (
              <UploadForm
              form={form}
                type={fileType}
                onSubmit={handleSubmit}
                errorMessage={errorMessage || ""}
                isLoading={isLoading}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
