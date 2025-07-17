"use client"

import type React from "react"

import { router, useForm } from "@inertiajs/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Wrench, ArrowRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Lease, RentalBill } from "@/types/tenantDashboard.types"

interface ButtonSectionProps {
    leaseData: Lease
    currentBill: RentalBill[]
    unitID?: number
    leaseID?: number
    tenantID?: number
    setMaintenanceModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonSection = ({ leaseData, currentBill, tenantID, unitID, leaseID }: ButtonSectionProps) => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false)

    return (
        <div className="space-y-4">
            {/* Make Payment Card */}
            <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500 hover:border-l-green-600 group">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                                        <CreditCard className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
                                        <p className="text-gray-600">Pay your monthly rent securely</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            </div>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <PaymentModal leaseData={leaseData} currentBill={currentBill} leaseID={leaseID} />
                </DialogContent>
            </Dialog>

            {/* Request Maintenance Card */}
            <Dialog open={maintenanceModalOpen} onOpenChange={setMaintenanceModalOpen}>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-orange-500 hover:border-l-orange-600 group">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-orange-100 p-3 group-hover:bg-orange-200 transition-colors">
                                        <Wrench className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Request Maintenance</h3>
                                        <p className="text-gray-600">Submit a maintenance request</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                            </div>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <MaintenanceModal
                        leaseData={leaseData}
                        currentBill={currentBill}
                        tenantID={tenantID}
                        setMaintenanceModalOpen={setMaintenanceModalOpen}
                        unitID={unitID}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

const PaymentModal = ({ leaseData, currentBill, leaseID }: ButtonSectionProps) => {
    const [paymentMethod, setPaymentMethod] = useState("")
    const [amount, setAmount] = useState("")

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

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Make Payment
                </DialogTitle>
                <DialogDescription>Pay your monthly rent for {leaseData.units?.address}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                {/* Bill Summary */}
                <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                    <h4 className="font-medium text-gray-900">Payment Summary</h4>
                    {currentBill && currentBill.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Amount Due:</span>
                                <span className="font-semibold text-red-600">{formatCurrency(currentBill[0].rent_amount)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Due Date:</span>
                                <span className="text-sm text-gray-900">{formatDate(currentBill[0].due_date)}</span>
                            </div>
                            {currentBill[0].billing_date && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Billing Date:</span>
                                    <span className="text-sm text-gray-900">{formatDate(currentBill[0].billing_date)}</span>
                                </div>
                            )}
                        </div>
                    )}
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
                </div>

                {/* Submit Button */}
                <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!paymentMethod || !amount}
                    onClick={() => {
                        if (paymentMethod === "gcash") {
                            router.visit(`/tenant/payments/gcash?amount=${amount}&leaseid=${leaseID}`)
                        } else {
                            router.visit(`/tenant/payments/bankTransfer?amount=${amount}&leaseid=${leaseID}`)
                        }
                    }}
                >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                </Button>
            </div>
        </>
    )
}

type MaintenanceFormData = {
    tenant_id: number
    unit_id: number
    maintenance_description: string
    priority_level: string
    tenant_remarks: string
    request_date: string
}

const MaintenanceModal = ({ leaseData, tenantID, setMaintenanceModalOpen, unitID }: ButtonSectionProps) => {
    const { data, setData, processing } = useForm<MaintenanceFormData>({
        tenant_id: tenantID ?? 0,
        unit_id: unitID ?? 0,
        maintenance_description: "",
        priority_level: "",
        tenant_remarks: "",
        request_date: "",
    })

    const handleMaintenanceSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const updatedData = {
            ...data,
            request_date: new Date().toISOString(),
        }
        router.post("/tenant/maintenanceRequest", updatedData, {
            preserveScroll: true,
            onSuccess: () => {
                setMaintenanceModalOpen?.(false)
            },
        })
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-orange-600" />
                    Submit Maintenance Request
                </DialogTitle>
                <DialogDescription>Describe the maintenance issue for {leaseData.units?.address}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                {/* Priority Level */}
                <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={data.priority_level} onValueChange={(value) => setData("priority_level", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low - Can wait a few days</SelectItem>
                            <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                            <SelectItem value="high">High - Needs attention within 24 hours</SelectItem>
                            <SelectItem value="urgent">Urgent - Emergency repair needed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Please describe the maintenance issue in detail..."
                        className="min-h-[100px]"
                        value={data.maintenance_description}
                        onChange={(e) => setData("maintenance_description", e.target.value)}
                    />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                    <Label htmlFor="remarks">Additional Notes (Optional)</Label>
                    <Textarea
                        id="remarks"
                        placeholder="Any additional information or special instructions..."
                        rows={3}
                        value={data.tenant_remarks}
                        onChange={(e) => setData("tenant_remarks", e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={processing || !data.maintenance_description || !data.priority_level}
                    onClick={handleMaintenanceSubmit}
                >
                    <Wrench className="w-4 h-4 mr-2" />
                    Submit Request
                </Button>
            </div>
        </>
    )
}

export default ButtonSection
