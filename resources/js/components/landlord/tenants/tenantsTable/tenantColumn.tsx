import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, User, Phone, Mail, Building, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@inertiajs/react';

export type Tenant = {
    id: string
    user_name: string
    email: string
    user_contact_number: string
    employment_status: string | null
    emergency_contact: string | null
    tenant_occupation: string | null
    move_in_date: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    current_lease?: {
        id: string
        units: {
            id: string
            address: string
            unit_number: string | null
        }
        start_date: string
        end_date: string
        monthly_rent: number
        lease_status: 'active' | 'expired' | 'terminated' | 'pending'
    } | null

    total_leases: number
    active_maintenance_requests: number
}

const employmentStatusConfig = {
    'employed': {
        variant: 'secondary' as const,
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#bbf7d0'
    },
    'unemployed': {
        variant: 'secondary' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca'
    },
    'self-employed': {
        variant: 'secondary' as const,
        backgroundColor: '#dbeafe',
        color: '#2563eb',
        borderColor: '#bfdbfe'
    },
    'student': {
        variant: 'secondary' as const,
        backgroundColor: '#fef3c7',
        color: '#d97706',
        borderColor: '#fde68a'
    },
    'retired': {
        variant: 'secondary' as const,
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
        borderColor: '#e5e7eb'
    }
};

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
    },
    'no-lease': {
        variant: 'secondary' as const,
        backgroundColor: '#f3f4f6',
        color: '#6b7280',
        borderColor: '#e5e7eb',
        label: 'No Lease'
    },
    'in-progress': {
        variant: 'secondary' as const,
        backgroundColor: '#dbeafe',
        color: '#2563eb',
        borderColor: '#bfdbfe',
        label: 'In Progress'
    }
};

const handleDelete = (tenantId: string) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
        router.delete(`/landlord/tenants/${tenantId}`, {
            preserveScroll: true,
        });
    }
};

const handleRestore = (tenantId: string) => {
    if (confirm('Are you sure you want to restore this tenant?')) {
        router.patch(`/landlord/tenants/${tenantId}/restore`, {}, {
            preserveScroll: true,
        });
    }
};

