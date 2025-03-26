"use client";

import {
  Upload,
  Form,
  Input,
  Button,
  message,
  Spin,
  Alert,
  FormInstance,
  AutoComplete,
} from "antd";
import { AudioOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { AutoCompleteProps } from "antd";
const { TextArea } = Input;
interface UploadFormProps {
  type: "nko" | "bambara";
  onSubmit: (values: any, audioFile: File | null) => void;
  errorMessage?: string;
  isLoading?: boolean;
  form: FormInstance;
}

export default function UploadForm({
  type,
  onSubmit,
  errorMessage,
  isLoading,
  form,
}: UploadFormProps) {
  const [fileList, setFileList] = useState<
    { originFileObj: File; name: string; status: "done"; uid: string }[]
  >([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AutoCompleteProps["options"]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch("/api/dictionary");
        if (!response.ok) throw new Error("Failed to load dictionary.");
        const data = await response.json();
        const words = data.dictionary.map((item: any) => item.word);
        setWordSuggestions(words);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };
    fetchDictionary();
  }, []);

  const handleSearch = (text: string) => {
    setInputValue(text);
    const words = text.trim().split(" ");
    const lastWord = words[words.length - 1];

    if (!lastWord) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = wordSuggestions
      .filter((word) => word.toLowerCase().startsWith(lastWord.toLowerCase()))
      .map((word) => ({ value: word }));

    setFilteredSuggestions(filtered);
  };

  const handleSelect = (selectedWord: string) => {
    let words = inputValue.trim().split(" ");
    words[words.length - 1] = selectedWord;
    const newText = words.join(" ");

    setInputValue(newText);
    form.setFieldsValue({ bambara: newText });
  };

  const startRecording = async () => {
    try {
      if (fileList.length > 0) {
        setFileList([]);
        message.info(
          "Enregistrement commencé, le fichier téléchargé a été supprimé."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });

        setFileList([
          {
            originFileObj: file,
            name: "recording.webm",
            status: "done",
            uid: Date.now().toString(),
          },
        ]);
        setAudioBlob(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      message.error(
        "Erreur lors de l'accès au microphone. Vérifiez vos permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleSubmit = (values: any) => {
    let audioFile = null;

    if (type === "bambara") {
      audioFile = fileList[0]?.originFileObj || null;
      if (!audioFile) {
        message.error("Veuillez télécharger ou enregistrer un fichier audio.");
        return;
      }
    }

    onSubmit(values, audioFile);
    form.resetFields();
    setFileList([]);
    setAudioBlob(null);
    setIsRecording(false);
  };

  const allowedAudioTypes = [
    "audio/webm",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "video/webm",
  ];

  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const uploadProps = {
    beforeUpload: (file: File) => {
      if (!allowedAudioTypes.includes(file.type)) {
        message.error(
          `${file.name} n'est pas un fichier audio valide. Formats acceptés : MP3, WAV, OGG, WebM`
        );
        return Upload.LIST_IGNORE;
      }

      if (isRecording) {
        stopRecording();
        message.info("Téléchargement commencé, l'enregistrement a été arrêté.");
      }
      const audioURL = URL.createObjectURL(file);
      setAudioSrc(audioURL);
      setAudioBlob(null);
      setTimeout(() => {
        setFileList([
          {
            uid: Date.now().toString(),
            originFileObj: file,
            name: file.name,
            status: "done",
          },
        ]);
      }, 0);

      return false;
    },
    fileList,
    maxCount: 1,
    onRemove: () => {
      setFileList([]);
      setAudioBlob(null);
      setAudioSrc(null);
    },
  };
  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudioBlob(null);
    setFileList([]);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
    >
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, marginBottom: 0 }}
          animate={{
            opacity: errorMessage ? 1 : 0,
            marginBottom: errorMessage ? 10 : 0,
          }}
        >
          <Alert type="error" showIcon message={errorMessage}></Alert>
        </motion.div>
      )}

      <div>
        {type === "nko" && (
          <div className="w-full">
            <Form.Item label="N'Ko" name="nko">
              <Input.TextArea
                rows={4}
                placeholder="Enter la version N'Ko ..."
                className="resize-none"
              />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item label="Français" name="frenbam">
                <Input.TextArea
                  rows={4}
                  placeholder="Entrer la version française ..."
                  className="resize-none"
                />
              </Form.Item>
              <Form.Item label="Anglais" name="frenbam">
                <Input.TextArea
                  rows={4}
                  placeholder="Entrer la version anglaise ..."
                  className="resize-none"
                />
              </Form.Item>
            </div>
          </div>
        )}

        {type === "bambara" && (
          <>
            <div className="bg-dark-900 text-white px-2 rounded-md border border-gray-700 mb-3">
              <h3 className="text-lg font-semibold mb-4">
                Téléverser ou Enregistrer un Audio
              </h3>
              <div className="flex flex-col items-center justify-center pb-3">
                {isRecording ? (
                  <div className="w-full max-w-md mt-4 flex flex-col items-center">
                    <p className="text-primary-default font-semibold">
                      🎤 Enregistrement en cours...
                    </p>
                    <Button
                      type="primary"
                      danger
                      onClick={stopRecording}
                      icon={<StopOutlined />}
                    >
                      Arrêter l'enregistrement
                    </Button>
                  </div>
                ) : audioBlob || audioSrc ? (
                  <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <audio controls className="w-full">
                      <source
                        src={audioSrc || URL.createObjectURL(audioBlob!)}
                      />
                      Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                    <Button
                      className="mt-2 text-red-500 flex items-center gap-2"
                      onClick={handleDeleteAudio}
                      icon={<DeleteOutlined />}
                      shape="round"
                      size="large"
                    >
                      Supprimer l'audio
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* @ts-ignore */}
                    <Upload.Dragger
                      {...uploadProps}
                      className="bg-light-default border-dashed border-content-secondary w-full text-center"
                    >
                      <p className="text-content-tertiary">
                        Déposez un fichier audio ici
                      </p>
                      <p className="text-content-secondary text-sm">- ou -</p>
                      <p className="text-content-tertiary">
                        Cliquez sur le bouton microphone en bas pour enregistrer
                      </p>
                    </Upload.Dragger>
                  </>
                )}

                <div className="flex items-center gap-4 mt-4">
                  {!isRecording && (
                    <Button
                      type={isRecording ? "dashed" : "primary"}
                      danger={isRecording}
                      onClick={startRecording}
                      icon={<AudioOutlined />}
                    >
                      Enregistrement vocal ici
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item label="Bambara" name="bambara">
                <AutoComplete
                  options={filteredSuggestions}
                  onSearch={handleSearch}
                  onSelect={handleSelect}
                  value={inputValue}
                  onChange={(text) => setInputValue(text)}
                  placeholder="Entrez un mot en Bambara..."
                  style={{ width: "100%" }}
                >
                  <Input.TextArea rows={4} className="resize-none" />
                </AutoComplete>
              </Form.Item>
              <Form.Item label="N'Ko" name="nko">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter la version N'Ko ..."
                  className="resize-none"
                />
              </Form.Item>
              <Form.Item label="Français" name="frenbam">
                <Input.TextArea
                  rows={4}
                  placeholder="Entrer la version française ..."
                  className="resize-none"
                />
              </Form.Item>
              <Form.Item label="Anglais" name="english">
                <Input.TextArea
                  rows={4}
                  placeholder="Entrer la version anglaise ..."
                  className="resize-none"
                />
              </Form.Item>
            </div>
          </>
        )}
      </div>

      <Form.Item className="text-center mt-8">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          {type !== "bambara" ? "Envoyer" : "Enregistrer & Envoyer"}
        </Button>
      </Form.Item>
    </Form>
  );
}
