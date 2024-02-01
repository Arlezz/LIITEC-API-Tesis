"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const KeysAdminTableRenderCell = (
  key,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete
) => {
  const cellValue = key[columnKey];

  switch (columnKey) {
    case "key":
      return <>{key.key}</>;
    case "type":
      return (
        <>
          <Chip
            className="capitalize"
            color={
              key.type === "readUser"
                ? "success"
                : key.type === "advancedUser"
                ? "warning"
                : "secondary"
            }
            size="sm"
            variant="flat"
          >
            {key.type === "readUser"
              ? "read user"
              : key.type === "advancedUser"
              ? "advanced user"
              : "admin"}
          </Chip>
        </>
      );
    case "user":
      return <>{key.user}</>;
    case "deadline":
      return (
        <span
          className={`
        ${
          new Date(key.expirationDate) < Date.now()
            ? "text-red-500"
            : new Date(key.expirationDate) > Date.now()
            ? "text-green-500"
            : ""
        }
        `}
        >
          {key.expirationDate ? getFormattedDate(key.expirationDate) : "N/A"}
        </span>
      );
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
          {!key.expirationDate ? (
            <Tooltip content="Edit">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="warning"
                onClick={() => onOpenEdit()}
                className="text-lg cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </Button>
            </Tooltip>
          ) : null}
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
  { name: "Deadline", uid: "deadline", sortable: true },
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
  "deadline",
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
