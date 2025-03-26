"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Divider,
  Collapse,
  AutoComplete,
  AutoCompleteProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";

const { TextArea } = Input;
const { Panel } = Collapse;

interface AdminWordFormProps {
  mode: "add" | "edit";
  initialValues?: any;
  onWordSaved: () => void;
  onCancel?: () => void;
}

export default function AdminWordForm({
  mode,
  initialValues,
  onWordSaved,
  onCancel,
}: AdminWordFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dictionary, setDictionary] = useState<{ word: string }[]>([]);
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AutoCompleteProps["options"]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [mode, initialValues]);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch("/api/dictionary");
        if (!response.ok) throw new Error("Failed to load dictionary.");
        const data = await response.json();
        const words = data.dictionary.map((item: any) => item.word);
        setDictionary(data.dictionary || []);
        setWordSuggestions(words);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
        setDictionary([]);
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

  const checkDuplicate = (word: string) => {
    return dictionary.some(
      (item) => item.word.toLowerCase() === word.toLowerCase()
    );
  };

  const handleWordChange = (value: string) => {
    setIsDuplicate(checkDuplicate(value));
    form.setFieldsValue({ word: value });
  };

  const handleSubmit = async (values: any) => {
    if (mode === "add" && isDuplicate) {
      message.error("Ce mot existe déjà dans le dictionnaire.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/dictionary", {
        method: mode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(
          mode === "add" ? "Ajout échoué" : "Mise à jour échouée"
        );

      toast.success(
        mode === "add"
          ? "Mot ajouté avec succès"
          : "Mot mis à jour avec succès",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: false,
        }
      );

      form.resetFields();
      onWordSaved();
    } catch (error) {
      message.error("Une erreur s'est produite.");
    } finally {
      setLoading(false);
      if (mode === "edit" && onCancel) onCancel();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4  h-[60vh] overflow-hidden">
      <ToastContainer />
      {mode === "edit" && (
        <h2 className="className=" text-lg font-bold mb-4>
          ✏️ Modifier le mot
        </h2>
      )}

      <div className="h-full overflow-y-auto p-2">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Mot"
            name="word"
            rules={[{ required: true, message: "Veuillez entrer un mot" }]}
          >
            <AutoComplete
              options={wordSuggestions.map((word) => ({ value: word }))}
              onSearch={(value) => {
                const filtered = wordSuggestions.filter((w) =>
                  w.toLowerCase().includes(value.toLowerCase())
                );
                setWordSuggestions(filtered);
              }}
              onChange={handleWordChange}
              placeholder="Entrez le mot"
            >
              <Input />
            </AutoComplete>
          </Form.Item>

          {isDuplicate && (
            <p className="text-red-500 text-sm mb-2">
              ⚠️ Ce mot existe déjà dans le dictionnaire.
            </p>
          )}

          <Divider>Définitions</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Bambara" name={["definition", "bam"]}>
              <AutoComplete
                options={filteredSuggestions}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={inputValue}
                onChange={(text) => setInputValue(text)}
                style={{ width: "100%" }}
              >
                <TextArea rows={2} placeholder="Définition en Bambara" />
              </AutoComplete>
            </Form.Item>
            <Form.Item label="Anglais" name={["definition", "eng"]}>
              <TextArea rows={2} placeholder="Définition en Anglais" />
            </Form.Item>
            <Form.Item label="Français" name={["definition", "fren"]}>
              <TextArea rows={2} placeholder="Définition en Français" />
            </Form.Item>
          </div>

          <Collapse className="mt-4">
            <Panel header="Exemples" key="1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Bambara" name={["example", "bam"]}>
                  <AutoComplete
                    options={filteredSuggestions}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    value={inputValue}
                    onChange={(text) => setInputValue(text)}
                    style={{ width: "100%" }}
                  >
                    <TextArea rows={2} placeholder="Exemple en Bambara" />
                  </AutoComplete>
                </Form.Item>
                <Form.Item label="Anglais" name={["example", "eng"]}>
                  <TextArea rows={2} placeholder="Exemple en Anglais" />
                </Form.Item>
                <Form.Item label="Français" name={["example", "fren"]}>
                  <TextArea rows={2} placeholder="Exemple en Français" />
                </Form.Item>
              </div>
            </Panel>

            <Panel header="Informations supplémentaires (Facultatif)" key="2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Variantes" name="variant">
                  <AutoComplete
                    options={filteredSuggestions}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    value={inputValue}
                    onChange={(text) => setInputValue(text)}
                    style={{ width: "100%" }}
                  >
                    <Input placeholder="ex: variante1, variante2" />
                  </AutoComplete>
                </Form.Item>
                <Form.Item label="Synonymes" name="synonym">
                  <AutoComplete
                    options={filteredSuggestions}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    value={inputValue}
                    onChange={(text) => setInputValue(text)}
                    style={{ width: "100%" }}
                  >
                    <Input placeholder="ex: synonyme1, synonyme2" />
                  </AutoComplete>
                </Form.Item>
                <Form.Item label="Antonymes" name="antonym">
                  <AutoComplete
                    options={filteredSuggestions}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    value={inputValue}
                    onChange={(text) => setInputValue(text)}
                    style={{ width: "100%" }}
                  >
                    <Input placeholder="ex: antonyme1, antonyme2" />
                  </AutoComplete>
                </Form.Item>
                <Form.Item label="Notes d'utilisation" name="usage">
                  <TextArea rows={2} placeholder="Utilisation du mot" />
                </Form.Item>
              </div>
            </Panel>
          </Collapse>

          <Form.Item className="text-center mt-4">
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={loading}
              className="w-full"
              disabled={isDuplicate && mode === "add"}
            >
              {mode === "add" ? "Ajouter le mot" : "Mettre à jour"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
