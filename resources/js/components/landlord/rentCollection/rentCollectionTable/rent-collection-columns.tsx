import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import { AlertCircle, CheckCircle, Clock, DollarSign, Home, MoreHorizontal, User, ShieldCheck, Eye } from 'lucide-react';
import { router } from '@inertiajs/react';

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/
export interface RentalBill {
    id: number;
    lease: {
        id: string;
        tenant: {
            id: string;
            user_name: string;
            user_contact_number: string;
        };

        units: {
            id: string;
            address: string;
            unit_number: string;
        };
    };

    due_date: string;
    rent_amount: number;
    paid_date?: string;
    amount_paid: number;
    payment_status: 'paid' | 'pending' | 'overdue' | 'partial';
    proof_of_payment_path?: string;
    reference_number?: string;
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'paid':
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Paid
                </Badge>
            );
        case 'pending':
            return (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                </Badge>
            );
        case 'pending_verification':
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Pending Verification
                </Badge>
            );
        case 'overdue':
            return (
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Overdue
                </Badge>
            );
        case 'partial':
            return (
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    <DollarSign className="mr-1 h-3 w-3" />
                    Partial
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const getStorageUrl = (path: string | undefined) => {
    if (!path) return '';
    // Adjust this base URL to match your storage configuration
    // For Laravel storage, it's typically: `/storage/${path}`
    // For other setups, it might be different
    return `/storage/${path}`;
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount);

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });


const handlePaid = (billID: number) => {
    router.patch(`/landlord/payments/${billID}/paid`, {
        payment_status: 'paid'
    }, {
        preserveScroll: true,
    });
}

/*
|--------------------------------------------------------------------------
| Column definitions
|--------------------------------------------------------------------------
*/
export const rentCollectionColumns: ColumnDef<RentalBill>[] = [
    /* ---------------------------------------------------------------------
     * Tenant
     * ------------------------------------------------------------------- */
    {
        accessorKey: 'tenant_info',
        header: 'Tenant',
        cell: ({ row }) => {
            const bill = row.original;
            return (
                <div className="flex items-center space-x-3">
                    <User className="h-8 w-8 text-gray-400" />
                    <div>
                        <div className="font-medium text-gray-900">{bill.lease.tenant.user_name}</div>
                        <div className="text-sm text-gray-500">{bill.lease.tenant.user_contact_number}</div>
                    </div>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const bill = row.original;
            return (
                bill.lease.tenant.user_name.toLowerCase().includes(value.toLowerCase()) ||
                bill.lease.tenant.user_contact_number.toLowerCase().includes(value.toLowerCase())
            );
        },
    },
    /* ---------------------------------------------------------------------
     * Property
     * ------------------------------------------------------------------- */
    {
        accessorKey: 'property_info',
        header: 'Property',
        cell: ({ row }) => {
            const bill = row.original;
            return (
                <div className="flex items-center space-x-3">
                    <Home className="h-4 w-4 text-gray-400" />
                    <div>
                        <div className="font-medium">{bill.lease.units.address}</div>
                        {bill.lease.units.unit_number && <div className="text-sm text-gray-500">Unit {bill.lease.units.unit_number}</div>}
                    </div>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const bill = row.original;
            return bill.lease.units.address.toLowerCase().includes(value.toLowerCase());
        },
    },
    /* ---------------------------------------------------------------------
     * Billing / Due dates
     * ------------------------------------------------------------------- */
    // {
    //   accessorKey: "billing_date",
    //   header: "Billing Date",
    //   cell: ({ row }) => <div>{formatDate(row.getValue("billing_date"))}</div>,
    // },
    {
        accessorKey: 'due_date',
        header: 'Due Date',
        cell: ({ row }) => {
            const dueDate = new Date(row.getValue('due_date'));
            const today = new Date();
            const isOverdue = dueDate < today && row.original.payment_status !== 'paid';

            return <div className={isOverdue ? 'font-medium text-red-600' : ''}>{formatDate(row.getValue('due_date'))}</div>;
        },
    },
    /* ---------------------------------------------------------------------
     * Amounts
     * ------------------------------------------------------------------- */
    {
        accessorKey: 'rent_amount',
        header: 'Rent Amount',
        cell: ({ row }) => <div className="font-medium">{formatCurrency(row.getValue('rent_amount'))}</div>,
    },
    {
        accessorKey: 'amount_paid',
        header: 'Amount Paid',
        cell: ({ row }) => {
            const bill = row.original;
            return (
                <div>
                    <div className="font-medium">{formatCurrency(bill.amount_paid)}</div>
                    {bill.payment_status === 'partial' && <div className="text-sm text-gray-500">of {formatCurrency(bill.rent_amount)}</div>}
                </div>
            );
        },
    },
    /* ---------------------------------------------------------------------
     * Proof of Payment
     * ------------------------------------------------------------------- */
    {
        accessorKey: 'proof_of_payment',
        header: 'Proof of Payment',
        cell: ({ row }) => {
            const bill = row.original;
            const hasProof = bill.proof_of_payment_path;

            if (!hasProof) {
                return <div className="text-sm text-gray-400">No proof uploaded</div>;
            }

            // Build the complete URL
            const imageUrl = getStorageUrl(bill.proof_of_payment_path);

            return (
                <div className="flex items-center space-x-3">

                    <div className="flex-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-blue-400 hover:text-blue-800 font-medium"
                            onClick={() => {
                                window.open(imageUrl, '_blank');
                            }}
                        >
                            <Eye className="mr-1 h-3 w-3" />
                            View Image
                        </Button>
                        {bill.reference_number && (
                            <div className="text-xs text-gray-500 mt-1">
                                Ref: {bill.reference_number}
                            </div>
                        )}
                    </div>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const bill = row.original;
            if (value === 'has_proof') {
                return !!bill.proof_of_payment_path;
            }
            if (value === 'no_proof') {
                return !bill.proof_of_payment_path;
            }
            return true;
        },
    },
    /* ---------------------------------------------------------------------
     * Status
     * ------------------------------------------------------------------- */
    {
        accessorKey: 'payment_status',
        header: 'Status',
        cell: ({ row }) => getStatusBadge(row.getValue('payment_status')),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    /* ---------------------------------------------------------------------
     * Actions
     * ------------------------------------------------------------------- */
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const bill = row.original;

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

                        {bill.payment_status !== 'paid' && (
                            <>
                                <DropdownMenuItem onClick={() => handlePaid(bill.id)}>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                                    Mark as paid
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
