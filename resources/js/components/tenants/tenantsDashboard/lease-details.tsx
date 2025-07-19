import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Calendar, DollarSign, FileText, AlertCircle } from "lucide-react"
import type { Lease, RentalBill } from "@/types/tenantDashboard.types"
import { DepositAmount, EndDate, LeaseStatus, LeaseTerm, MonthlyRent, RemainingBalance, StartDate } from "./lease-details/lease-details-grid"

interface LeaseDetailsProps {
    leaseData: Lease
    rentalBill?: RentalBill[]
}

const LeaseDetails = ({ leaseData, rentalBill }: LeaseDetailsProps) => {
    // Calculate remaining balance from rental bills
    const calculateRemainingBalance = () => {
        if (!rentalBill || rentalBill.length === 0) return 0
        return rentalBill
            .filter((bill) => bill.payment_status !== "paid")
            .reduce((sum, bill) => sum + Number.parseFloat(bill.rent_amount), 0)
    }

    const remainingBalance = calculateRemainingBalance()

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Home className="w-5 h-5 text-blue-600" />
                    Lease Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Property Address */}
                    <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                        <h3 className="font-semibold text-blue-900 mb-1">Property Address</h3>
                        <p className="text-blue-800">
                            {leaseData.units?.address}
                            {leaseData.units?.unit_number && ` - Unit ${leaseData.units.unit_number}`}
                        </p>
                    </div>

                    {/* Lease Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <StartDate start_date = {leaseData.start_date} />
                            <MonthlyRent monthly_rent = {leaseData.monthly_rent} />
                            <LeaseTerm lease_term = {leaseData.lease_term} />
                        </div>

                        <div className="space-y-4">
                            <EndDate end_date = {leaseData.end_date} />
                            <DepositAmount deposit_amount = {leaseData.deposit_amount} />
                            <LeaseStatus lease_status = {leaseData.lease_status} />
                        </div>
                    </div>

                    {/* Remaining Balance */}
                    {remainingBalance > 0 && <RemainingBalance remaining_balance={remainingBalance} />}
                </div>
            </CardContent>
        </Card>
    )
}

export default LeaseDetails
