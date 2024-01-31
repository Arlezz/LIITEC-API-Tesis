"use client";

import { Chip, Tooltip } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EyeIcon } from "@/components/EyeIcon";

import { BarChart3 } from "lucide-react";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const InvitedDeviceTableRenderCell = (device, columnKey) => {
  const cellValue = device[columnKey];

  switch (columnKey) {
    case "name":
      return <>{device.name}</>;
    case "Description":
      return <>{device.description}</>;

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
          color={InvitedDeviceTableStatusColorMap[device.isActive]}
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
        <div className="flex items-center gap-2">
          <Tooltip content="Details">
            <Link
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              href={`/invited-channels/${device.channelId}/devices/${device.deviceId}`}
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

const InvitedDeviceTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const InvitedDeviceTableColumns = [
  { name: "Device Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Measures", uid: "measures" },
  { name: "State", uid: "isActive" },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const InvitedDeviceTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const InvitedDeviceTableInitialColumns = [
  "name",
  "description",
  "measures",
  "isActive",
  "createdOn",
  "updatedOn",
  "actions",
];

const InvitedDeviceLinks = [
  { label: "General View", href: "/invited-channels/[id1]/devices/[id2]", icon: <BarChart3 />},
];

export {
  InvitedDeviceTableRenderCell,
  InvitedDeviceTableColumns,
  InvitedDeviceTableStatusOptions,
  InvitedDeviceTableInitialColumns,
  InvitedDeviceLinks,
};
