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
    data = [], 
}: RentCollectionDataTableProps<TData, TValue>) {
    // Add comprehensive safety checks
    const safeData = (() => {
        if (!data) {
            console.warn('Data is null or undefined, using empty array');
            return [];
        }
        
        if (!Array.isArray(data)) {
            console.warn('Data is not an array, attempting to convert or using empty array');
            // If it's an object, try to extract an array property
            if (typeof data === 'object') {
                const arrayValues = Object.values(data).filter(Array.isArray);
                if (arrayValues.length > 0) {
                    return arrayValues[0] as TData[];
                }
            }
            return [];
        }
        
        return data;
    })();

    console.log('RentCollectionDataTable received data:', data);
    console.log('Safe data being used:', safeData);
    console.log('Safe data length:', safeData.length);
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: safeData, // Use the safe data
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
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        const unpaidBills = selectedRows.filter(row => {
            const bill = row.original as RentalBill;
            return bill.payment_status !== 'paid';
        });
        
        if (unpaidBills.length === 0) {
            alert('No unpaid bills selected');
            return;
        }
        
        console.log(`Sending reminders to ${unpaidBills.length} unpaid bills`);
        // Implementation for sending reminders
    }

    const handleExportData = () => {
        const dataToExport = table.getFilteredRowModel().rows.map(row => row.original);
        console.log('Exporting rent collection data:', dataToExport);
        // Implementation for exporting rent collection data
    }

    const handleGenerateBills = () => {
        console.log('Generate new bills clicked');
        // Implementation for generating new bills
    }

    // Get count of selected unpaid bills for action buttons
    const selectedUnpaidCount = table.getFilteredSelectedRowModel().rows.filter(row => {
        const bill = row.original as RentalBill;
        return bill.payment_status !== 'paid';
    }).length;

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
                    {selectedUnpaidCount > 0 && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={handleSendAllReminders}
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Send Reminders ({selectedUnpaidCount})
                        </Button>
                    )}
                    
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
                                        <div className="text-muted-foreground">
                                            {safeData.length === 0 
                                                ? "No rental bills found. Generate bills to get started."
                                                : "No bills match your current filters."
                                            }
                                        </div>
                                        {safeData.length === 0 && (
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={handleGenerateBills}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Generate bills
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <DataTablePagination table={table} />
        </div>
    )
}