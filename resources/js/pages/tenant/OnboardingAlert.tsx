'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, CreditCard, FileText, Upload, X, XCircle } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface OnboardingStep {
    completed: boolean;
    completed_at: string | null;
    title: string;
    description: string;
}

interface OnboardingAlertProps {
    lease: {
        id: number;
        completion_percentage: number;
        pending_requirements: string[];
        status?: string;
        landlord_review_status?: string;
        landlord_review_notes?: string;
        onboarding_steps: {
            fees: OnboardingStep;
            signed_lease: OnboardingStep;
            id_upload: OnboardingStep;
        };
        required_fees_amount: number;
        monthly_rent: number;
        deposit_amount: number;
    };
}

const OnboardingAlert: React.FC<OnboardingAlertProps> = ({ lease }) => {
    const [isDismissed, setIsDismissed] = useState(false);

    // Status handling functions
    const getStatusMessage = (status: string, landlordReviewStatus: string) => {
        switch (status) {
            case 'awaiting_documents':
                return 'Complete these steps to submit for review:';
            case 'awaiting_landlord_review':
                return 'Documents submitted! Waiting for landlord review...';
            case 'documents_rejected':
                return 'Documents were rejected. Please review feedback and re-upload:';
            case 'active':
                return 'Lease is now active!';
            default:
                return 'Complete these steps to activate your lease:';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'awaiting_landlord_review':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'documents_rejected':
                return <XCircle className="h-4 w-4 text-red-600" />;
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            default:
                return <AlertCircle className="mt-0.5 h-4 w-4 text-gray-600" />;
        }
    };

    const stepIcons = {
        fees: CreditCard,
        signed_lease: FileText,
        id_upload: Upload,
    };

    const handleDismiss = () => {
        setIsDismissed(true);
    };

    if (isDismissed) {
        return null;
    }

    return (
        <Alert className="border-green-400 bg-green-100 p-6 shadow-sm" data-onboarding-alert>
            <div className="flex items-start justify-between">
                {getStatusIcon(lease.status || '')}
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
                    <h4 className="mb-2 font-medium text-gray-900">{lease.status === 'active' ? 'Lease Active! 🎉' : 'Application Approved! 🎉'}</h4>
                    <p className="mb-3 text-sm text-gray-600">{getStatusMessage(lease.status || '', lease.landlord_review_status || '')}</p>

                    {lease.landlord_review_status === 'rejected' && lease.landlord_review_notes && (
                        <div className="mb-3 rounded-md border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-800">
                                <strong>Feedback:</strong> {lease.landlord_review_notes}
                            </p>
                        </div>
                    )}

                    <div className="mb-4">
                        <Progress
                            value={lease.completion_percentage}
                            className="mb-2 h-2"
                            style={
                                {
                                    '--progress-background': '#323232',
                                } as React.CSSProperties
                            }
                        />
                        <p className="text-xs text-gray-500">{lease.completion_percentage}% complete</p>
                    </div>

                    <div className="space-y-2">
                        {Object.entries(lease.onboarding_steps).map(([key, step]) => {
                            const IconComponent = stepIcons[key as keyof typeof stepIcons];
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
                                        <p className={`text-sm font-medium ${step.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                                            {step.title}
                                        </p>
                                        {!step.completed && <p className="mt-0.5 text-xs text-gray-500">{step.description}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    {lease.status !== 'awaiting_landlord_review' && (
                        <Button asChild size="sm" className="flex-1 bg-green-800 text-white hover:bg-green-700">
                            <Link href="/tenant/onboarding">Continue Setup</Link>
                        </Button>
                    )}
                    {/*<Button size="sm" variant="ghost" onClick={handleDismiss} className="text-gray-500 hover:text-gray-700 hover:bg-red-100">*/}
                    {/*    Later*/}
                    {/*</Button>*/}
                </div>
            </AlertDescription>
        </Alert>
    );
};

export default OnboardingAlert;
