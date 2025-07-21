"use client"

import Header from "@/components/main/ui/Header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TenantLayout from "@/layout/TenantLayout"
import { Head, Link, router, useForm, usePage } from "@inertiajs/react"
import {
    AlertCircle,
    CheckCircle,
    CheckCircle2,
    Copy,
    CreditCard,
    Download,
    FileText,
    Smartphone,
    Upload,
    University,
    Clock,
} from "lucide-react"
import type React from "react"
import { useState } from "react"

interface OnboardingStep {
    completed: boolean
    completed_at: string | null
    title: string
    description: string
}

interface OnboardingProps {
    lease: {
        id: number
        completion_percentage: number
        status?: string
        landlord_review_status?: string
        landlord_review_notes?: string
        onboarding_steps: {
            fees: OnboardingStep
            signed_lease: OnboardingStep
            id_upload: OnboardingStep
        }
        required_fees_amount: number
        monthly_rent: number
        deposit_amount: number
    }
}

interface FlashMessages {
    success?: string
    error?: string
    info?: string
    warning?: string
    lease_activated?: boolean
}

const TenantOnboarding: React.FC<OnboardingProps> = ({ lease }) => {
    const { flash } = usePage<{ flash: FlashMessages }>().props
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const {
        data: paymentData,
        setData: setPaymentData,
        post: postPayment,
        processing: processingPayment,
        errors: paymentErrors,
        reset: resetPayment,
    } = useForm({
        payment_amount: lease.required_fees_amount,
        proof_of_payment: null as File | null,
        lease_id: lease.id,
    })

    const {
        data: leaseData,
        setData: setLeaseData,
        post: postLease,
        processing: processingLease,
        errors: leaseErrors,
        reset: resetLease,
    } = useForm({
        signed_lease: null as File | null,
        lease_id: lease.id,
    })

    const {
        data: idData,
        setData: setIdData,
        post: postId,
        processing: processingId,
        errors: idErrors,
        reset: resetId,
    } = useForm({
        id_document: null as File | null,
        lease_id: lease.id,
    })

    const steps = [
        {
            id: "fees",
            title: "Pay Required Fees",
            description: `Pay ₱${lease.required_fees_amount} and upload proof of payment`,
            icon: CreditCard,
            completed: lease.onboarding_steps.fees?.completed || false,
        },
        {
            id: "signed_lease",
            title: "Upload Signed Lease",
            description: "Upload the e-signed lease document (PDF)",
            icon: FileText,
            completed: lease.onboarding_steps.signed_lease?.completed || false,
        },
        {
            id: "id_upload",
            title: "Upload Government ID",
            description: "Upload your valid government-issued ID",
            icon: Upload,
            completed: lease.onboarding_steps.id_upload?.completed || false,
        },
    ]

    const completedSteps = steps.filter((step) => step.completed).length
    const allStepsCompleted = completedSteps === steps.length

    // Payment details
    const gcashDetails = {
        number: "09123456789",
        name: "Val Residences",
    }

    const bankDetails = {
        bankName: "BPI Bank",
        accountName: "Cris Lawrence Lucero",
        accountNumber: "1234-5678-90",
    }

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post("/tenant/onboarding/payment", paymentData, {
            onSuccess: () => {
                resetPayment("proof_of_payment")
                const fileInput = document.getElementById("proof_of_payment") as HTMLInputElement
                if (fileInput) fileInput.value = ""
            },
        })
    }

    const handleLeaseSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post("/tenant/onboarding/signed-lease", leaseData, {
            onSuccess: () => {
                resetLease("signed_lease")
                const fileInput = document.getElementById("signed_lease") as HTMLInputElement
                if (fileInput) fileInput.value = ""
            },
        })
    }

    const handleIdSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post("/tenant/onboarding/id-upload", idData, {
            onSuccess: () => {
                resetId("id_document")
                const fileInput = document.getElementById("id_document") as HTMLInputElement
                if (fileInput) fileInput.value = ""
            },
        })
    }

    const handleDownloadLease = () => {
        const link = document.createElement("a")
        link.href = "/storage/Contract-of-Lease.pdf"
        link.download = "Contract-of-Lease.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <Head title="Complete Your Lease Activation" />
            <Header
                links={[
                    { label: "TENANT DASHBOARD", href: "/tenant/dashboard" },
                    { label: "VIEW LISTINGS", href: "/tenant/listings" },
                ]}
                links2={[{ label: "LOG OUT", href: "/logout", method: "post" }]}
            />
            <TenantLayout>
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-12">
                    {/* Flash Messages */}
                    {flash.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{flash.success}</AlertDescription>
                        </Alert>
                    )}
                    {flash.error && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">{flash.error}</AlertDescription>
                        </Alert>
                    )}
                    {flash.lease_activated && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                🎉 Congratulations! Your lease has been activated. You can now access all tenant features.
                            </AlertDescription>
                        </Alert>
                    )}
                    {lease.landlord_review_status === "rejected" && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                <strong>Documents Rejected:</strong> {lease.landlord_review_notes}
                                <br />
                                <span className="text-sm">Please review the feedback and re-upload the required documents.</span>
                            </AlertDescription>
                        </Alert>
                    )}
                    {lease.status === "awaiting_landlord_review" && (
                        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">
                                Your documents have been submitted for landlord review. You will be notified once they are reviewed.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Complete Your Lease Activation</h1>
                        <p className="text-gray-600">
                            Complete the following steps to activate your lease and gain full access to your rental unit.
                        </p>
                        <div className="mt-4">
                            <Progress value={lease.completion_percentage} className="mb-2" />
                            <p className="text-sm text-gray-600">
                                {completedSteps} of {steps.length} steps completed ({lease.completion_percentage}%)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <Card key={step.id} className={`${step.completed ? "border-green-200 bg-green-50" : "border-gray-200"}`}>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-3">
                                        {step.completed ? (
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <step.icon className="h-6 w-6 text-gray-400" />
                                        )}
                                        <span className={step.completed ? "text-green-800" : "text-gray-900"}>{step.title}</span>
                                    </CardTitle>
                                    <p className="ml-9 text-sm text-gray-600">{step.description}</p>
                                </CardHeader>
                                {!step.completed && (
                                    <CardContent className="ml-9">
                                        {step.id === "fees" && (
                                            <div className="space-y-6">
                                                {/* Payment Breakdown */}
                                                <div className="rounded-lg bg-blue-50 p-4">
                                                    <div className="mb-2 flex items-center space-x-2">
                                                        <AlertCircle className="h-5 w-5 text-blue-600" />
                                                        <h4 className="font-semibold text-blue-800">Payment Breakdown</h4>
                                                    </div>
                                                    <div className="space-y-1 text-sm text-blue-700">
                                                        <div className="flex justify-between">
                                                            <span>First Month Rent:</span>
                                                            <span>₱{lease.monthly_rent.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Security Deposit:</span>
                                                            <span>₱{lease.deposit_amount.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between border-t pt-1 font-semibold">
                                                            <span>Total Required:</span>
                                                            <span>₱{lease.required_fees_amount.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Methods */}
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <h4 className="mb-4 font-semibold text-gray-800">Choose Payment Method</h4>
                                                    <Tabs defaultValue="gcash" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                            <TabsTrigger value="gcash" className="flex items-center space-x-2">
                                                                <Smartphone className="h-4 w-4" />
                                                                <span>GCash</span>
                                                            </TabsTrigger>
                                                            <TabsTrigger value="bank" className="flex items-center space-x-2">
                                                                <University className="h-4 w-4" />
                                                                <span>Bank Transfer</span>
                                                            </TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="gcash" className="mt-4">
                                                            <div className="grid gap-4 md:grid-cols-2">
                                                                {/* QR Code */}
                                                                <div className="flex flex-col items-center space-y-3 rounded-lg border-2 border-dashed border-gray-300 p-6">
                                                                    <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100">
                                                                        <img
                                                                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                                                            alt="GCash QR Code"
                                                                            className="h-full w-full rounded-lg object-cover"
                                                                        />
                                                                    </div>
                                                                    <p className="text-center text-sm text-gray-600">
                                                                        Scan this QR code with your GCash app
                                                                    </p>
                                                                </div>

                                                                {/* GCash Details */}
                                                                <div className="space-y-3">
                                                                    <div className="rounded-lg  p-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="text-sm font-medium ">GCash Number</p>
                                                                                <p className="text-lg font-semibold ">{gcashDetails.number}</p>
                                                                            </div>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => copyToClipboard(gcashDetails.number, "gcash-number")}
                                                                                className="hover:bg-gray-100"
                                                                            >
                                                                                {copiedField === "gcash-number" ? (
                                                                                    <CheckCircle className="h-4 w-4" />
                                                                                ) : (
                                                                                    <Copy className="h-4 w-4" />
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-3">
                                                                        <p className="text-sm font-medium">Account Name</p>
                                                                        <p className="text-sm">{gcashDetails.name}</p>
                                                                    </div>

                                                                    <div className="rounded-lg p-3">
                                                                        <p className="text-sm font-medium">Amount to Send</p>
                                                                        <p className="text-lg font-semibold">
                                                                            ₱{lease.required_fees_amount.toLocaleString()}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="bank" className="mt-4">
                                                            <div className="space-y-4">
                                                                <div className="grid gap-4 md:grid-cols-2">
                                                                    <div className="rounded-lg p-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="text-sm font-medium ">Bank Name</p>
                                                                                <p className="font-semibold ">{bankDetails.bankName}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="rounded-lg p-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="text-sm font-medium">Account Number</p>
                                                                                <p className="font-semibold">{bankDetails.accountNumber}</p>
                                                                            </div>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => copyToClipboard(bankDetails.accountNumber, "account-number")}
                                                                                className="hover:bg-gray-100"
                                                                            >
                                                                                {copiedField === "account-number" ? (
                                                                                    <CheckCircle className="h-4 w-4" />
                                                                                ) : (
                                                                                    <Copy className="h-4 w-4" />
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid gap-4 md:grid-cols-2">
                                                                    <div className="rounded-lg p-3">
                                                                        <p className="text-sm font-medium">Account Name</p>
                                                                        <p className="text-sm">{bankDetails.accountName}</p>
                                                                    </div>

                                                                </div>

                                                                <div className="rounded-lg p-3">
                                                                    <p className="text-sm font-medium">Amount to Transfer</p>
                                                                    <p className="text-lg font-semibold">
                                                                        ₱{lease.required_fees_amount.toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </div>

                                                <Separator />

                                                {/* Upload Form */}
                                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                                    <div className="rounded-lg bg-yellow-50 p-4">
                                                        <div className="mb-2 flex items-center space-x-2">
                                                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                                                            <h4 className="font-semibold text-yellow-800">Upload Payment Proof</h4>
                                                        </div>
                                                        <div className="space-y-1 text-sm text-yellow-700">
                                                            <p>1. Complete the payment using your chosen method above</p>
                                                            <p>2. Take a clear screenshot or photo of the payment receipt</p>
                                                            <p>3. Upload the proof of payment below</p>
                                                            <p>4. Verify the payment amount matches exactly</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div>
                                                            <Label htmlFor="payment_amount">Payment Amount</Label>
                                                            <Input
                                                                id="payment_amount"
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                value={paymentData.payment_amount}
                                                                onChange={(e) =>
                                                                    setPaymentData("payment_amount", Number.parseFloat(e.target.value) || 0)
                                                                }
                                                                className="mt-1"
                                                            />
                                                            {paymentErrors.payment_amount && (
                                                                <p className="mt-1 text-sm text-red-600">{paymentErrors.payment_amount}</p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="proof_of_payment">Proof of Payment</Label>
                                                            <Input
                                                                id="proof_of_payment"
                                                                type="file"
                                                                accept="image/*,.pdf"
                                                                onChange={(e) => setPaymentData("proof_of_payment", e.target.files?.[0] || null)}
                                                                className="mt-1"
                                                            />
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Upload receipt screenshot (JPG, PNG, PDF - Max 5MB)
                                                            </p>
                                                            {paymentErrors.proof_of_payment && (
                                                                <p className="mt-1 text-sm text-red-600">{paymentErrors.proof_of_payment}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        disabled={processingPayment || !paymentData.proof_of_payment}
                                                        className="w-full"
                                                    >
                                                        {processingPayment ? "Processing..." : "Submit Payment & Proof"}
                                                    </Button>
                                                </form>
                                            </div>
                                        )}

                                        {step.id === "signed_lease" && (
                                            <div className="space-y-4">
                                                <div className="rounded-lg bg-blue-50 p-4">
                                                    <div className="mb-2 flex items-center space-x-2">
                                                        <Download className="h-5 w-5 text-blue-600" />
                                                        <h4 className="font-semibold text-blue-800">Download & Sign Your Lease</h4>
                                                    </div>
                                                    <p className="mb-3 text-sm text-blue-700">
                                                        Download the lease contract, sign it electronically (using your preferred PDF signing tool),
                                                        and upload it back.
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleDownloadLease}
                                                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                                                    >
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download Lease Contract
                                                    </Button>
                                                </div>
                                                <form onSubmit={handleLeaseSubmit} className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="signed_lease">Upload Signed Lease (PDF)</Label>
                                                        <Input
                                                            id="signed_lease"
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => setLeaseData("signed_lease", e.target.files?.[0] || null)}
                                                            className="mt-1"
                                                        />
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Upload the e-signed lease document in PDF format (Max 10MB)
                                                        </p>
                                                        {leaseErrors.signed_lease && (
                                                            <p className="mt-1 text-sm text-red-600">{leaseErrors.signed_lease}</p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        disabled={processingLease || !leaseData.signed_lease}
                                                        className="w-full"
                                                    >
                                                        {processingLease ? "Uploading..." : "Upload Signed Lease"}
                                                    </Button>
                                                </form>
                                            </div>
                                        )}

                                        {step.id === "id_upload" && (
                                            <form onSubmit={handleIdSubmit} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="id_document">Government-Issued ID</Label>
                                                    <Input
                                                        id="id_document"
                                                        type="file"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => setIdData("id_document", e.target.files?.[0] || null)}
                                                        className="mt-1"
                                                    />
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Upload a clear photo or scan of your valid government ID (PDF, PNG, JPG, JPEG - Max 5MB)
                                                    </p>
                                                    {idErrors.id_document && <p className="mt-1 text-sm text-red-600">{idErrors.id_document}</p>}
                                                </div>
                                                <Button type="submit" disabled={processingId || !idData.id_document} className="w-full">
                                                    {processingId ? "Uploading..." : "Upload ID Document"}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>

                    {allStepsCompleted && (
                        <Card className="mt-6 border-yellow-200 bg-yellow-50">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Clock className="mx-auto mb-4 h-16 w-16 text-yellow-600" />
                                    <h3 className="mb-2 text-xl font-semibold text-yellow-800">
                                        Documents Submitted for Review
                                    </h3>
                                    <p className="mb-4 text-yellow-700">
                                        Your documents have been successfully submitted and are currently under review by the landlord. We will notify you once the review is complete.
                                    </p>
                                    <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                                        <Link href="/tenant/dashboard">Go to Dashboard</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </TenantLayout>
        </>
    )
}

export default TenantOnboarding
