import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import CurrentBillInfo from "./current-bill-info";

interface currentBill {
    id: number;
    billingDate: string;
    rentAmount: string;
    dueDate: string;
    paymentStatus: string;
    amountPaid: string;
}

interface currentBillProps {
    currentBill: currentBill;
}

const CurrentBill = ({ currentBill }:currentBillProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle className = "flex items-center gap-2">
                        <DollarSign className = "w-5 h-5" />
                        Current Bill
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
                        <CurrentBillInfo title = "Billing Date" info = {currentBill.billingDate} />
                        <CurrentBillInfo title = "Due Date" info = {currentBill.dueDate} />
                        <CurrentBillInfo title = "Amount" info = {currentBill.rentAmount} />
                        <CurrentBillInfo title = "Status" info = {currentBill.paymentStatus} />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default CurrentBill;