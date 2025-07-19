import { Calendar } from "lucide-react";
import { GetBillStatus } from "./get-bill-badges";
import { RentalBill } from "@/types/tenantDashboard.types";
import { Button } from "@/components/ui/button";

const getMonthYear = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    })
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

interface DatesProps {
    due_date: string;
    billing_date: string;
}

export const Dates = ({ due_date, billing_date }:DatesProps) => {
    
    return (
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
                <div className="rounded-full bg-gray-100 p-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                </div>
            </div>
            <div>
                <h5 className="font-medium text-gray-900">{getMonthYear(due_date)}</h5>
                <p className="text-sm text-gray-500">Due: {formatDate(due_date)}</p>
                {billing_date && (<p className="text-xs text-gray-400">Billed: {formatDate(billing_date)}</p>)}
            </div>
        </div>
    )
}

interface AmountAndStatusProps {
    bill: RentalBill;
    onPayNowClick: (bill: RentalBill) => void;
}

export const AmountAndStatus = ({ bill, onPayNowClick }:AmountAndStatusProps) => {

    return (
                <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="font-semibold text-gray-900">{bill.rent_amount}</p>
            </div>

            <div className="flex items-center gap-2">
                <GetBillStatus status = {bill.payment_status} />
                {bill.payment_status !== "paid" && (
                    <Button size="sm" variant="outline" onClick={() => onPayNowClick(bill)}>
                        Pay Now
                    </Button>
                )}
            </div>
        </div>
    )
}