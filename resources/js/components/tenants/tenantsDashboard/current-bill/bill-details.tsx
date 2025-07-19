import { Badge } from "@/components/ui/badge";

interface BillDetailsProps {
    due_date?: string;
    rent_amount?: string;
    payment_status?: "paid" | "pending" | "overdue" | "partial" | string;
    billing_date?: string;
} 

export const BillPeriod = ({ due_date }:BillDetailsProps) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Bill Period:</span>
            <span className="font-medium text-gray-900">{due_date}</span>
        </div>
    )
}

export const AmountDue = ({ rent_amount }:BillDetailsProps) => {
    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount Due:</span>
            <span className="font-semibold text-red-600">{rent_amount}</span>
        </div>
    )
}

export const DueDate = ({ payment_status, due_date }:BillDetailsProps) => {
    const getStatusColor = (status:string) => {
        switch(status) {
            case "overdue":
                return "text-red-600"
            case "pending":
                return "text-yellow-600"
            default:
                return "text-gray-600"
        }
    }

    const statusColor = payment_status ? getStatusColor(payment_status) : "text-gray-600"

    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Due Date:</span>
            <span className={`text-sm font-medium ${statusColor}`}>
            {due_date}
            </span>
        </div>
    )
}

export const BillingDate = ({ billing_date }:BillDetailsProps) => {
    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Billing Date:</span>
            <span className="text-sm text-gray-900">{billing_date}</span>
        </div>
    )
}

export const Status = ({ payment_status }:BillDetailsProps) => {
    const statusLabel = payment_status ? payment_status.charAt(0).toUpperCase() + payment_status.slice(1) : "N/A";

    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge
                variant={payment_status === "overdue" ? "destructive" : "secondary"}
                className={
                    payment_status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : payment_status === "partial"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : ""
                }
            >
                {statusLabel}
            </Badge>
        </div>
    )
}