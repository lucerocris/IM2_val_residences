"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, CreditCard } from "lucide-react"
import type { RentalBill } from "@/types/tenantDashboard.types"
import { router } from "@inertiajs/react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import NoCurrentBills from "./current-bill/no-current-bill"
import { AmountDue, BillingDate, BillPeriod, DueDate, Status } from "./current-bill/bill-details"
import UnpaidBills from "./current-bill/summary-section"
import { AmountAndStatus, Dates } from "./current-bill/individual-bills"
import { formatCurrency } from "@/utils/format"
import { getMonthYear } from "@/utils/date"

interface CurrentBillProps {
    currentBill: RentalBill[]
    leaseData?: any
    leaseID?: number
}

const CurrentBill = ({ currentBill, leaseData, leaseID }: CurrentBillProps) => {
    const [selectedBill, setSelectedBill] = useState<RentalBill | null>(null)
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)

    const handlePayNowClick = (bill: RentalBill) => {
        setSelectedBill(bill)
        setPaymentModalOpen(true)
    }

    if (!currentBill || currentBill.length === 0) {
        return (
            <NoCurrentBills />
        )
    }

    // Calculate totals
    const unpaidBills = currentBill.filter((bill) => bill.payment_status !== "paid")

    return (
        <>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Current Bills
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Summary Section */}
                    {unpaidBills.length > 0 && <UnpaidBills currentBill={currentBill} />}

                    {/* Individual Bills */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Bill History</h4>
                        <div className="space-y-3">
                            {currentBill.map((bill) => (
                                <div
                                    key={bill.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
                                >
                                    <Dates due_date = {bill.due_date} billing_date = {bill.billing_date} />
                                    <AmountAndStatus bill = {bill} onPayNowClick = {handlePayNowClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Modal */}
            <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                <DialogContent className="sm:max-w-md">
                    {selectedBill && (
                        <BillPaymentModal
                            bill={selectedBill}
                            leaseData={leaseData}
                            leaseID={leaseID}
                            onClose={() => setPaymentModalOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

interface BillPaymentModalProps {
    bill: RentalBill
    leaseData?: any
    leaseID?: number
    onClose: () => void
}

const BillPaymentModal = ({ bill, leaseData, leaseID, onClose }: BillPaymentModalProps) => {
    const [paymentMethod, setPaymentMethod] = useState("")
    const [amount, setAmount] = useState(bill.rent_amount)

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Pay Bill - {getMonthYear(bill.due_date)}
                </DialogTitle>
                <DialogDescription>Pay your rent for {leaseData?.units?.address || "your property"}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                {/* Bill Details */}
                <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                    <h4 className="font-medium text-gray-900">Bill Details</h4>
                    <div className="space-y-2">
                        <BillPeriod due_date = {getMonthYear(bill.due_date)} />
                        <AmountDue rent_amount = {formatCurrency(bill.rent_amount)} />
                        <DueDate payment_status= {bill.payment_status} due_date = {bill.due_date} />
                        {bill.billing_date && <BillingDate billing_date = {bill.billing_date} /> }
                        <Status payment_status= {bill.payment_status} />
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gcash">GCash</SelectItem>
                            <SelectItem value="bank-transfers">Bank Transfer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Full amount: {formatCurrency(bill.rent_amount)}</p>
                </div>

                {/* Submit Button */}
                <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!paymentMethod || !amount}
                    onClick={() => {
                        if (paymentMethod === "gcash") {
                            router.visit(`/tenant/payments/gcash?amount=${amount}&leaseid=${leaseID}&billid=${bill.id}`)
                        } else {
                            router.visit(`/tenant/payments/bankTransfer?amount=${amount}&leaseid=${leaseID}&billid=${bill.id}`)
                        }
                        onClose()
                    }}
                >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                </Button>
            </div>
        </>
    )
}

export default CurrentBill
