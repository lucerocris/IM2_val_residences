import { AlertCircle } from "lucide-react";
import type { RentalBill } from "@/types/tenantDashboard.types";

interface UnpaidBillsProps {
    currentBill: RentalBill[];
}

const UnpaidBills = ({ currentBill }:UnpaidBillsProps) => {

    const formatCurrency = (amount: number | string) => {
        return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    }

    const unpaidBills = currentBill.filter((bill) => bill.payment_status !== "paid")
    const totalUnpaid = unpaidBills.reduce((sum, bill) => sum + Number.parseFloat(bill.rent_amount), 0)
    const overdueBills = unpaidBills.filter((bill) => bill.payment_status === "overdue")
    const pendingBills = unpaidBills.filter((bill) => bill.payment_status === "pending")

    return(
        <div className="rounded-lg bg-gradient-to-r from-red-50 to-orange-50 p-4 border border-red-100">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-semibold text-red-900">Outstanding Balance</h3>
                    </div>
                    <p className="text-2xl font-bold text-red-900">{formatCurrency(totalUnpaid)}</p>
                    <p className="text-sm text-red-700 mt-1">
                        {overdueBills.length > 0 && `${overdueBills.length} overdue`}
                        {overdueBills.length > 0 && pendingBills.length > 0 && ", "}
                        {pendingBills.length > 0 && `${pendingBills.length} pending`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UnpaidBills;