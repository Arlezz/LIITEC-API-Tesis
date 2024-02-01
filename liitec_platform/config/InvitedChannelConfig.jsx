"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { Cpu, BarChart3, FileUp, Ban } from "lucide-react";

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const InvitedChannelTableRenderCell = (channel, columnKey, onOpen) => {

  const cellValue = channel[columnKey];

  switch (columnKey) {
    case "owner":
      return <div className="text-ellipsis">{channel.owner}</div>;
    case "name":
      return <>{channel.name || channel.channelId}</>;
    case "description":
      return <>{channel.description ? channel.description : "N/A"}</>;
    case "isPublic":
      return (
        <Chip
          className="capitalize"
          color={InvitedChannelTableStatusColorMap[channel.isPublic]}
          size="sm"
          variant="flat"
        >
          {cellValue ? "Public" : "Private"}
        </Chip>
      );
    case "expirationDate":
      return (
        <p
          className={
            new Date(channel.expirationDate) > new Date()
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {channel.expirationDate
            ? getFormattedDate(channel.expirationDate)
            : "N/A"}
        </p>
      );
    case "status":
      return (
        <Chip
          variant="dot"
          size="sm"
          className="capitalize"
          color={
            new Date(channel.expirationDate) > Date.now() ? "success" : "danger"
          }
        >
          {new Date(channel.expirationDate) > Date.now() ? "Active" : "Expired"}
        </Chip>
      );
    case "devicesCount":
      return <>{channel.devicesCount}</>;
    case "createdOn":
    case "updatedOn":
      return (
        <p className="text-bold text-sm capitalize text-sky-600">
          {getFormattedDate(channel[columnKey])}
        </p>
      );
    case "actions":
      return (
        <>
          {new Date(channel.expirationDate) > Date.now() || channel.isPublic ? (
            <div className="flex items-center gap-2">
              <Tooltip content="Details">
                <Button
                  isIconOnly
                  as={Link}
                  variant="light"
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  href={`/invited-channels/${channel.channelId}`}
                >
                  <EyeIcon />
                </Button>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Tooltip content="Forbidden">
                <Ban
                  className="text-red-500 hover:cursor-not-allowed"
                  size={18}
                />
              </Tooltip>
            </div>
          )}
        </>
      );
    default:
      return cellValue;
  }
};

const InvitedChannelTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const InvitedChannelTableColumns = [
  { name: "Author", uid: "owner" },
  { name: "Channel Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Visibility", uid: "isPublic" },
  { name: "Devices", uid: "devicesCount", sortable: true },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Deadline", uid: "expirationDate", sortable: true },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "actions" },
];

const InvitedChannelTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const InvitedChannelTableInitialColumns = [
  "owner",
  "name",
  "description",
  "isPublic",
  "devicesCount",
  "createdOn",
  "updatedOn",
  "expirationDate",
  "status",
  "actions",
];

const InvitedChannelLinks = [
  { label: "Devices", href: "/invited-channels/[id1]", icon: <Cpu /> },
  {
    label: "General View",
    href: "/invited-channels/[id1]/general-view",
    icon: <BarChart3 />,
  },
  {
    label: "Export Data",
    href: "/invited-channels/[id1]/export-data",
    icon: <FileUp />,
  },
];

export {
  InvitedChannelTableRenderCell,
  InvitedChannelTableColumns,
  InvitedChannelTableStatusOptions,
  InvitedChannelTableInitialColumns,
  InvitedChannelLinks,
};
