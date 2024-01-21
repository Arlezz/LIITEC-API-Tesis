"use client"

import {
  Chip,
  Tooltip
} from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";



const ChannelTableRenderCell = (channel, columnKey) => {
  const cellValue = channel[columnKey];

  switch (columnKey) {
    case "name":
      return <>{channel.name}</>;
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
             href={`/channels/${channel.channelId}`}>
              <EyeIcon />
            </Link>
          </Tooltip>
          <Tooltip content="Edit Channel">
            <span className="text-lg text-warning cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete Channel">
            <span
              onClick={() => console.log("channel: ", channel.name)}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
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
  "createdOn",
  "updatedOn",
  "actions",
];

export {
  ChannelTableRenderCell,
  ChannelTableColumns,
  ChannelTableStatusOptions,
  ChannelTableInitialColumns,
};
