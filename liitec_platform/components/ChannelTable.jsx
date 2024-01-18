"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";

import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { EyeIcon } from "@/components/EyeIcon";

const statusColorMap = {
  true: "success",
  false: "danger",
  //vacation: "warning",
};

const columns = [
  { name: "Channel Name", uid: "name" },
  { name: "Visibility", uid: "isPublic" },
  { name: "Created", uid: "createdOn" },
  { name: "Updated", uid: "updatedOn" },
  { name: "Action", uid: "actions" },
];

export default function ChannelTable({ channels }) {

  const renderCell = React.useCallback((channels, columnKey) => {
    const cellValue = channels[columnKey];

    console.log("cellValue: ", cellValue);

    switch (columnKey) {
      case "name":
        return <>{channels.name}</>;
      case "isPublic":
        console.log("isPublic: ", cellValue);
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[channels.isPublic]}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Public" : "Private"}
          </Chip>
        );
      case "createdOn":
        return (
          <p className="text-bold text-sm capitalize text-sky-600">
            {channels.createdOn}
          </p>
        );
      case "updatedOn":
        return (
          <p className="text-bold text-sm capitalize text-sky-600">
            {channels.updatedOn}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Channel">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Channel">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={channels}>
        {(item) => (
          <TableRow key={item.channelId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
