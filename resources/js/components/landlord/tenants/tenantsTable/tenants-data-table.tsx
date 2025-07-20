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
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Plus, Search, Trash, RotateCcw, Users } from 'lucide-react';
import { DataTableFacetedFilter } from '../../ui/data-table-faceted-filter';
import { DataTablePagination } from '../../ui/data-table-pagination';
import { DataTableViewOptions } from './tenants-table-view-options';

interface TenantsDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    employmentStatuses: { label: string; value: string }[];
    leaseStatuses: { label: string; value: string }[];
}

export function TenantsDataTable<TData, TValue>({ columns, data, employmentStatuses, leaseStatuses }: TenantsDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
        { id: 'status', value: ['active'] } // Default to showing only active tenants
    ]);
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
            rowSelection,
        },
    });

    const hasActiveFilters = table.getState().columnFilters.length > 1 ||
        (table.getState().columnFilters.length === 1 &&
            !(table.getState().columnFilters[0]?.id === 'status' &&
                JSON.stringify(table.getState().columnFilters[0]?.value) === JSON.stringify(['active'])));

    const statusOptions = [
        {
            label: 'Active',
            value: 'active',
            icon: Users
        },
        {
            label: 'Deleted',
            value: 'deleted',
            icon: Trash
        }
    ];

    const resetFilters = () => {
        table.resetColumnFilters();
        // Reset to default active filter
        setColumnFilters([{ id: 'status', value: ['active'] }]);
    };

    const showAllTenants = () => {
        table.getColumn('status')?.setFilterValue(['active', 'deleted']);
    };

    const showActiveTenants = () => {
        table.getColumn('status')?.setFilterValue(['active']);
    };

    const showDeletedTenants = () => {
        table.getColumn('status')?.setFilterValue(['deleted']);
    };

    return (
        <div className="space-y-4">
            {/* Quick Filter Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button
                        variant={JSON.stringify(table.getColumn('status')?.getFilterValue()) === JSON.stringify(['active']) ? 'default' : 'outline'}
                        onClick={showActiveTenants}
                        size="sm"
                        className="h-8"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Active
                    </Button>
                    <Button
                        variant={JSON.stringify(table.getColumn('status')?.getFilterValue()) === JSON.stringify(['deleted']) ? 'default' : 'outline'}
                        onClick={showDeletedTenants}
                        size="sm"
                        className="h-8"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Deleted
                    </Button>
                    <Button
                        variant={JSON.stringify(table.getColumn('status')?.getFilterValue()) === JSON.stringify(['active', 'deleted']) ? 'default' : 'outline'}
                        onClick={showAllTenants}
                        size="sm"
                        className="h-8"
                    >
                        All
                    </Button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tenants..."
                            value={(table.getColumn('user_name')?.getFilterValue() as string) ?? ''}
                            onChange={(event) => table.getColumn('user_name')?.setFilterValue(event.target.value)}
                            className="h-8 w-[150px] pl-8 lg:w-[250px]"
                        />
                    </div>

                    {table.getColumn('employment_status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('employment_status')}
                            title="Employment"
                            options={employmentStatuses}
                        />
                    )}

                    {table.getColumn('lease_status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('lease_status')}
                            title="Lease Status"
                            options={leaseStatuses}
                        />
                    )}

                    {table.getColumn('status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status')}
                            title="Status"
                            options={statusOptions}
                        />
                    )}

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={resetFilters}
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
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-muted/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <div className="text-muted-foreground">
                                            {table.getColumn('status')?.getFilterValue() && JSON.stringify(table.getColumn('status')?.getFilterValue()).includes('deleted')
                                                ? 'No deleted tenants found.'
                                                : 'No tenants found.'}
                                        </div>
                                        {!table.getColumn('status')?.getFilterValue()?.includes('deleted') && (
                                            <Button variant="outline" size="sm">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add your first tenant
                                            </Button>
                                        )}
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
