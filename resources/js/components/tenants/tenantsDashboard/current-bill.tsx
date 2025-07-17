import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import CurrentBillInfo from "./current-bill-info";
import { RentalBill } from '@/types/tenantDashboard.types';

interface currentBillProps {
    currentBill: RentalBill[];
}

const CurrentBill = ({ currentBill }: currentBillProps) => {
    if (!currentBill || currentBill.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Current Bill
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-gray-500 py-8 text-center">
                        There is no current bill available.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Current Bill
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <CurrentBillInfo title="Due Date" info={currentBill[0].due_date} />
                    <CurrentBillInfo title="Rent Amount" info={currentBill[0].rent_amount} />
                    <CurrentBillInfo title="Paid" info={currentBill[0].amount_paid} />
                    <CurrentBillInfo title="Balance" info={currentBill[0].balance} />
                    <CurrentBillInfo title="Status" info={currentBill[0].payment_status} />
                </div>
            </CardContent>
        </Card>
    );
}


export default CurrentBill;
