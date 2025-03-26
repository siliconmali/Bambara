"use client";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, AutoComplete, AutoCompleteProps } from "antd";
import { useSession } from "next-auth/react";

interface EditTranslationModalProps {
  visible: boolean;
  data: any | null;
  onCancel: () => void;
  onUpdate: (values: any) => void;
}

const EditTranslationModal: React.FC<EditTranslationModalProps> = ({
  visible,
  data,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const {data: session} = useSession()
 const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AutoCompleteProps["options"]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch("/api/dictionary");
        if (!response.ok) throw new Error("Failed to load dictionary.");
        const data = await response.json();
        const words = data.dictionary.map((item: any) => item.word);
        setWordSuggestions(words);
      } catch (error) {
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


  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        bambara: data.bambara,
        nko: data.nko,
        frenbam: data.frenbam,
        english: data.english,
      });
    }
  }, [data]);

  return (
    <Modal
      title="Modifier la traduction"
      open={visible}
      onCancel={onCancel}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Enregistrer
        </Button>,
      ]}
    >
      {data?.audio && (
        <div className="mb-4">
          <p className="text-content-default font-semibold">
            Écouter l'audio :
          </p>
          <audio controls className="w-full mt-2">
            <source src={data.audio} type="audio/mpeg" />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </div>
      )}
      <Form form={form} layout="vertical" onFinish={onUpdate}>
        <Form.Item label="Bambara" name="bambara">
          <AutoComplete
            options={filteredSuggestions}
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={inputValue}
            onChange={(text) => setInputValue(text)}
            style={{ width: "100%" }}
            placeholder="Entrez un mot en Bambara..."
            className="w-full"
            disabled={!isAdmin && !!data?.bambara}
          >
            <Input.TextArea
              rows={2}
              
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item label="N'Ko" name="nko">
          <Input.TextArea
            rows={2}
            placeholder="Modifier la traduction en N'Ko..."
            disabled={!isAdmin && !!data?.nko}
          />
        </Form.Item>
        <Form.Item label="Français" name="frenbam">
          <Input.TextArea
            rows={2}
            placeholder="Modifier la traduction en Français..."
            disabled={!isAdmin && !!data?.frenchbam}
          />
        </Form.Item>
        <Form.Item label="Anglais" name="english" >
          <Input.TextArea
            rows={2}
            placeholder="Modifier la traduction en Anglais..."
            disabled={!isAdmin && !!data?.english}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTranslationModal;
