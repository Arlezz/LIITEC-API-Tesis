"use client";

import { useState, useMemo, useCallback } from "react";
import { Link } from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { PlusIcon } from "@/components/PlusIcon";
import { SearchIcon } from "@/components/SearchIcon";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import { useDisclosure } from "@nextui-org/react";
import MyGenericModal from "../MyGenericModal";
import MyViewModal from "../MyViewModal";
import MyEditModal from "../MyEditModal";

export default function GenericTable({
  data,
  columns,
  renderCell,
  idField,
  statusOptions,
  initialColumns,
  handleDelete,
  createLink,
  modalTitle,
  modalDescription,
  redirectPostDelete,
  redirectPostEdit,
  isStriped,
  filterField = "name",
}) {
  //const { isOpen, onOpen, onClose } = useDisclosure();


  const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  const myDatas = useMemo(() => data || [], [data]);

  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(initialColumns));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "createdOn",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...myDatas];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        item[filterField].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }

    return filteredData;
  }, [myDatas, filterValue, statusFilter, hasSearchFilter, filterField, statusOptions.length]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="relative w-full sm:max-w-[44%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              id="input-group-1"
              placeholder={"Search by " + filterField + "..."}
              value={filterValue}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full ps-10 p-2"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="z-0"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="z-0"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              href={createLink}
              className="bg-sky-600 text-white"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {myDatas.length} results
          </span>
        </div>
      </div>
    );
  }, [
    columns,
    createLink,
    filterField,
    statusOptions,
    filterValue,
    statusFilter,
    visibleColumns,
    myDatas.length,
    onSearchChange,
  ]);

  const onOpenModal = useCallback(
    (item, action) => {
      setCurrentItem(item);
      switch (action) {
        case "view":
          onOpenView();
          break;
        case "edit":
          onOpenEdit();
          break;
        case "delete":
          onOpenDelete();
          break;
        // Agrega casos adicionales según sea necesario
        default:
          break;
      }
    },
    [onOpenView, onOpenEdit, onOpenDelete]
  );

  return (
    <>
      <MyEditModal isOpen={isOpenEdit} onClose={onCloseEdit} item={currentItem} redirectPostEdit={redirectPostEdit} />

      <MyViewModal isOpen={isOpenView} onClose={onCloseView} item={currentItem} />

      <MyGenericModal
        title={modalTitle ? modalTitle : "Confirmation"}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleAction={handleDelete}
        item={currentItem}
        redirect={redirectPostDelete ? redirectPostDelete : "/dashboard"}
      >
        <p>
          {modalDescription
            ? modalDescription
            : "Are you sure you want to delete this item?"}
        </p>
      </MyGenericModal>

      <Table
        isStriped={isStriped}
        aria-label="Table with custom cells, pagination and sorting"
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[400px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        selectionBehavior="toggle"
        onRowAction={(item) => setCurrentItem(item)}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={`No data found`} items={sortedItems}>
          {(item) => (
            <TableRow key={item[idField]}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey,
                    () => onOpenModal(item, "view"),
                    () => onOpenModal(item, "edit"),
                    () => onOpenModal(item, "delete"),
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
