import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, User, Building, Calendar, DollarSign, FileText, Wrench, AlertCircle, CheckCircle, Clock } from 'lucide-react';
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

export type MaintenanceRequest = {
    id: string
    tenant_id: string
    unit_id: string
    lease_id: string | null
    request_date: string
    maintenance_description: string
    request_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    priority_level: 'low' | 'medium' | 'high' | 'urgent'
    scheduled_date: string | null
    completion_date: string | null
    tenant_remarks: string | null
    landlord_notes: string | null
    estimated_cost: number | null
    actual_cost: number | null
    created_at: string
    updated_at: string
    // Related data
    tenant: {
        id: string
        user_name: string
        email: string
        user_contact_number: string
    }
    unit: {
        id: string
        address: string
        unit_number: string | null
        property_type: 'duplex' | 'triplex'
        landlord: {
            id: string
            user_name: string
        }
    }
    lease?: {
        id: string
        start_date: string
        end_date: string
        lease_status: string
    }
}

const requestStatusConfig = {
    'pending': {
        variant: 'secondary' as const,
        backgroundColor: '#fef3c7',
        color: '#d97706',
        borderColor: '#fde68a',
        label: 'Pending',
        icon: Clock
    },
    'in_progress': {
        variant: 'secondary' as const,
        backgroundColor: '#dbeafe',
        color: '#2563eb',
        borderColor: '#bfdbfe',
        label: 'In Progress',
        icon: Wrench
    },
    'completed': {
        variant: 'secondary' as const,
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#bbf7d0',
        label: 'Completed',
        icon: CheckCircle
    },
    'cancelled': {
        variant: 'secondary' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'Cancelled',
        icon: Trash2
    }
};

const priorityLevelConfig = {
    'low': {
        variant: 'outline' as const,
        backgroundColor: '#f8fafc',
        color: '#64748b',
        borderColor: '#e2e8f0',
        label: 'Low'
    },
    'medium': {
        variant: 'secondary' as const,
        backgroundColor: '#fef3c7',
        color: '#d97706',
        borderColor: '#fde68a',
        label: 'Medium'
    },
    'high': {
        variant: 'secondary' as const,
        backgroundColor: '#fed7d7',
        color: '#c53030',
        borderColor: '#feb2b2',
        label: 'High'
    },
    'urgent': {
        variant: 'destructive' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'Urgent'
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

export const maintenanceColumns: ColumnDef<MaintenanceRequest>[] = [
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
            const request = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-medium">{request.tenant.user_name}</span>
                    <span className="text-xs text-muted-foreground">{request.tenant.email}</span>
                    <span className="text-xs text-muted-foreground">{request.tenant.user_contact_number}</span>
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
            const request = row.original;

            return (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm font-medium">
                        <Building className="mr-2 h-3 w-3" />
                        <span className="truncate max-w-[200px]">{request.unit.address}</span>
                    </div>
                    {request.unit.unit_number && (
                        <span className="text-xs text-muted-foreground">
                            Unit: {request.unit.unit_number}
                        </span>
                    )}
                    <div className="flex items-center space-x-1">
                        <Badge variant={propertyTypeConfig[request.unit.property_type].variant} className="text-xs">
                            {propertyTypeConfig[request.unit.property_type].label}
                        </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Owner: {request.unit.landlord.user_name}
                    </span>
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'maintenance_description',
        id: 'description',
        header: 'Issue Description',
        cell: ({ row }) => {
            const request = row.original;

            return (
                <div className="flex flex-col space-y-1 max-w-[300px]">
                    <span className="text-sm line-clamp-2" title={request.maintenance_description}>
                        {request.maintenance_description}
                    </span>
                    {request.tenant_remarks && (
                        <span className="text-xs text-muted-foreground line-clamp-1" title={request.tenant_remarks}>
                            Remarks: {request.tenant_remarks}
                        </span>
                    )}
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'request_status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('request_status') as string;
            const config = requestStatusConfig[status as keyof typeof requestStatusConfig];
            const Icon = config.icon;

            return (
                <Badge
                    variant={config.variant}
                    style={{
                        backgroundColor: config.backgroundColor,
                        color: config.color,
                        borderColor: config.borderColor,
                        border: '1px solid'
                    }}
                    className="font-medium flex items-center w-fit"
                >
                    <Icon className="mr-1 h-3 w-3" />
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
        accessorKey: 'priority_level',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Priority
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const priority = row.getValue('priority_level') as string;
            const config = priorityLevelConfig[priority as keyof typeof priorityLevelConfig];

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
            const priority = row.getValue(id) as string;
            return value.includes(priority);
        }
    },
    {
        accessorKey: 'request_date',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Dates
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const request = row.original;
            const requestDate = new Date(request.request_date);
            const scheduledDate = request.scheduled_date ? new Date(request.scheduled_date) : null;
            const completionDate = request.completion_date ? new Date(request.completion_date) : null;

            return (
                <div className="flex flex-col space-y-1">
                    <div className="text-sm">
                        <span className="font-medium">Requested:</span>
                        <span className="ml-1">{requestDate.toLocaleDateString()}</span>
                    </div>
                    {scheduledDate && (
                        <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Scheduled:</span>
                            <span className="ml-1">{scheduledDate.toLocaleDateString()}</span>
                        </div>
                    )}
                    {completionDate && (
                        <div className="text-xs text-green-600">
                            <span className="font-medium">Completed:</span>
                            <span className="ml-1">{completionDate.toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'estimated_cost',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Cost
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const request = row.original;

            return (
                <div className="flex flex-col">
                    {request.estimated_cost !== null && (
                        <span className="text-sm">
                            <span className="text-muted-foreground">Est:</span>
                            <span className="ml-1 font-medium">${request.estimated_cost.toLocaleString()}</span>
                        </span>
                    )}
                    {request.actual_cost !== null && (
                        <span className="text-sm">
                            <span className="text-muted-foreground">Actual:</span>
                            <span className="ml-1 font-medium">${request.actual_cost.toLocaleString()}</span>
                        </span>
                    )}
                    {request.estimated_cost === null && request.actual_cost === null && (
                        <span className="text-xs text-muted-foreground">Not specified</span>
                    )}
                </div>
            );
        }
    },
    {
        id: 'notes',
        header: 'Notes',
        cell: ({ row }) => {
            const request = row.original;

            return (
                <div className="flex flex-col space-y-1 max-w-[200px]">
                    {request.landlord_notes && (
                        <div className="text-xs">
                            <span className="font-medium text-muted-foreground">Landlord:</span>
                            <span className="ml-1 line-clamp-2" title={request.landlord_notes}>
                                {request.landlord_notes}
                            </span>
                        </div>
                    )}
                    {!request.landlord_notes && (
                        <span className="text-xs text-muted-foreground">No notes</span>
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
            const request = row.original;

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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(request.id)}>
                            Copy request ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit request
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" /> Contact tenant
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {request.request_status === 'pending' && (
                            <>
                                <DropdownMenuItem className="text-blue-600">
                                    <Wrench className="mr-2 h-4 w-4" /> Mark in progress
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" /> Schedule work
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" /> Cancel request
                                </DropdownMenuItem>
                            </>
                        )}
                        {request.request_status === 'in_progress' && (
                            <>
                                <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="mr-2 h-4 w-4" /> Mark completed
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DollarSign className="mr-2 h-4 w-4" /> Add costs
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" /> Cancel request
                                </DropdownMenuItem>
                            </>
                        )}
                        {request.request_status === 'completed' && (
                            <>
                                <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" /> View report
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DollarSign className="mr-2 h-4 w-4" /> Edit costs
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];