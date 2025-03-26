"use client";
import EditTranslationModal from "@/components/EditForm";
import TranslateTable from "@/components/TranslateTable";
import { message, Spin } from "antd";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface DataEntry {
  id: string;
  audio: string;
  bambara?: string;
  nko?: string;
  frenbam?: string;
  english?: string;
}
function page() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<DataEntry | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchData();
    fetchUsers();
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
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/data/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      toast.success("Traduction supprimée avec succès.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      fetchData();
    } catch (error) {
      message.error("Erreur lors de la suppression.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des utilisateurs");
      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      message.error("Impossible de récupérer les utilisateurs.");
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
    <div className=" mx-auto ">
      <ToastContainer />
      {loading ? (
        <Spin size="large" className="block mx-auto my-10" />
      ) : (
        <TranslateTable
          data={data}
          onEdit={openModal}
          onDelete={handleDelete}
          users={users}
        />
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

export default page;
