import { Calendar, DollarSign, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Global functions to be reused
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

const formatCurrency = (amount: number | string) => {
    return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
}

interface StartDateProps {
    start_date: string;
}

export const StartDate = ({ start_date }:StartDateProps) => {
    return(
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
                <p className="text-sm font-medium text-gray-900">Start Date</p>
                <p className="text-sm text-gray-600">{formatDate(start_date)}</p>
            </div>
        </div>
    )
}

interface MonthlyRentProps {
    monthly_rent: number;
}

export const MonthlyRent = ({monthly_rent}:MonthlyRentProps) => {
    return(
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <div>
                <p className="text-sm font-medium text-gray-900">Monthly Rent</p>
                <p className="text-sm text-gray-600">{formatCurrency(monthly_rent)}</p>
            </div>
        </div>
    )
}

interface LeaseTermProps{
    lease_term: number;
}

export const LeaseTerm = ({ lease_term }:LeaseTermProps) => {
    return(
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <FileText className="w-5 h-5 text-gray-600" />
            <div>
                <p className="text-sm font-medium text-gray-900">Lease Term</p>
                <p className="text-sm text-gray-600">{lease_term} months</p>
            </div>
        </div>
    )
}

interface EndDateProps {
    end_date: string;
}

export const EndDate = ({ end_date }:EndDateProps) => {
    return(
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
                <p className="text-sm font-medium text-gray-900">End Date</p>
                <p className="text-sm text-gray-600">{formatDate(end_date)}</p>
            </div>
        </div>
    )
}

interface DepositAmountProps {
    deposit_amount: number;
}

export const DepositAmount = ({ deposit_amount }:DepositAmountProps) => {
    return(
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <div>
                <p className="text-sm font-medium text-gray-900">Deposit Amount</p>
                <p className="text-sm text-gray-600">{formatCurrency(deposit_amount)}</p>
            </div>
        </div>
    )
}

interface LeaseStatusProps {
    lease_status: string;
}

export const LeaseStatus = ({ lease_status }:LeaseStatusProps) => {
        const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
            case "expired":
                return <Badge variant="secondary">Expired</Badge>
            case "terminated":
                return <Badge variant="destructive">Terminated</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 ">
            <p className="text-sm font-medium text-gray-900">Lease Status</p>
            <div className="flex items-center justify-center">{getStatusBadge(lease_status)}</div>
        </div>
    )
}

interface RemainingBalanceProps {
    remaining_balance: number;
}

export const RemainingBalance = ({remaining_balance}:RemainingBalanceProps) => {
    return(
        <div className="rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                    <h4 className="font-semibold text-red-900">Remaining Balance</h4>
                    <p className="text-lg font-bold text-red-900">{formatCurrency(remaining_balance)}</p>
                    <p className="text-sm text-red-700">Outstanding amount for this lease</p>
                </div>
            </div>
        </div>
    )
}