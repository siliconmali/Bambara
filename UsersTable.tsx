"use client";

import { User, UserStatus } from "@prisma/client";
import { Button, message, Popconfirm, Select, Table, Tag } from "antd";

import { useSession } from "next-auth/react";
import React from "react";

interface UserTableProps {
  users: {
    id: string;
    role: string;
    email: string;
    status: UserStatus;
    surname: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    resetToken: string | null;
    resetTokenExpires: Date | null;
  }[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: "PENDING" | "APPROVED" | "DISMISSED") => void;
  onUpdateRole: (id: string, role: "user" | "manager" | "admin") => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  onUpdate,
  onUpdateRole,
  loading,
}) => {
  const { data: session } = useSession();

  const columns = [
    {
      title: "Prenom",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rôle",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: User) => {
        const isAdmin = session?.user.role === "admin";
        return isAdmin ? (
          <Select
            value={role}
            onChange={(newRole) => onUpdateRole(record.id, newRole as "user" | "manager" | "admin")}
            disabled={!isAdmin}
            style={{ width: 120 }}
          >
            <Select.Option value="user">Utilisateur</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        ) : (
          role
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "APPROVED") color = "#008751";
        if (status === "DISMISSED") color = "#CE1126";
        return (
          <Tag color={color}>
            {status === "PENDING"
              ? "En Attente"
              : status === "APPROVED"
              ? "Active"
              : "Suspendu"}
          </Tag>
        );
      },
    },
    {
      title: "Files Uploaded",
      dataIndex: "data",
      key: "filesUploaded",
      render: (data: { id: string }[] | undefined) => data?.length || 0,
    },
    ...(session?.user.role === "admin"
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (_: string, record: User) => {
              const isPending = record.status === "PENDING";
              const isApproved = record.status === "APPROVED";
  
              return (
                <>
                  <Button
                    onClick={() =>
                      onUpdate(
                        record.id,
                        isPending ? "APPROVED" : isApproved ? "DISMISSED" : "APPROVED"
                      )
                    }
                    style={{
                      marginRight: "8px",
                      backgroundColor: isPending
                        ? "#008751"
                        : isApproved
                        ? "#CE1126"
                        : "#FCD116",
                      color: "white",
                      border: "none",
                    }}
                  >
                    {isPending ? "Activer" : isApproved ? "Suspendre" : "Activer"}
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to delete this user?"
                    onConfirm={() => onDelete(record.id)}
                  >
                    <Button danger>Suprimer</Button>
                  </Popconfirm>
                </>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="id"
      size="small"
      className="my-2"
      pagination={{ pageSize: 12 }}
    />
  );
};

export default UserTable;
