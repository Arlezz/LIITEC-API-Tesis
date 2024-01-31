"use client"

import {
  Chip,
  Tooltip
} from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { Cpu, BarChart3, FileUp } from "lucide-react";

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";



const PublicChannelTableRenderCell = (channel, columnKey, onOpen) => {

  console.log("channel: ", channel);

  const cellValue = channel[columnKey];

  switch (columnKey) {
    case "owner":
      return <div className="text-ellipsis">
      {channel.owner}
      </div>;
    case "name":
      return <>{channel.name || channel.channelId}</>;
    case "description":
      return <>{
        channel.description ? channel.description : "-----"
      }</>;
    case "isPublic":
      return (
        <Chip
          className="capitalize"
          color={PublicChannelTableStatusColorMap[channel.isPublic]}
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
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link className="text-lg text-default-400 cursor-pointer active:opacity-50"
             href={`/public-channels/${channel.channelId}`}>
              <EyeIcon />
            </Link>
          </Tooltip>
          {/* <Tooltip content="Edit Channel">
          <Link className="text-lg text-default-400 text-warning cursor-pointer active:opacity-50"
             href={`/channels/${channel.channelId}/settings`}>
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete Channel">
            <span
              onClick={() => onOpen()}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </Tooltip> */}
        </div>
      );
    default:
      return cellValue;
  }
};

const PublicChannelTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const PublicChannelTableColumns = [
  { name: "Author", uid: "owner" },
  { name: "Channel Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Visibility", uid: "isPublic" },
  { name: "Devices", uid: "devicesCount", sortable: true },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const PublicChannelTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const PublicChannelTableInitialColumns = [
  "owner",
  "name",
  "description",
  "isPublic",
  "devicesCount",
  "createdOn",
  "updatedOn",
  "actions",
];

const PublicChannelLinks = [
  { label: "Devices", href: "/public-channels/[id1]", icon: <Cpu />},
  { label: "General View", href: "/public-channels/[id1]/general-view", icon: <BarChart3 />},
  { label: "Export Data", href: "/public-channels/[id1]/export-data", icon: <FileUp />},
];

export {
  PublicChannelTableRenderCell,
  PublicChannelTableColumns,
  PublicChannelTableStatusOptions,
  PublicChannelTableInitialColumns,
  PublicChannelLinks
};
