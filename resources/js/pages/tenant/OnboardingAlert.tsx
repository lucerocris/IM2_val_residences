"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Link } from "@inertiajs/react"
import {
    AlertCircle,
    CheckCircle,
    Clock,
    CreditCard,
    FileText,
    Upload,
    X,
    XCircle,
    AlertTriangle,
    MessageSquare,
} from "lucide-react"
import type React from "react"
import { useState } from "react"

interface OnboardingStep {
    completed: boolean
    completed_at: string | null
    title: string
    description: string
}

interface OnboardingAlertProps {
    lease: {
        id: number
        completion_percentage: number
        pending_requirements: string[]
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

const OnboardingAlert: React.FC<OnboardingAlertProps> = ({ lease }) => {
    const [isDismissed, setIsDismissed] = useState(false)
    const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(true)

    // Status handling functions
    const getStatusMessage = (status: string, landlordReviewStatus: string) => {
        switch (status) {
            case "awaiting_documents":
                return "Complete these steps to submit for review:"
            case "awaiting_landlord_review":
                return "Documents submitted! Waiting for landlord review..."
            case "documents_rejected":
                return "Documents were rejected. Please review feedback and re-upload:"
            case "active":
                return "Lease is now active!"
            default:
                return "Complete these steps to activate your lease:"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "awaiting_landlord_review":
                return <Clock className="h-4 w-4 text-yellow-600" />
            case "documents_rejected":
                return <XCircle className="h-4 w-4 text-red-600" />
            case "active":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            default:
                return <AlertCircle className="mt-0.5 h-4 w-4 text-gray-600" />
        }
    }

    const stepIcons = {
        fees: CreditCard,
        signed_lease: FileText,
        id_upload: Upload,
    }

    const handleDismiss = () => {
        setIsDismissed(true)
    }

    const renderFeedbackSection = () => {
        if (lease.landlord_review_status !== "rejected" || !lease.landlord_review_notes) {
            return null
        }

        return (
            <div className="mb-4 overflow-hidden rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 shadow-sm">
                <div
                    className="flex cursor-pointer items-center justify-between bg-red-100/80 px-4 py-3 transition-colors hover:bg-red-100"
                    onClick={() => setIsFeedbackExpanded(!isFeedbackExpanded)}
                >
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-200">
                            <AlertTriangle className="h-4 w-4 text-red-700" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-red-900">Landlord Feedback</h5>
                            <p className="text-xs text-red-700">Click to {isFeedbackExpanded ? "collapse" : "expand"}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-red-600" />
                        <div className={`transform transition-transform duration-200 ${isFeedbackExpanded ? "rotate-180" : ""}`}>
                            <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {isFeedbackExpanded && (
                    <div className="px-4 py-3">
                        <div className="rounded-md bg-white/60 p-3 shadow-sm">
                            <div className="prose prose-sm max-w-none">
                                <div className="whitespace-pre-wrap text-sm leading-relaxed text-red-800">
                                    {lease.landlord_review_notes}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-start space-x-2 rounded-md bg-red-100/50 p-3">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                            <div className="text-xs text-red-700">
                                <p className="font-medium">Next Steps:</p>
                                <p className="mt-1">
                                    Review the feedback above, make necessary corrections to your documents, and re-upload them to
                                    continue with your application.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    if (isDismissed) {
        return null
    }

    return (
        <Alert className="border-green-400 bg-green-100 p-6 shadow-sm" data-onboarding-alert>
            <div className="flex items-start justify-between">
                {getStatusIcon(lease.status || "")}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 h-6 w-6 p-0 text-gray-400 hover:bg-white/50 hover:text-gray-600"
                >
                    <X className="h-2 w-2" />
                </Button>
            </div>
            <AlertDescription className="space-y-4">
                <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                        {lease.status === "active" ? "Lease Active! 🎉" : "Application Approved! 🎉"}
                    </h4>
                    <p className="mb-3 text-sm text-gray-600">
                        {getStatusMessage(lease.status || "", lease.landlord_review_status || "")}
                    </p>

                    {renderFeedbackSection()}

                    <div className="mb-4">
                        <Progress
                            value={lease.completion_percentage}
                            className="mb-2 h-2"
                            style={
                                {
                                    "--progress-background": "#323232",
                                } as React.CSSProperties
                            }
                        />
                        <p className="text-xs text-gray-500">{lease.completion_percentage}% complete</p>
                    </div>
                    <div className="space-y-2">
                        {Object.entries(lease.onboarding_steps).map(([key, step]) => {
                            const IconComponent = stepIcons[key as keyof typeof stepIcons]
                            return (
                                <div key={key} className="flex items-center space-x-3 py-2">
                                    <div className="flex-shrink-0">
                                        {step.completed ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <IconComponent className="h-4 w-4 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`text-sm font-medium ${step.completed ? "text-green-700 line-through" : "text-gray-900"}`}
                                        >
                                            {step.title}
                                        </p>
                                        {!step.completed && <p className="mt-0.5 text-xs text-gray-500">{step.description}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex gap-2 pt-2">
                    {lease.status !== "awaiting_landlord_review" && (
                        <Button asChild size="sm" className="flex-1 bg-green-800 text-white hover:bg-green-700">
                            <Link href="/tenant/onboarding">Continue Setup</Link>
                        </Button>
                    )}
                </div>
            </AlertDescription>
        </Alert>
    )
}

export default OnboardingAlert
