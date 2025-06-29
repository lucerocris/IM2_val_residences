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
import { Plus, Search, Filter } from "lucide-react"
import { DataTablePagination } from "../../ui/data-table-pagination"
import { DataTableViewOptions } from "./properties-table-view-options"
import { DataTableFacetedFilter } from "../../ui/data-table-faceted-filter"
import type { RentalProperty } from "./propertiesColumn"

interface PropertiesDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    landlords: { label: string; value: string }[]
    propertyTypes: { label: string; value: string }[]
}

export function PropertiesDataTable<TData, TValue>({
                                                       columns,
                                                       data,
                                                       landlords,
                                                       propertyTypes
                                                   }: PropertiesDataTableProps<TData, TValue>) {
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

    const availabilityOptions = [
        { label: "Available", value: "available" },
        { label: "Occupied", value: "occupied" },
        { label: "Maintenance", value: "maintenance" },
        { label: "Unavailable", value: "unavailable" },
    ]

    const hasActiveFilters = table.getState().columnFilters.length > 0

    return (
        <div className="space-y-4">
            {/* Filters Section */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search properties..."
                            value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("address")?.setFilterValue(event.target.value)}
                            className="h-8 w-[150px] lg:w-[250px] pl-8"
                        />
                    </div>

                    {table.getColumn("landlord") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("landlord")}
                            title="Landlord"
                            options={landlords}
                        />
                    )}

                    {table.getColumn("property_type") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("property_type")}
                            title="Property Type"
                            options={propertyTypes}
                        />
                    )}

                    {table.getColumn("availability_status") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("availability_status")}
                            title="Status"
                            options={availabilityOptions}
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
                    <DataTableViewOptions table={table} />
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
                                        <div className="text-muted-foreground">No properties found.</div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add your first property
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
