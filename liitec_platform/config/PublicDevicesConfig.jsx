"use client";

import { Chip, Tooltip } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { BarChart3 } from "lucide-react";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const PublicDeviceTableRenderCell = (device, columnKey) => {
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
          color={PublicDeviceTableStatusColorMap[device.isActive]}
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
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              href={`/public-channels/${device.channelId}/devices/${device.deviceId}`}
            >
              <EyeIcon />
            </Link>
          </Tooltip>
          {/* <Tooltip content="Edit Channel">
            <Link
              className="text-lg text-warning cursor-pointer active:opacity-50"
              href={`/channels/${device.channelId}/devices/${device.deviceId}/settings`}
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete Channel">
            <span
              //onClick={() => console.log("Device: ", device.name)}
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

const PublicDeviceTableStatusColorMap = {
  true: "success",
  false: "danger",
};

const PublicDeviceTableColumns = [
  { name: "Device Name", uid: "name", sortable: true },
  { name: "Description", uid: "description" },
  { name: "Measures", uid: "measures" },
  { name: "State", uid: "isActive" },
  { name: "Created", uid: "createdOn", sortable: true },
  { name: "Updated", uid: "updatedOn", sortable: true },
  { name: "Action", uid: "actions" },
];

const PublicDeviceTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const PublicDeviceTableInitialColumns = [
  "name",
  "description",
  "measures",
  "isActive",
  "createdOn",
  "updatedOn",
  "actions",
];

const PublicDeviceLinks = [
  { label: "General View", href: "/public-channels/[id1]/devices/[id2]", icon: <BarChart3 />},
];

export {
  PublicDeviceTableRenderCell,
  PublicDeviceTableColumns,
  PublicDeviceTableStatusOptions,
  PublicDeviceTableInitialColumns,
  PublicDeviceLinks,
};
