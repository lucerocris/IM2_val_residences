    import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, User, Building, Calendar, DollarSign, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

export type Lease = {
    id: string
    tenant_id: string
    unit_id: string
    start_date: string
    end_date: string
    monthly_rent: number
    deposit_amount: number
    lease_term: number
    lease_status: 'active' | 'expired' | 'terminated' | 'pending'
    terms_and_conditions: string | null
    terminated_date: string | null
    termination_reason: string | null
    created_at: string
    updated_at: string
    // Related data
    tenant: {
        id: string
        user_name: string
        email: string
        user_contact_number: string
    }
    units: {
        id: string
        address: string
        unit_number: string | null
        property_type: 'duplex' | 'triplex'
        landlord: {
            id: string
            user_name: string
        }
    }
    // Aggregate data
    total_bills: number
    pending_bills: number
    overdue_bills: number
    maintenance_requests: number
}

const leaseStatusConfig = {
    'active': {
        variant: 'secondary' as const,
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#bbf7d0',
        label: 'Active'
    },
    'pending': {
        variant: 'secondary' as const,
        backgroundColor: '#fef3c7',
        color: '#d97706',
        borderColor: '#fde68a',
        label: 'Pending'
    },
    'expired': {
        variant: 'secondary' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'Expired'
    },
    'terminated': {
        variant: 'secondary' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'Terminated'
    }
};

const propertyTypeConfig = {
    'duplex': {
        variant: 'outline' as const,
        label: 'Duplex'
    },
    'triplex': {
        variant: 'outline' as const,
        label: 'Triplex'
    }
};

export const leaseColumns: ColumnDef<Lease>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'tenant',
        id: 'tenant_info',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <User className="mr-2 h-4 w-4" />
                    Tenant
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const lease = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-medium">{lease.tenant.user_name}</span>
                    <span className="text-xs text-muted-foreground">{lease.tenant.email}</span>
                    <span className="text-xs text-muted-foreground">{lease.tenant.user_contact_number}</span>
                </div>
            );
        },
        sortingFn: (rowA, rowB) => {
            return rowA.original.tenant.user_name.localeCompare(rowB.original.tenant.user_name);
        }
    },
    {
        accessorKey: 'unit',
        id: 'property_info',
        header: 'Property Details',
        cell: ({ row }) => {
            const lease = row.original;

            return (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm font-medium">
                        <Building className="mr-2 h-3 w-3" />
                        <span className="truncate max-w-[200px]">{lease.units.address}</span>
                    </div>
                    {lease.units.unit_number && (
                        <span className="text-xs text-muted-foreground">
                            Unit: {lease.units.unit_number}
                        </span>
                    )}
                    <div className="flex items-center space-x-1">
                        <Badge variant={propertyTypeConfig[lease.units.property_type].variant} className="text-xs">
                            {propertyTypeConfig[lease.units.property_type].label}
                        </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Owner: {lease.units.landlord.user_name}
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'lease_status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('lease_status') as string;
            const config = leaseStatusConfig[status as keyof typeof leaseStatusConfig];

            return (
                <Badge
                    variant={config.variant}
                    style={{
                        backgroundColor: config.backgroundColor,
                        color: config.color,
                        borderColor: config.borderColor,
                        border: '1px solid'
                    }}
                    className="font-medium"
                >
                    {config.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const status = row.getValue(id) as string;
            return value.includes(status);
        }
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Lease Period
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const lease = row.original;
            const startDate = new Date(lease.start_date);
            const endDate = new Date(lease.end_date);
            const today = new Date();
            const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            return (
                <div className="flex flex-col">
                    <div className="text-sm">
                        <span className="font-medium">{startDate.toLocaleDateString()}</span>
                        <span className="text-muted-foreground"> to </span>
                        <span className="font-medium">{endDate.toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {lease.lease_term} months term
                    </span>
                    {lease.lease_status === 'active' && (
                        <span className={`text-xs ${daysRemaining > 30 ? 'text-green-600' : daysRemaining > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {daysRemaining > 0 ? `${daysRemaining} days remaining` : `Expired ${Math.abs(daysRemaining)} days ago`}
                        </span>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'monthly_rent',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Financial
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const lease = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-medium text-sm">
                        ${lease.monthly_rent.toLocaleString()}/month
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Deposit: ${lease.deposit_amount.toLocaleString()}
                    </span>
                </div>
            );
        }
    },
    {
        id: 'bills_summary',
        header: 'Bills & Maintenance',
        cell: ({ row }) => {
            const lease = row.original;

            return (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                        <span>Total Bills: <span className="font-medium">{lease.total_bills}</span></span>
                    </div>
                    {lease.pending_bills > 0 && (
                        <Badge variant="secondary" className="text-xs w-fit">
                            {lease.pending_bills} Pending
                        </Badge>
                    )}
                    {lease.overdue_bills > 0 && (
                        <Badge variant="destructive" className="text-xs w-fit">
                            {lease.overdue_bills} Overdue
                        </Badge>
                    )}
                    {lease.maintenance_requests > 0 && (
                        <span className="text-xs text-muted-foreground">
                            {lease.maintenance_requests} Maintenance Requests
                        </span>
                    )}
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Created Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return (
                <div className="flex flex-col">
                    <span>{date.toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const lease = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(lease.id)}>
                            Copy lease ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View lease details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit lease
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> View contract
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" /> Manage bills
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" /> Contact tenant
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {lease.lease_status === 'pending' && (
                            <>
                                <DropdownMenuItem className="text-green-600">
                                    Approve lease
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    Reject lease
                                </DropdownMenuItem>
                            </>
                        )}
                        {lease.lease_status === 'active' && (
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Terminate lease
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
