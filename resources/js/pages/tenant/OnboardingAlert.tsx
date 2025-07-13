"use client"

import type React from "react"
import { useState } from 'react';
import { Link } from "@inertiajs/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, CreditCard, FileText, Upload, X } from "lucide-react"

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

    const [isDismissed, setIsDismissed] = useState(false);


    const stepIcons = {
        fees: CreditCard,
        signed_lease: FileText,
        id_upload: Upload,
    }

    const handleDismiss = () => {
        setIsDismissed(true)
    }

    if (isDismissed) {
        return null
    }

    return (
        <Alert className="border-green-400 bg-green-100 shadow-sm p-6" data-onboarding-alert>
            <div className="flex items-start justify-between">
                <AlertCircle className="h-4 w-4 text-gray-600 mt-0.5" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-white/50"
                >
                    <X className="h-2 w-2" />
                </Button>
            </div>

            <AlertDescription className="space-y-4">
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Application Approved! 🎉</h4>
                    <p className="text-gray-600 text-sm mb-3">Complete these steps to activate your lease:</p>

                    <div className="mb-4">
                        <Progress
                            value={lease.completion_percentage}
                            className="h-2 mb-2"
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
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-medium ${
                                                step.completed ? "text-green-700 line-through" : "text-gray-900"
                                            }`}
                                        >
                                            {step.title}
                                        </p>
                                        {!step.completed && <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button
                        asChild
                        size="sm"
                        className="flex-1 text-white hover:bg-green-700 bg-green-800"
                        // style={{ backgroundColor: "#323232" }}
                    >
                        <Link href="/tenant/onboarding">Continue Setup</Link>
                    </Button>
                    {/*<Button size="sm" variant="ghost" onClick={handleDismiss} className="text-gray-500 hover:text-gray-700 hover:bg-red-100">*/}
                    {/*    Later*/}
                    {/*</Button>*/}
                </div>
            </AlertDescription>
        </Alert>
    )
}

export default OnboardingAlert
