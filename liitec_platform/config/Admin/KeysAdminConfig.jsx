"use client";

import { Chip, Tooltip } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const KeysAdminTableRenderCell = (key, columnKey, onOpen) => {
  const cellValue = key[columnKey];

  switch (columnKey) {
    case "key":
      return <>{key.key}</>;
    case "type":
      return <>{key.type}</>;
    case "user":
      return <>{key.user}</>;
    case "state":
      return (
        <>
          {key.expirationDate ? (
            <Chip
              className="capitalize"
              color={
                KeysAdminTableStatusColorMap[
                  new Date(key.expirationDate) < Date.now()
                ]
              }
              size="sm"
              variant="dot"
            >
              {new Date(key.expirationDate) < new Date() ? "expired" : "active"}
            </Chip>
          ) : (
            <Chip
              className="capitalize"
              color={"secondary"}
              size="sm"
              variant="dot"
            >
              {"Sistem Key"}
            </Chip>
          )}
        </>
      );
    case "createdOn":
    case "updatedOn":
      return (
        <p className="text-bold text-sm capitalize text-sky-600">
          {getFormattedDate(key[columnKey])}
        </p>
      );
    case "channelAccess":
      return <>{key.channelAccess ? key.channelAccess : "N/A"}</>;
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              href={"#"}
            >
              <EyeIcon />
            </Link>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

const KeysAdminTableStatusColorMap = {
  false: "success",
  true: "danger",
};

const KeysAdminTableColumns = [
  { name: "Key", uid: "key", sortable: true },
  { name: "Type", uid: "type", sortable: true },
  { name: "User", uid: "user", sortable: true },
  { name: "Channel Access", uid: "channelAccess", sortable: true },
  { name: "State", uid: "state", sortable: true },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const KeysAdminTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const KeysAdminTableInitialColumns = [
  "key",
  "type",
  "user",
  "channelAccess",
  "state",
  "createdOn",
  "updatedOn",
  "actions",
];

const KeysAdminLinks = [
  { label: "General View", href: "/channels/[id1]/devices/[id2]" },
  { label: "Settings", href: "/channels/[id1]/devices/[id2]/settings" },
];

export {
  KeysAdminTableRenderCell,
  KeysAdminTableColumns,
  KeysAdminTableStatusOptions,
  KeysAdminTableInitialColumns,
  KeysAdminLinks,
};
