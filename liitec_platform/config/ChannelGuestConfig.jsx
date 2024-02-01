"use client";

import { Chip, Tooltip } from "@nextui-org/react";

import { getFormattedDate } from "@/utils/dateFormatter";

const ChannelGuestTableRenderCell = (guest, columnKey) => {

  const cellValue = guest[columnKey];

  switch (columnKey) {
    case "username":
    case "name":
    case "lastName":
    case "email":
      return <>{guest[columnKey]}</>;
    case "role":
      return (
        <Chip
          className="capitalize"
          color={
            ChannelGuestTableRoleColorMap[guest.role]
          }
          size="sm"
          variant="flat"
        >
          {guest.role === "readUser" ? "read user" : guest.role === "advancedUser" ? "advanced user" : "super user"}
        </Chip>
      );
    case "createdOn":
    case "expirationDate":
      return (
        <p className="text-bold text-sm capitalize text-sky-600">
          {getFormattedDate(guest[columnKey])}
        </p>
      );

    case "state":
      return (
        <Chip
          className="capitalize"
          color={
            ChannelGuestTableStatusColorMap[
              new Date(guest.expirationDate) < Date.now()
            ]
          }
          size="sm"
          variant="dot"
        >
          {new Date(guest.expirationDate) < new Date() ? "expired" : "active"}
        </Chip>
      );
    default:
      return cellValue;
  }
};


const ChannelGuestTableRoleColorMap = {
  readUser: "success",
  advancedUser: "warning",
  superUser: "danger",
};

const ChannelGuestTableStatusColorMap = {
  true: "danger",
  false: "success",
};

const ChannelGuestTableColumns = [
  { name: "Username", uid: "username", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Last Name", uid: "lastName", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Role", uid: "role" },
  { name: "Created On", uid: "createdOn", sortable: true },
  { name: "Expires On", uid: "expirationDate", sortable: true },
  { name: "State", uid: "state" },
];

const ChannelGuestTableStatusOptions = [
  { name: "Expired", uid: "expired" },
  { name: "Active", uid: "active" },
];

const ChannelGuestTableInitialColumns = [
  "username",
  "name",
  "lastName",
  "email",
  "role",
  "createdOn",
  "expirationDate",
  "state",
];

const ChannelGuestLinks = [
  { label: "Devices", href: "/channels/[id1]" },
  { label: "General View", href: "/channels/[id1]/general-view" },
  { label: "Channel Settings", href: "/channels/[id1]/settings" },
  { label: "Export Data", href: "/channels/[id1]/export-data" },
  { label: "Guests", href: "/channels/[id1]/guests" },
];

export {
  ChannelGuestTableRenderCell,
  ChannelGuestTableColumns,
  ChannelGuestTableStatusOptions,
  ChannelGuestTableInitialColumns,
  ChannelGuestLinks,
};
