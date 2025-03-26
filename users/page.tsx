"use client";
import React, { useEffect, useState } from "react";
import { Input, message, Pagination } from "antd";
import UserTable from "@/components/admin/UsersTable";

interface User {
  id: string;
  role: string;
  email: string;
  surname: string;
  lastName: string;
  password: string;
  status: "PENDING" | "APPROVED" | "DISMISSED";
  createdAt: Date;
  updatedAt: Date;
  resetToken: string | null;
  resetTokenExpires: Date | null;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user?page=${page}&limit=${100}`);
      if (!response.ok) throw new Error("Échec du chargement des utilisateurs");
      const data = await response.json();
      setUsers(data.users);
      setTotalUsers(data.total);
      setFilteredUsers(data.users);
    } catch (error) {
      message.error("Impossible de récupérer les utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (
    id: string,
    status?: "PENDING" | "APPROVED" | "DISMISSED",
    role?: "user" | "manager" | "admin"
  ) => {
    try {
      setUpdatingUserId(id);

      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("Utilisateur introuvable.");

      const updateData: Partial<User> = {};
      if (status) updateData.status = status;
      if (role) updateData.role = role;

      const response = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Échec de la mise à jour de l'utilisateur");

      if (status) {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, status }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json();
          throw new Error(`Échec de l'envoi de l'email: ${errorData.error}`);
        }
      }

      message.success("Utilisateur mis à jour avec succès");
      fetchUsers(currentPage);
    } catch (error) {
      message.error("Échec de la mise à jour de l'utilisateur");
    } finally {
      setUpdatingUserId(null);
    }
  };


  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Échec de la suppression de l'utilisateur");

      message.success("Utilisateur supprimé avec succès");
      fetchUsers(currentPage);
    } catch (error) {
      message.error("Impossible de supprimer l'utilisateur");
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (!users || users.length === 0) return;

    if (value.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerCaseValue = value.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user?.surname?.toLowerCase().includes(lowerCaseValue) ||
          user?.lastName?.toLowerCase().includes(lowerCaseValue) ||
          user?.email?.toLowerCase().includes(lowerCaseValue) ||
          user?.role?.toLowerCase().includes(lowerCaseValue)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className=" space-y-4">
      <Input
        className="w-full"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher un utilisateur..."
      />

      <UserTable
        users={filteredUsers}
        onDelete={handleDeleteUser}
        onUpdate={handleUpdateUser}
        onUpdateRole={(id, role) => handleUpdateUser(id, undefined, role)}
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
