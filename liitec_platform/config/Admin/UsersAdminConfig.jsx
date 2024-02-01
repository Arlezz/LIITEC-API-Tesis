"use client";

import { Button, Chip, Tooltip } from "@nextui-org/react"; // Asegúrate de importar estos componentes correctamente

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

import { getFormattedDate } from "@/utils/dateFormatter";
import Link from "next/link";

const UsersAdminTableRenderCell = (
  user,
  columnKey,
  onOpenView,
  onOpenEdit,
  onOpenDelete,
) => {

  const cellValue = user[columnKey];

  switch (columnKey) {
    case "_id":
    case "username":
    case "email":
      return <>{user[columnKey]}</>;
    case "name":
      return <>{user.name + " " + user.lastName}</>;
    case "role":
      return (
        <Chip
          className="capitalize"
          color={UsersAdminTableStatusColorMap[user.role]}
          size="sm"
          variant="flat"
        >
          {user.role === "readUser"
            ? "read user"
            : user.role === "advancedUser"
            ? "advanced user"
            : "admin"}
        </Chip>
      );
    case "createdOn":
    case "updatedOn":
      return (
        <p className="text-bold text-sm capitalize text-sky-600">
          {getFormattedDate(user[columnKey])}
        </p>
      );
    case "acls":
      return <>{user.acls.length}</>;
    case "superuser":
      return (
        <Chip
          className="capitalize"
          color={user?.superuser ? "warning" : "success"}
          size="sm"
          variant="flat"
        >
          {user?.superuser ? "Super User" : "Basic User"}
        </Chip>
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
          <Tooltip content="Edit User">
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
          <Tooltip color="danger" content="Delete User">
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

const UsersAdminTableStatusColorMap = {
  readUser: "success",
  advancedUser: "warning",
  superUser: "secondary",
};

const UsersAdminTableColumns = [
  { name: "Id", uid: "_id", sortable: true },
  { name: "Username", uid: "username", sortable: true },
  { name: "Full Name", uid: "name", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "User Role", uid: "role" },
  { name: "Created On", uid: "createdOn", sortable: true },
  { name: "Updated On", uid: "updatedOn", sortable: true },
  { name: "Acls", uid: "acls" },
  { name: "LIITEC Broker", uid: "superuser" },
  { name: "Action", uid: "actions" },
];

const UsersAdminTableStatusOptions = [
  { name: "Public", uid: "public" },
  { name: "Private", uid: "private" },
];

const UsersAdminTableInitialColumns = [
  "_id",
  "username",
  "name",
  "email",
  "role",
  "createdOn",
  "updatedOn",
  "acls",
  "superuser",
  "actions",
];

const UsersAdminLinks = [
  { label: "Devices", href: "/channels/[id1]" },
  { label: "General View", href: "/channels/[id1]/general-view" },
  { label: "Channel Settings", href: "/channels/[id1]/settings" },
  { label: "Guests", href: "/channels/[id1]/guests" },
  { label: "Export Data", href: "/channels/[id1]/export-data" },
];

export {
  UsersAdminTableRenderCell,
  UsersAdminTableColumns,
  UsersAdminTableStatusOptions,
  UsersAdminTableInitialColumns,
  UsersAdminLinks,
};
