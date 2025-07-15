import type { ColumnDef } from '@tanstack/react-table';
import {
    ArrowUpDown,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    User,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Wrench
} from 'lucide-react';
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
import { router } from '@inertiajs/react';
import  { type MaintenanceRequest } from '@/types/maintenanceRequest.types';
import MaintenanceTableActions from '@/components/landlord/maintenance/MaintenanceTableActions';


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
        icon: AlertTriangle
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
        icon: XCircle
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
        variant: 'destructive' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'High'
    },
    'urgent': {
        variant: 'destructive' as const,
        backgroundColor: '#fecaca',
        color: '#991b1b',
        borderColor: '#f87171',
        label: 'Urgent'
    }
};





export const maintenanceRequestColumns: ColumnDef<MaintenanceRequest>[] = [
    {
        accessorKey: 'tenant',
        id: 'tenant_info',
        header: ({ column }) => {
            return (
                <Button className="pl-4" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tenant
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const request = row.original;
            return (
                <div className="pl-4 flex flex-col">
                    <span className="font-medium">{request.tenant.user_name}</span>
                    <span className="text-xs text-muted-foreground">{request.tenant.email}</span>
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
        header: 'Property',
        cell: ({ row }) => {
            const request = row.original;
            return (
                <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm truncate max-w-[200px]">
                        {request.unit.address}
                    </span>
                    {request.unit.unit_number && (
                        <span className="text-xs text-muted-foreground">
                            Unit: {request.unit.unit_number}
                        </span>
                    )}
                    <Badge variant="outline" className="text-xs w-fit">
                        {request.unit.property_type}
                    </Badge>
                </div>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'maintenance_description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('maintenance_description') as string;
            return (
                <div className="max-w-[300px]">
                    <p className="text-sm truncate" title={description}>
                        {description}
                    </p>
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
            const IconComponent = config.icon;

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
                    <IconComponent className="mr-1 h-3 w-3" />
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
        header: 'Priority',
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
                    Request Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('request_date'));
            return (
                <div className="pl-3 flex flex-col">
                    <span className="text-sm">{date.toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            );
        }
    },
    {
        id: 'cost_info',
        header: 'Cost',
        cell: ({ row }) => {
            const request = row.original;
            const estimatedCost = request.estimated_cost;
            const actualCost = request.actual_cost;

            if (actualCost) {
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            ₱{actualCost.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Actual
                        </span>
                    </div>
                );
            }

            if (estimatedCost) {
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            ₱{estimatedCost.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Estimated
                        </span>
                    </div>
                );
            }

            return (
                <span className="text-sm text-muted-foreground">
                    Not estimated
                </span>
            );
        },
        enableSorting: false
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const request = row.original;

            return (
                <>
                    <MaintenanceTableActions request={request} />
                </>
            );
        }
    }
];
