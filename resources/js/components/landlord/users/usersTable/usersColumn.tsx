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
import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Mail, MoreHorizontal, Phone, Trash2, User } from 'lucide-react';

export type User = {
    id: string;
    user_name: string;
    email: string;
    user_contact_number: string;
    user_type: 'tenant' | 'prospective_tenant';
    // Tenant specific fields
    move_in_date: string | null;
    employment_status: string | null;
    emergency_contact: string | null;
    tenant_occupation: string | null;
    // Prospective tenant specific fields
    monthly_income: number | null;
    current_address: string | null;
    created_at: string;
};

const handleDelete = (userId: string, type: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
        if (type == 'prospective_tenant') {
            router.delete(`/landlord/users/${userId}`, {
                preserveScroll: true
            });
        } else {
            router.delete(`/landlord/tenants/${userId}`, {
                preserveScroll: true
            });
        }

    }
};

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'user_name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <User className="mr-2 h-4 w-4" />
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.getValue('user_name') as string;

            return (
                <div className="pl-4 flex max-w-[200px] flex-col">
                    <span className="truncate font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground">ID: {row.original.id}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const email = row.getValue('email') as string;
            return (
                <div className="pl-4 flex max-w-[250px] flex-col">
                    <span className="truncate">{email}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'user_contact_number',
        header: () => {
            return (
                <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                </div>
            );
        },
        cell: ({ row }) => {
            const contact = row.getValue('user_contact_number') as string;
            return <span className="font-mono">{contact}</span>;
        }
    },
    {
        accessorKey: 'user_type',
        header: () => <span className="font-bold text-gray-700 pl-3">User Type</span>,
        cell: ({ row }) => {
            const type = row.getValue('user_type') as string;

            const typeConfig = {
                tenant: {
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    borderColor: '#bbf7d0',
                    label: 'Tenant'
                },
                prospective_tenant: {
                    backgroundColor: '#dbeafe',
                    color: '#2563eb',
                    borderColor: '#bfdbfe',
                    label: 'Prospective Tenant'
                }
            };

            const config = typeConfig[type as keyof typeof typeConfig] || {
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                borderColor: '#e5e7eb',
                label: 'Unknown'
            };

            return (
                <div className="pl-3">
                    <Badge
                        variant="secondary"
                        className="font-medium"
                        style={{
                            backgroundColor: config.backgroundColor,
                            color: config.color,
                            borderColor: config.borderColor,
                            border: '1px solid'
                        }}
                    >
                        {config.label}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        }
    },
    {
        accessorKey: 'employment_status',
        header: () => <span className="font-bold text-gray-700 pl-3">Employment</span>,
        cell: ({ row }) => {
            const employment = row.getValue('employment_status') as string | null;
            const userType = row.original.user_type;

            if (userType !== 'tenant') {
                return <span className="text-muted-foreground pl-3">N/A</span>;
            }

            return employment ? (
                <div className="pl-3">
                    <Badge variant="outline" className="capitalize">
                        {employment}
                    </Badge>
                </div>
            ) : (
                <span className="text-muted-foreground pl-3">Not specified</span>
            );
        },
        enableSorting: false
    },
    {
        accessorKey: 'monthly_income',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Monthly Income
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const income = row.getValue('monthly_income') as number | null;
            const userType = row.original.user_type;

            if (userType !== 'prospective_tenant') {
                return <span className="text-muted-foreground pl-3">N/A</span>;
            }

            if (!income) {
                return <span className="text-muted-foreground">Not specified</span>;
            }

            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(income);

            return <span className="pl-3 font-medium">{formatted}</span>;
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
            const userType = row.original.user_type;

            if (userType !== 'tenant') {
                return <span className="text-muted-foreground pl-4">N/A</span>;
            }

            if (!moveInDate) {
                return <span className="text-muted-foreground">Not set</span>;
            }

            const date = new Date(moveInDate);
            return (
                <div className="pl-4 flex flex-col">
                    <span>{date.toLocaleDateString()}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'current_address',
        header: 'Current Address',
        cell: ({ row }) => {
            const address = row.getValue('current_address') as string | null;
            const userType = row.original.user_type;

            if (userType !== 'prospective_tenant') {
                return <span className="text-muted-foreground">N/A</span>;
            }

            return address ? (
                <div className="max-w-[200px]">
                    <span className="truncate">{address}</span>
                </div>
            ) : (
                <span className="text-muted-foreground">Not specified</span>
            );
        },
        enableSorting: false
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original;

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
                        <DropdownMenuItem onClick={() => router.visit(`/admin/users/${user.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit user
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(user.id, user.user_type)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete user
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
