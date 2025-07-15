import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import CurrentBillInfo from "./current-bill-info";
import { RentalBill } from '@/types/tenantDashboard.types';

interface currentBillProps {
    currentBill: RentalBill;
}

const CurrentBill = ({ currentBill }: currentBillProps) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Current Bill
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <CurrentBillInfo title="Billing Date" info={currentBill.billing_date} />
                        <CurrentBillInfo title="Due Date" info={currentBill.due_date} />
                        <CurrentBillInfo title="Amount" info={currentBill.rent_amount} />
                        <CurrentBillInfo title="Status" info={currentBill.payment_status} />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default CurrentBill;
