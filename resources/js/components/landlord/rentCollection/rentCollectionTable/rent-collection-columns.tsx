import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    DollarSign, 
    Send, 
    MoreHorizontal,
    User,
    Home
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface RentalBill {
    id: number
    lease_id: number
    tenant_name: string
    tenant_contact: string
    unit_address: string
    unit_number?: string
    billing_date: string
    due_date: string
    rent_amount: number
    paid_date?: string
    amount_paid: number
    payment_status: "paid" | "pending" | "overdue" | "partial"
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "paid":
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Paid
                </Badge>
            )
        case "pending":
            return (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                </Badge>
            )
        case "overdue":
            return (
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Overdue
                </Badge>
            )
        case "partial":
            return (
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Partial
                </Badge>
            )
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const rentCollectionColumns: ColumnDef<RentalBill>[] = [
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
        accessorKey: "tenant_info",
        header: "Tenant",
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div className="flex items-center space-x-3">
                    <User className="h-8 w-8 text-gray-400" />
                    <div>
                        <div className="font-medium text-gray-900">{bill.tenant_name}</div>
                        <div className="text-sm text-gray-500">{bill.tenant_contact}</div>
                    </div>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            const bill = row.original
            return bill.tenant_name.toLowerCase().includes(value.toLowerCase()) ||
                   bill.tenant_contact.toLowerCase().includes(value.toLowerCase())
        },
    },
    {
        accessorKey: "property_info",
        header: "Property",
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div className="flex items-center space-x-3">
                    <Home className="h-4 w-4 text-gray-400" />
                    <div>
                        <div className="font-medium">{bill.unit_address}</div>
                        {bill.unit_number && (
                            <div className="text-sm text-gray-500">Unit {bill.unit_number}</div>
                        )}
                    </div>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            const bill = row.original
            return bill.unit_address.toLowerCase().includes(value.toLowerCase())
        },
    },
    {
        accessorKey: "billing_date",
        header: "Billing Date",
        cell: ({ row }) => {
            return <div>{formatDate(row.getValue("billing_date"))}</div>
        },
    },
    {
        accessorKey: "due_date", 
        header: "Due Date",
        cell: ({ row }) => {
            const dueDate = new Date(row.getValue("due_date"))
            const today = new Date()
            const isOverdue = dueDate < today && row.original.payment_status !== "paid"
            
            return (
                <div className={isOverdue ? "text-red-600 font-medium" : ""}>
                    {formatDate(row.getValue("due_date"))}
                </div>
            )
        },
    },
    {
        accessorKey: "rent_amount",
        header: "Rent Amount",
        cell: ({ row }) => {
            return <div className="font-medium">{formatCurrency(row.getValue("rent_amount"))}</div>
        },
    },
    {
        accessorKey: "amount_paid",
        header: "Amount Paid", 
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div>
                    <div className="font-medium">{formatCurrency(bill.amount_paid)}</div>
                    {bill.payment_status === "partial" && (
                        <div className="text-sm text-gray-500">
                            of {formatCurrency(bill.rent_amount)}
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "payment_status",
        header: "Status",
        cell: ({ row }) => {
            return getStatusBadge(row.getValue("payment_status"))
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const bill = row.original
            
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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(bill.id.toString())}
                        >
                            Copy bill ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        
                        {bill.payment_status !== "paid" && (
                            <>
                                <DropdownMenuItem>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as paid
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Record partial payment
                                </DropdownMenuItem>
                            </>
                        )}
                        
                        <DropdownMenuItem>
                            View details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
] 