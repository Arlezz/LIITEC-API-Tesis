"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import {
  MemoryStick,
  BarChart3,
  FileUp,
  Settings,
  UserPlus,
} from "lucide-react";

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const ChannelTableRenderCell = (
  channel,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete
) => {

  const cellValue = channel[columnKey];

  switch (columnKey) {
    case "name":
      return <>{channel.name || channel.channelId}</>;
    case "isPublic":
      return (
        <Chip
          className="capitalize"
          color={ChannelTableStatusColorMap[channel.isPublic]}
          size="sm"
          variant="flat"
        >
          {cellValue ? "Public" : "Private"}
        </Chip>
      );
    case "devicesCount":
      console.log("devicesCount: ", channel.devicesCount);
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
          <div className="flex items-center gap-1">
            <Tooltip content="Details">
              <Button
                isIconOnly
                as={Link}
                variant="light"
                size="sm"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                href={`/channels/${channel.channelId}`}
              >
                <EyeIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Edit Channel">
              <Button
                isIconOnly
                as={Link}
                variant="light"
                color="warning"
                size="sm"
                className="text-lg cursor-pointer active:opacity-50"
                href={`/channels/${channel.channelId}/settings`}
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete Channel">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                color="danger"
                onClick={() => onOpenDelete()}
                className="text-lg cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        </>
      );
    default:
      return cellValue;
  }
};

const ChannelTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const ChannelTableColumns = [
  { name: "Channel Name", uid: "name", sortable: true },
  { name: "Visibility", uid: "isPublic" },
  { name: "Devices", uid: "devicesCount", sortable: true },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const ChannelTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const ChannelTableInitialColumns = [
  "name",
  "isPublic",
  "devicesCount",
  "createdOn",
  "updatedOn",
  "actions",
];

const ChannelLinks = [
  { label: "Devices", href: "/channels/[id1]", icon: <MemoryStick /> },
  {
    label: "General View",
    href: "/channels/[id1]/general-view",
    icon: <BarChart3 />,
  },
  {
    label: "Channel Settings",
    href: "/channels/[id1]/settings",
    icon: <Settings />,
  },
  { label: "Guests", href: "/channels/[id1]/guests", icon: <UserPlus /> },
  {
    label: "Export Data",
    href: "/channels/[id1]/export-data",
    icon: <FileUp />,
  },
];

export {
  ChannelTableRenderCell,
  ChannelTableColumns,
  ChannelTableStatusOptions,
  ChannelTableInitialColumns,
  ChannelLinks,
};
