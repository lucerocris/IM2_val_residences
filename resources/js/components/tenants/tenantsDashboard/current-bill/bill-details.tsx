import { Badge } from "@/components/ui/badge";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

interface BillPeriodProps {
    due_date: string;
}

export const BillPeriod = ({ due_date }:BillPeriodProps) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Bill Period:</span>
            <span className="font-medium text-gray-900">{due_date}</span>
        </div>
    )
}

interface AmountDueProps {
    rent_amount: string;
}

export const AmountDue = ({ rent_amount }:AmountDueProps) => {
    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount Due:</span>
            <span className="font-semibold text-red-600">{rent_amount}</span>
        </div>
    )
}

interface DueDateProps {
    payment_status: string;
    due_date: string;
}

export const DueDate = ({ payment_status, due_date }:DueDateProps) => {
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

    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Due Date:</span>
            <span className={`text-sm font-medium ${getStatusColor(payment_status)}`}>
            {formatDate(due_date)}
            </span>
        </div>
    )
}

interface BillingDateProps {
    billing_date: string;
}

export const BillingDate = ({ billing_date }:BillingDateProps) => {
    return(
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Billing Date:</span>
            <span className="text-sm text-gray-900">{formatDate(billing_date)}</span>
        </div>
    )
}

interface StatusProps {
    payment_status: string;
}

export const Status = ({ payment_status }:StatusProps) => {

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
                {payment_status.charAt(0).toUpperCase() + payment_status.slice(1)}
            </Badge>
        </div>
    )
}