"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Tabs,
  message,
  Modal,
  Form,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Trash } from "lucide-react";
import AddNkoWordForm from "@/components/admin/AddNkoForm";


const { Option } = Select;

export default function NkoDictionary() {
  const [dictionary, setDictionary] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingWord, setEditingWord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchDictionary();
  }, []);

  const fetchDictionary = async (letter: string | null = null) => {
    setLoading(true);
    try {
      let url = "/api/nko";
      if (letter) url += `?letter=${letter}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Échec du chargement du dictionnaire");

      const data = await response.json();
      setDictionary(data.dictionary || []);
      setFilteredData(data.dictionary || []);
    } catch (error) {
      message.error("❌ Impossible de récupérer le dictionnaire.");
    } finally {
      setLoading(false);
    }
  };

  const handleLetterChange = (value: string) => {
    setSelectedLetter(value);
    fetchDictionary(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filtered = dictionary.filter((word) =>
      word.nko.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEditClick = (word: any) => {
    setEditingWord(word);
    editForm.setFieldsValue(word);
    setIsEditModalVisible(true);
  };

  const handleDeleteWord = async (word: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/nko?word=${word}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression.");
      }

      message.success(`✅ Mot "${word}" supprimé avec succès.`);
      fetchDictionary(selectedLetter);
    } catch (error) {
      message.error("❌ Impossible de supprimer le mot.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "N'Ko",
      dataIndex: "nko",
      key: "nko",
      sorter: (a: any, b: any) => a.nko.localeCompare(b.nko),
    },
    {
      title: "Bambara",
      dataIndex: ["bam"],
      key: "definition.bam",
    },
    {
      title: "Anglais",
      dataIndex: ["eng"],
      key: "eng",
    },
    {
      title: "Français",
      dataIndex: ["fren"],
      key: "fren",
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            type="primary"
          />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ce mot ?"
            onConfirm={() => handleDeleteWord(record.nko)}
            okText="Oui"
            cancelText="Non"
          >
            <Button danger icon={<Trash />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-2">📚 Gestion du dictionnaire N'Ko</h2>
      <Tabs
        defaultActiveKey="dictionary"
        items={[
          {
            label: "📖 Dictionnaire N'Ko",
            key: "dictionary",
            children: (
              <>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <Select
                    allowClear
                    placeholder="Filtrer par lettre"
                    onChange={handleLetterChange}
                    style={{ width: 160 }}
                  >
                    {Array.from("abcdeɛfghijklmnɲŋoɔpqrstuvwxyz").map(
                      (letter) => (
                        <Option key={letter} value={letter}>
                          {letter.toUpperCase()}
                        </Option>
                      )
                    )}
                  </Select>
                  <Input
                    placeholder="Chercher par mot en N'Ko..."
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: 200 }}
                  />
                </div>

                <Table
                  size="small"
                  dataSource={filteredData}
                  columns={columns}
                  rowKey="nko"
                  loading={loading}
                  pagination={{ pageSize: 8 }}
                />
              </>
            ),
          },
          {
            label: "✏️ Ajouter un mot en N'Ko",
            key: "add",
            children: (
              <AddNkoWordForm
                mode="add"
                onWordSaved={() => fetchDictionary(selectedLetter)}
              />
            ),
          },
        ]}
      />
      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        style={{
          padding: 0,
        }}
        footer={null}
      >
        <AddNkoWordForm
          mode="edit"
          initialValues={editingWord}
          onWordSaved={() => {
            fetchDictionary(selectedLetter);
            setIsEditModalVisible(false);
          }}
          onCancel={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </div>
  );
}