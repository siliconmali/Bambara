"use client";

import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import TranslateTable from "@/components/TranslateTable";
import EditTranslationModal from "@/components/EditForm";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";

interface DataEntry {
  id: string;
  audio: string;
  bambara?: string;
  nko?: string;
  frenbam?: string;
  english?: string;
}

export default function Page() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<DataEntry | null>(null);
  const { data: session } = useSession();


  useEffect(() => {
    const disableContextMenu = (event: Event) => event.preventDefault();
    const disableDrag = (event: Event) => event.preventDefault();

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("dragstart", disableDrag);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("dragstart", disableDrag);
    };
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/data");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des données");
      const result = await response.json();
      setData(result);
    } catch (error) {
      message.error("Impossible de récupérer les données.");
    } finally {
      setLoading(false);
    }
  };


  const openModal = (record: DataEntry) => {
    setEditingData(record);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedValues: any) => {
    const payload = {
      ...updatedValues,
      userId: session?.user.id, 
    };
    try {
      if (!editingData) return;

      const response = await fetch(`/api/data/${editingData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Échec de la mise à jour");
      toast.success("Traduction mise à jour avec succès.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      message.error("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="px-4 mx-auto py-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Données de Traduction</h2>
      {loading ? (
        <Spin size="large" className="block mx-auto my-10" />
      ) : (
        <TranslateTable data={data} onEdit={openModal} />
      )}
      <EditTranslationModal
        visible={isModalOpen}
        data={editingData}
        onCancel={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
