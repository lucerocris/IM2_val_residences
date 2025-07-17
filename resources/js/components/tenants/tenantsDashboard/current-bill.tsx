"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, AlertCircle, CreditCard } from "lucide-react"
import type { RentalBill } from "@/types/tenantDashboard.types"
import { router } from "@inertiajs/react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Current Bills
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-green-100 p-3 mb-4">
                            <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-500">You have no outstanding bills at this time.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Calculate totals
    const unpaidBills = currentBill.filter((bill) => bill.payment_status !== "paid")
    const totalUnpaid = unpaidBills.reduce((sum, bill) => sum + Number.parseFloat(bill.rent_amount), 0)
    const overdueBills = unpaidBills.filter((bill) => bill.payment_status === "overdue")
    const pendingBills = unpaidBills.filter((bill) => bill.payment_status === "pending")

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "paid":
                return (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                    </Badge>
                )
            case "overdue":
                return <Badge variant="destructive">Overdue</Badge>
            case "partial":
                return (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Partial
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const formatCurrency = (amount: number | string) => {
        return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getMonthYear = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        })
    }

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
                    {unpaidBills.length > 0 && (
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
                    )}

                    {/* Individual Bills */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Bill History</h4>
                        <div className="space-y-3">
                            {currentBill.map((bill) => (
                                <div
                                    key={bill.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <Calendar className="w-4 h-4 text-gray-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-900">{getMonthYear(bill.due_date)}</h5>
                                            <p className="text-sm text-gray-500">Due: {formatDate(bill.due_date)}</p>
                                            {bill.billing_date && (
                                                <p className="text-xs text-gray-400">Billed: {formatDate(bill.billing_date)}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">{formatCurrency(bill.rent_amount)}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(bill.payment_status)}
                                            {bill.payment_status !== "paid" && (
                                                <Button size="sm" variant="outline" onClick={() => handlePayNowClick(bill)}>
                                                    Pay Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
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

    const formatCurrency = (amount: number | string) => {
        return `₱${Number.parseFloat(amount.toString()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getMonthYear = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "overdue":
                return "text-red-600"
            case "pending":
                return "text-yellow-600"
            default:
                return "text-gray-600"
        }
    }

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
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Bill Period:</span>
                            <span className="font-medium text-gray-900">{getMonthYear(bill.due_date)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Amount Due:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(bill.rent_amount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Due Date:</span>
                            <span className={`text-sm font-medium ${getStatusColor(bill.payment_status)}`}>
                {formatDate(bill.due_date)}
              </span>
                        </div>
                        {bill.billing_date && (
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Billing Date:</span>
                                <span className="text-sm text-gray-900">{formatDate(bill.billing_date)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Status:</span>
                            <Badge
                                variant={bill.payment_status === "overdue" ? "destructive" : "secondary"}
                                className={
                                    bill.payment_status === "pending"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : bill.payment_status === "partial"
                                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            : ""
                                }
                            >
                                {bill.payment_status.charAt(0).toUpperCase() + bill.payment_status.slice(1)}
                            </Badge>
                        </div>
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
