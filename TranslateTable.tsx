import React from "react";
import { Table, Button, Popconfirm, Tag } from "antd";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { Delete, Divide, EditIcon, Trash } from "lucide-react";

interface DataEntry {
  id: string;
  audio: string;
  bambara?: string;
  nko?: string;
  frenbam?: string;
  english?: string;
  userId?: string;
  contributorIds?: string[];
}

interface TranslateTableProps {
  data: DataEntry[];
  onEdit: (record: DataEntry) => void;
  onDelete?: (id: string) => void;
  users?: User[];
}

const TranslateTable: React.FC<TranslateTableProps> = ({
  data,
  onEdit,
  onDelete,
  users,
}) => {
  const { data: user } = useSession();
  const getAudioType = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "ogg":
        return "audio/ogg";
      case "webm":
        return "audio/webm";
      default:
        return "audio/mpeg";
    }
  };

  const getUserName = (userId: string) => {
    const user = users?.find((u) => u.id === userId);
    return user ? user.name || user.email : "Admin";
  };

  const columns = [
    {
      title: "Écouter",
      dataIndex: "audio",
      key: "audio",
      width: 200,
      render: (audio: string) => (
        <div key={audio} className="w-full">
          <audio controls  controlsList="nodownload" className="w-full h-10">
            <source src={audio} type={getAudioType(audio)} />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </div>
      ),
    },
    {
      title: "Bambara",
      dataIndex: "bambara",
      key: "bambara",
      render: (text: string) => (
        <div className="line-clamp-1">
          {text || "N/A"}
        </div>
      )
    },
    {
      title: "N'Ko",
      dataIndex: "nko",
      key: "nko",
      render: (text: string) => (
        <span className="line-clamp-1">{text || "N/A"}</span>
      ),
    },
    {
      title: "Français",
      dataIndex: "frenbam",
      key: "frenbam",
      render: (text: string) => (
        <div className="line-clamp-1">
        {text || "N/A"}
      </div>
      )
    },
    {
      title: "Anglais",
      dataIndex: "english",
      key: "english",
      render: (text: string) =>(
        <div className="line-clamp-1">
          { text || "N/A"}
        </div>
      )
    },
    ...(user?.user.role === "admin"
      ? [
          {
            title: "Créé par",
            dataIndex: "userId",
            key: "userId",
            render: (userId: string) => (
              <Tag color="blue">{getUserName(userId)}</Tag>
            ),
          },
          // {
          //   title: "Contributions",
          //   dataIndex: "contributorIds",
          //   key: "contributorIds",
          //   render: (contributors: string[] = []) =>
          //     contributors.length > 0 ? (
          //       contributors.map((id) => (
          //         <div className="line-clamp-1 max-h-4"><Tag key={id}>{getUserName(id)}</Tag></div>
          //       ))
          //     ) : (
          //       <span>Aucun</span>
          //     ),
          // },
        ]
      : []),
    {
      title: "Actions",
      key: "actions",
      render: (_: string, record: DataEntry) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => onEdit(record)}
            icon={<EditIcon />}
          />

          {user?.user.role === "admin" && (
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer ?"
              onConfirm={() => onDelete && onDelete(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button danger icon={<Trash />} />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        scroll={{ x: 768 }}
        size="small"
        pagination={
          user?.user.role === "admin" || user?.user.role === "manager" ? { pageSize: 11 } : { pageSize: 15 }
        }
      />
    </div>
  );
};

export default TranslateTable;
