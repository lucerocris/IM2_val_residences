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
    useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';

import {
    MaintenanceTableViewOptions
} from '@/components/landlord/maintenance/maintenanceTable/maintenanceTableViewOptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Filter, Plus, Search, Calendar, Wrench } from 'lucide-react';
import { DataTableFacetedFilter } from '../../ui/data-table-faceted-filter';
import { DataTablePagination } from '../../ui/data-table-pagination';

interface MaintenanceDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    requestStatuses: { label: string; value: string }[];
    priorityLevels: { label: string; value: string }[];
    propertyTypes: { label: string; value: string }[];
}

export function MaintenanceDataTable<TData, TValue>({
                                                        columns,
                                                        data,
                                                        requestStatuses,
                                                        priorityLevels,
                                                        propertyTypes
                                                    }: MaintenanceDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

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
            rowSelection
        }
    });

    const hasActiveFilters = table.getState().columnFilters.length > 0;

    return (
        <div className="space-y-4">
            {/* Header Section */}


            {/* Filters Section */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by tenant, property, or description..."
                            value={(table.getColumn('tenant_info')?.getFilterValue() as string) ?? ''}
                            onChange={(event) => table.getColumn('tenant_info')?.setFilterValue(event.target.value)}
                            className="h-8 w-[200px] pl-8 lg:w-[350px]"
                        />
                    </div>

                    {table.getColumn('request_status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('request_status')}
                            title="Status"
                            options={requestStatuses}
                        />
                    )}

                    {table.getColumn('priority_level') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('priority_level')}
                            title="Priority"
                            options={priorityLevels}
                        />
                    )}

                    {table.getColumn('property_info') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('property_info')}
                            title="Property Type"
                            options={propertyTypes}
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
                    <MaintenanceTableViewOptions table={table} />
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
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}
                                          className="hover:bg-muted/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Wrench className="h-8 w-8 text-muted-foreground" />
                                        <div className="text-muted-foreground">No maintenance requests found.</div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create your first maintenance request
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
    );
}
