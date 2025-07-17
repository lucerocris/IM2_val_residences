import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Calendar, DollarSign, FileText, AlertCircle } from "lucide-react"
import type { Lease, RentalBill } from "@/types/tenantDashboard.types"

interface LeaseDetailsProps {
    leaseData: Lease
    rentalBill?: RentalBill[]
}

const LeaseDetails = ({ leaseData, rentalBill }: LeaseDetailsProps) => {
    const formatCurrency = (amount: number | string) => {
        return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

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
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <Calendar className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Start Date</p>
                                    <p className="text-sm text-gray-600">{formatDate(leaseData.start_date)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <DollarSign className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Monthly Rent</p>
                                    <p className="text-sm text-gray-600">{formatCurrency(leaseData.monthly_rent)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <FileText className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Lease Term</p>
                                    <p className="text-sm text-gray-600">{leaseData.lease_term} months</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <Calendar className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">End Date</p>
                                    <p className="text-sm text-gray-600">{formatDate(leaseData.end_date)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <DollarSign className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Deposit Amount</p>
                                    <p className="text-sm text-gray-600">{formatCurrency(leaseData.deposit_amount)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <div className="w-5 h-5 flex items-center justify-center">{getStatusBadge(leaseData.lease_status)}</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Lease Status</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Remaining Balance */}
                    {remainingBalance > 0 && (
                        <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <div>
                                    <h4 className="font-semibold text-red-900">Remaining Balance</h4>
                                    <p className="text-lg font-bold text-red-900">{formatCurrency(remainingBalance)}</p>
                                    <p className="text-sm text-red-700">Outstanding amount for this lease</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default LeaseDetails