export const tenantColumns: ColumnDef<Tenant>[] = [
    {
        accessorKey: 'user_name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <User className="mr-2 h-4 w-4" />
                    Tenant Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const tenant = row.original;
            const isDeleted = tenant.deleted_at !== null;

            return (
                <div className="flex flex-col pl-3">
                    <div className="flex items-center gap-2">
                        <span className={`font-medium ${isDeleted ? 'text-muted-foreground line-through' : ''}`}>
                            {tenant.user_name}
                        </span>
                        {isDeleted && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                                Deleted
                            </Badge>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground">ID: {tenant.id}</span>
                    {tenant.tenant_occupation && (
                        <span className={`text-xs ${isDeleted ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                            {tenant.tenant_occupation}
                        </span>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'email',
        header: 'Contact Information',
        cell: ({ row }) => {
            const tenant = row.original;
            const isDeleted = tenant.deleted_at !== null;

            return (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className={`truncate max-w-[200px] ${isDeleted ? 'text-muted-foreground/60' : ''}`}>
                            {tenant.email}
                        </span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className={isDeleted ? 'text-muted-foreground/60' : ''}>{tenant.user_contact_number}</span>
                    </div>
                    {tenant.emergency_contact && (
                        <div className={`text-xs ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                            Emergency: {tenant.emergency_contact}
                        </div>
                    )}
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'employment_status',
        header: 'Employment',
        cell: ({ row }) => {
            const status = row.getValue('employment_status') as string | null;
            const isDeleted = row.original.deleted_at !== null;

            if (!status) {
                return <span className={`${isDeleted ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>Not specified</span>;
            }

            const config = employmentStatusConfig[status.toLowerCase() as keyof typeof employmentStatusConfig] ||
                {
                    variant: 'secondary' as const,
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    borderColor: '#e5e7eb'
                };

            return (
                <Badge
                    variant={config.variant}
                    style={{
                        backgroundColor: config.backgroundColor,
                        color: config.color,
                        borderColor: config.borderColor,
                        border: '1px solid',
                        opacity: isDeleted ? 0.6 : 1
                    }}
                    className="capitalize font-medium"
                >
                    {status}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const status = row.getValue(id) as string | null;
            return value.includes(status || 'not-specified');
        }
    },
    {
        accessorKey: 'current_lease',
        header: 'Current Property',
        cell: ({ row }) => {
            const lease = row.original.current_lease;
            const isDeleted = row.original.deleted_at !== null;

            if (!lease) {
                return (
                    <div className={`text-sm ${isDeleted ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                        No active lease
                    </div>
                );
            }

            return (
                <div className="flex flex-col">
                    <div className="flex items-center text-sm font-medium">
                        <Building className="mr-2 h-3 w-3" />
                        <span className={`truncate max-w-[150px] ${isDeleted ? 'text-muted-foreground/60' : ''}`}>
                            {lease.units.address}
                        </span>
                    </div>
                    {lease.units.unit_number && (
                        <span className={`text-xs ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                            Unit: {lease.units.unit_number}
                        </span>
                    )}
                    <span className={`text-xs ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                        ${lease.monthly_rent.toLocaleString()}/month
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        id: 'lease_status',
        accessorFn: (row) => row.current_lease?.lease_status || 'no-lease',
        header: 'Lease Status',
        cell: ({ row }) => {
            const lease = row.original.current_lease;
            const status = lease?.lease_status || 'no-lease';
            const isDeleted = row.original.deleted_at !== null;

            const config = leaseStatusConfig[status as keyof typeof leaseStatusConfig];

            return (
                <div className="flex flex-col">
                    <Badge
                        variant={config.variant}
                        style={{
                            backgroundColor: config.backgroundColor,
                            color: config.color,
                            borderColor: config.borderColor,
                            border: '1px solid',
                            opacity: isDeleted ? 0.6 : 1
                        }}
                        className="font-medium"
                    >
                        {config.label}
                    </Badge>
                    {lease && (
                        <span className={`text-xs mt-1 ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                            Until: {new Date(lease.end_date).toLocaleDateString()}
                        </span>
                    )}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const status = row.original.current_lease?.lease_status || 'no-lease';
            return value.includes(status);
        }
    },
    {
        // Add status column for filtering
        id: 'status',
        accessorFn: (row) => row.deleted_at ? 'deleted' : 'active',
        header: 'Status',
        cell: ({ row }) => {
            const isDeleted = row.original.deleted_at !== null;

            if (isDeleted) {
                return (
                    <div className="flex flex-col">
                        <Badge variant="outline" className="text-red-600 border-red-200">
                            Deleted
                        </Badge>
                        <span className="text-xs text-muted-foreground mt-1">
                            {new Date(row.original.deleted_at!).toLocaleDateString()}
                        </span>
                    </div>
                );
            }

            return (
                <Badge variant="outline" className="text-green-600 border-green-200">
                    Active
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const status = row.original.deleted_at ? 'deleted' : 'active';
            return value.includes(status);
        }
    },
    {
        accessorKey: 'move_in_date',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Move-in Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const moveInDate = row.getValue('move_in_date') as string | null;
            const isDeleted = row.original.deleted_at !== null;

            if (!moveInDate) {
                return <span className={`pl-4 ${isDeleted ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>Not set</span>;
            }

            const date = new Date(moveInDate);
            return (
                <div className="flex flex-col pl-4">
                    <span className={isDeleted ? 'text-muted-foreground/60' : ''}>{date.toLocaleDateString()}</span>
                    <span className={`text-xs ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                        {Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Date Added
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            const isDeleted = row.original.deleted_at !== null;

            return (
                <div className="pl-3 flex flex-col">
                    <span className={isDeleted ? 'text-muted-foreground/60' : ''}>{date.toLocaleDateString()}</span>
                    <span className={`text-xs ${isDeleted ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const tenant = row.original;
            const isDeleted = tenant.deleted_at !== null;

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
                        <DropdownMenuSeparator />

                        {!isDeleted ? (
                            <>
                                <DropdownMenuItem onClick={() => router.visit(`/landlord/tenants/${tenant.id}`)}>
                                    <Eye className="mr-2 h-4 w-4" /> View tenant
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.visit(`/landlord/tenants/${tenant.id}/edit`)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit tenant
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(tenant.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete tenant
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem onClick={() => router.visit(`/landlord/tenants/${tenant.id}`)}>
                                    <Eye className="mr-2 h-4 w-4" /> View tenant
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600" onClick={() => handleRestore(tenant.id)}>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Restore tenant
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
