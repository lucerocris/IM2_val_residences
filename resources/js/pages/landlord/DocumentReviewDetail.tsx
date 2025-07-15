"use client"

import type React from "react"

import { Head, router, useForm } from "@inertiajs/react"
import LandlordLayout from "@/layout/LandlordLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
    ArrowLeft,
    Download,
    FileText,
    User,
    MapPin,
    DollarSign,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Calendar,
    Phone,
    Mail,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

interface Tenant {
    id: number
    user_name: string
    email: string
    user_contact_number: string
}

interface Unit {
    id: number
    address: string
    unit_number: string
    landlord_id: number
}

interface DocumentPaths {
    signed_lease: string | null
    id_document: string | null
    payment_proof: string | null
}

interface Lease {
    id: number
    tenant: Tenant
    unit: Unit
    monthly_rent: number
    deposit_amount: number
    required_fees_amount: number
    documents_submitted_at: string
    onboarding_fees_amount: number
    document_paths: DocumentPaths
}

interface Props {
    lease: Lease
}

export default function DocumentReviewDetail({ lease }: Props) {
    const [showRejectForm, setShowRejectForm] = useState(false)
    const [showApproveForm, setShowApproveForm] = useState(false)

    const approveForm = useForm({
        notes: "",
    })

    const rejectForm = useForm({
        reason: "",
    })

    const handleBack = () => {
        router.get(route("landlord.document-review"))
    }

    const handleDownload = (documentType: string) => {
        window.open(
            route("landlord.document-review.download", {
                lease: lease.id,
                documentType,
            }),
        )
    }

    const handleApprove = (e: React.FormEvent) => {
        e.preventDefault()
        approveForm.post(route("landlord.document-review.approve", lease.id), {
            onSuccess: () => {
                setShowApproveForm(false)
                router.get(route("landlord.document-review"))
            },
        })
    }

    const handleReject = (e: React.FormEvent) => {
        e.preventDefault()
        rejectForm.post(route("landlord.document-review.reject", lease.id), {
            onSuccess: () => {
                setShowRejectForm(false)
                router.get(route("landlord.document-review"))
            },
        })
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-MY", {
            style: "currency",
            currency: "MYR",
        }).format(amount)
    }

    const getDocumentLabel = (type: string) => {
        switch (type) {
            case "signed_lease":
                return "Signed Lease Agreement"
            case "id_document":
                return "Valid ID Document"
            case "payment_proof":
                return "Payment Proof"
            default:
                return "Document"
        }
    }

    const documents = Object.entries(lease.document_paths)
        .filter(([_, path]) => path !== null)
        .map(([type, path]) => ({ type, path, label: getDocumentLabel(type) }))

    return (
        <LandlordLayout>
            <Head title={`Review Documents - ${lease.tenant.user_name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={handleBack}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Reviews
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Document Review</h1>
                        <p className="text-gray-600 mt-1">Review and approve tenant document submission</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tenant Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>Tenant Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-blue-100 text-blue-700">
                                            {getInitials(lease.tenant.user_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-lg font-semibold">{lease.tenant.user_name}</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-4 w-4" />
                                                <span>{lease.tenant.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4" />
                                                <span>{lease.tenant.user_contact_number}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{lease.unit.address}</span>
                                                {lease.unit.unit_number && (
                                                    <span className="text-gray-400">• Unit {lease.unit.unit_number}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Submitted Documents</span>
                                    <Badge variant="outline" className="ml-2">
                                        {documents.length} document{documents.length !== 1 ? "s" : ""}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {documents.map((doc, index) => (
                                        <div key={doc.type} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <FileText className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{doc.label}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Submitted {formatDistanceToNow(new Date(lease.documents_submitted_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => handleDownload(doc.type)}>
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Lease Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <DollarSign className="h-5 w-5" />
                                    <span>Lease Summary</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monthly Rent</span>
                                        <span className="font-semibold">{formatCurrency(lease.monthly_rent)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Security Deposit</span>
                                        <span className="font-semibold">{formatCurrency(lease.deposit_amount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Onboarding Fees</span>
                                        <span className="font-semibold">{formatCurrency(lease.onboarding_fees_amount)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg">
                                        <span className="font-semibold">Total Required</span>
                                        <span className="font-bold">{formatCurrency(lease.required_fees_amount)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Review Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Review Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!showApproveForm && !showRejectForm && (
                                    <div className="space-y-3">
                                        <Button onClick={() => setShowApproveForm(true)} className="w-full bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve & Activate Lease
                                        </Button>
                                        <Button variant="destructive" onClick={() => setShowRejectForm(true)} className="w-full">
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject Documents
                                        </Button>
                                    </div>
                                )}

                                {/* Approve Form */}
                                {showApproveForm && (
                                    <form onSubmit={handleApprove} className="space-y-4">
                                        <Alert>
                                            <CheckCircle className="h-4 w-4" />
                                            <AlertDescription>Approving will activate the lease and notify the tenant.</AlertDescription>
                                        </Alert>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Notes (Optional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Add any notes for the tenant..."
                                                value={approveForm.data.notes}
                                                onChange={(e) => approveForm.setData("notes", e.target.value)}
                                                rows={3}
                                            />
                                            {approveForm.errors.notes && <p className="text-sm text-red-600">{approveForm.errors.notes}</p>}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button
                                                type="submit"
                                                disabled={approveForm.processing}
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                {approveForm.processing ? "Approving..." : "Confirm Approval"}
                                            </Button>
                                            <Button type="button" variant="outline" onClick={() => setShowApproveForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {/* Reject Form */}
                                {showRejectForm && (
                                    <form onSubmit={handleReject} className="space-y-4">
                                        <Alert variant="destructive">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>Rejecting will require the tenant to re-upload documents.</AlertDescription>
                                        </Alert>

                                        <div className="space-y-2">
                                            <Label htmlFor="reason">Reason for Rejection *</Label>
                                            <Textarea
                                                id="reason"
                                                placeholder="Please explain why the documents are being rejected..."
                                                value={rejectForm.data.reason}
                                                onChange={(e) => rejectForm.setData("reason", e.target.value)}
                                                rows={4}
                                                required
                                            />
                                            {rejectForm.errors.reason && <p className="text-sm text-red-600">{rejectForm.errors.reason}</p>}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button type="submit" variant="destructive" disabled={rejectForm.processing} className="flex-1">
                                                {rejectForm.processing ? "Rejecting..." : "Confirm Rejection"}
                                            </Button>
                                            <Button type="button" variant="outline" onClick={() => setShowRejectForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Submission Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>Submission Info</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-600">
                                    <p>Submitted {formatDistanceToNow(new Date(lease.documents_submitted_at), { addSuffix: true })}</p>
                                    <p className="mt-1">
                                        {new Date(lease.documents_submitted_at).toLocaleDateString("en-MY", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LandlordLayout>
    )
}
