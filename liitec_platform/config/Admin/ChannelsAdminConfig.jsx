"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const ChannelsAdminTableRenderCell = (
  channel,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete
) => {

  const cellValue = channel[columnKey];

  switch (columnKey) {
    case "channelId":
      return <>{channel.channelId}</>;
    case "owner":
      return <>{channel.owner}</>;
    case "name":
      return <>{channel.name || channel.channelId}</>;
    case "isPublic":
      return (
        <Chip
          className="capitalize"
          color={ChannelsAdminTableStatusColorMap[channel.isPublic]}
          size="sm"
          variant="flat"
        >
          {cellValue ? "Public" : "Private"}
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
        <div className=" flex items-center gap-1">
          <Tooltip content="Details">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="default"
              onClick={() => onOpenView()}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <EyeIcon />
            </Button>
          </Tooltip>
          <Tooltip content="Edit Channel">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="warning"
              onClick={() => onOpenEdit()}
              className="text-lg text-default-400 text-warning cursor-pointer active:opacity-50"
            >
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip color="danger" content="Delete Channel">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onClick={() => onOpenDelete()}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

const ChannelsAdminTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const ChannelsAdminTableColumns = [
  { name: "Channel ID", uid: "channelId", sortable: true },
  { name: "Owner", uid: "owner", sortable: true },
  { name: "Channel Name", uid: "name", sortable: true },
  { name: "Visibility", uid: "isPublic" },
  { name: "Devices", uid: "devicesCount", sortable: true },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const ChannelsAdminTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const ChannelsAdminTableInitialColumns = [
  "channelId",
  "owner",
  "name",
  "isPublic",
  "devicesCount",
  "createdOn",
  "updatedOn",
  "actions",
];

const ChannelsAdminLinks = [
  { label: "Devices", href: "/channels/[id1]" },
  { label: "General View", href: "/channels/[id1]/general-view" },
  { label: "Channel Settings", href: "/channels/[id1]/settings" },
  { label: "Guests", href: "/channels/[id1]/guests" },
  { label: "Export Data", href: "/channels/[id1]/export-data" },
];

export {
  ChannelsAdminTableRenderCell,
  ChannelsAdminTableColumns,
  ChannelsAdminTableStatusOptions,
  ChannelsAdminTableInitialColumns,
  ChannelsAdminLinks,
};
