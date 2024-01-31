"use client";

import { Chip, Tooltip } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const DevicesAdminTableRenderCell = (device, columnKey, onOpen) => {
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
      return <>{device.model}</>;
    // case "measures":
    //   return (
    //     <>
    //       {device.measures.map((measure, index) => (
    //         <li className="list-none" key={index}>
    //           <span className="font-bold">{measure.variable}</span>
    //           <span className="text-gray-500"> ({measure.unit})</span>
    //         </li>
    //       ))}
    //     </>
    //   );
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
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              href={"#"}
            >
              <EyeIcon />
            </Link>
          </Tooltip>
          <Tooltip content="Edit Device">
            <Link
              className="text-lg text-warning cursor-pointer active:opacity-50"
              href={"#"}
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete Device">
            <span
              onClick={() => onOpen()}
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
