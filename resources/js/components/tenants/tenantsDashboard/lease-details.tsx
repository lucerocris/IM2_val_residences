import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Home} from "lucide-react"
import type { Lease, RentalBill } from "@/types/tenantDashboard.types"
import { DepositAmount, EndDate, LeaseStatus, LeaseTerm, MonthlyRent, RemainingBalance, StartDate } from "./lease-details/lease-details-grid"
import PropertyAddress from "./lease-details/property-address"

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
                    <PropertyAddress address = {leaseData.units?.address} unit_number = {leaseData.units?.unit_number} />

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
