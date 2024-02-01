"use client";

import { Chip, Tooltip, Button } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const DeviceTableRenderCell = (
  device,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete
) => {
  const cellValue = device[columnKey];

  switch (columnKey) {
    case "name":
      return <>{device.name}</>;
    case "Description":
      return <>{device.description}</>;
    case "model":
      return <span className="font-bold text-gray-700">{device.model}</span>;
    case "measures":
      return (
        <>
          {device.measures.map((measure, index) => (
            <li className="list-none" key={index}>
              <span className="font-bold">{measure.variable}</span>
              <span className="text-gray-500"> ({measure.unit})</span>
            </li>
          ))}
        </>
      );
    case "isActive":
      return (
        <Chip
          className="capitalize"
          color={DeviceTableStatusColorMap[device.isActive]}
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
        <div className="flex items-center gap-1">
          <Tooltip content="Details">
            <Button
              isIconOnly
              as={Link}
              variant="light"
              size="sm"
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              href={`/channels/${device.channelId}/devices/${device.deviceId}`}
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
              href={`/channels/${device.channelId}/devices/${device.deviceId}/settings`}
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
      );
    default:
      return cellValue;
  }
};

const DeviceTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const DeviceTableColumns = [
  { name: "Device Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Model", uid: "model" },
  { name: "Measures", uid: "measures" },
  { name: "State", uid: "isActive" },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const DeviceTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const DeviceTableInitialColumns = [
  "name",
  "description",
  "model",
  "measures",
  "isActive",
  "createdOn",
  "updatedOn",
  "actions",
];

const DeviceLinks = [
  { label: "General View", href: "/channels/[id1]/devices/[id2]" },
  { label: "Settings", href: "/channels/[id1]/devices/[id2]/settings" },
];

export {
  DeviceTableRenderCell,
  DeviceTableColumns,
  DeviceTableStatusOptions,
  DeviceTableInitialColumns,
  DeviceLinks,
};
