"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const DevicesAdminTableRenderCell = (
  device,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete
) => {
  const cellValue = device[columnKey];

  switch (columnKey) {
    case "channelId":
      return <>{device.channelId}</>;
    case "deviceId":
      return <>{device.deviceId}</>;
    case "name":
      return <>{device.name}</>;
    case "Description":
      return <>{device.description}</>;
    case "model":
      return <span className="font-bold">{device.model}</span>;
    case "isActive":
      return (
        <Chip
          className="capitalize"
          color={DevicesAdminTableStatusColorMap[device.isActive]}
          size="sm"
          variant="dot"
        >
          {cellValue ? "Active" : "Inactive"}
        </Chip>
      );
    case "createdOn":
    case "updatedOn":
      return (
        <p className="text-bold text-sm capitalize text-sky-600">
          {getFormattedDate(device[columnKey])}
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
          <Tooltip content="Edit Device">
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
          <Tooltip color="danger" content="Delete Device">
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

const DevicesAdminTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const DevicesAdminTableColumns = [
  { name: "Channel ID", uid: "channelId", sortable: true },
  { name: "Device ID", uid: "deviceId", sortable: true },
  { name: "Device Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Model", uid: "model" },
  { name: "State", uid: "isActive" },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const DevicesAdminTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const DevicesAdminTableInitialColumns = [
  "channelId",
  "deviceId",
  "name",
  "description",
  "model",
  "isActive",
  "createdOn",
  "updatedOn",
  "actions",
];

const DevicesAdminLinks = [
  { label: "General View", href: "/channels/[id1]/devices/[id2]" },
  { label: "Settings", href: "/channels/[id1]/devices/[id2]/settings" },
];

export {
  DevicesAdminTableRenderCell,
  DevicesAdminTableColumns,
  DevicesAdminTableStatusOptions,
  DevicesAdminTableInitialColumns,
  DevicesAdminLinks,
};
