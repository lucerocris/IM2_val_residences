import { useState } from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, FileText, Send } from "lucide-react"
import { DataTablePagination } from "../../ui/data-table-pagination"
import { DataTableFacetedFilter } from "../../ui/data-table-faceted-filter"
import type { RentalBill } from "./rent-collection-columns"

interface RentCollectionDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function RentCollectionDataTable<TData, TValue>({
    columns,
    data,
}: RentCollectionDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const paymentStatusOptions = [
        { label: "Paid", value: "paid" },
        { label: "Pending", value: "pending" },
        { label: "Overdue", value: "overdue" },
        { label: "Partial", value: "partial" },
    ]

    const hasActiveFilters = table.getState().columnFilters.length > 0

    const handleSendAllReminders = () => {
        // Implementation for sending reminders to all unpaid bills
        console.log("Sending reminders to all unpaid bills")
    }

    const handleExportData = () => {
        // Implementation for exporting rent collection data
        console.log("Exporting rent collection data")
    }

    return (
        <div className="space-y-4">
            {/* Filters Section */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by tenant or property..."
                            value={(table.getColumn("tenant_info")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("tenant_info")?.setFilterValue(event.target.value)}
                            className="h-8 w-[150px] lg:w-[300px] pl-8"
                        />
                    </div>

                    {table.getColumn("payment_status") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("payment_status")}
                            title="Payment Status"
                            options={paymentStatusOptions}
                        />
                    )}

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Filter className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={handleExportData}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-muted/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <div className="text-muted-foreground">No rental bills found.</div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Generate bills
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    )
} 