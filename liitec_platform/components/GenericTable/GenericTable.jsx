"use client"

import { useState, useMemo, useCallback } from "react";

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
  
export default function GenericTable ({ data, columns, renderCell, idField, statusOptions, initialColumns }) {

    const myDatas = data || [];

    const [page, setPage] = useState(1);

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(initialColumns)
    );
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...myDatas];

        if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(filterValue.toLowerCase())
        );
        }
        if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
        ) {
        filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status)
        );
        }

        return filteredUsers;
    }, [myDatas, filterValue, statusFilter]);

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

    const onRowsPerPageChange = useCallback((e) => {
        console.log("e.target.value: ", e.target.value);
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);
    
    const onSearchChange = useCallback((value) => {
        console.log("value: ", value);

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
                        placeholder="Search by name..."
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
                    <Button className="bg-sky-600 text-white" endContent={<PlusIcon />}>
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">
                    Total {myDatas.length} results
                </span>
                <Select
                label="Rows per page"
                defaultSelectedKeys={["5"]}
                className="max-w-xs w-36"
                size="sm"
                onChange={(e) => onRowsPerPageChange(e)}
                >
                    <SelectItem key={5} value={5}>
                        5
                    </SelectItem>
                    <SelectItem key={10} value={10}>
                        10
                    </SelectItem>
                    {/* <SelectItem key={15} value={15}>
                        15
                    </SelectItem> */}
                </Select>
            </div>
        </div>
    );
    }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    myDatas.length,
    onSearchChange,
    hasSearchFilter,
    ]);

    return (
        <Table 
            aria-label="Table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
            wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            //selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            selectionBehavior="toggle"
            onRowAction={(item) => console.log("item: ", item)}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader  columns={headerColumns}>
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
            <TableBody
                emptyContent={`No ${columns[0].name.toLowerCase()} found`}
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item[idField]}>
                        
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
  