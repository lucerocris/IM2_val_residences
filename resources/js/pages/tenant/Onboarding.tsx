
import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import TenantLayout from '@/layout/TenantLayout';
import Header from '@/components/main/ui/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, CreditCard, FileText, Upload, AlertCircle, Download, CheckCircle2 } from 'lucide-react';

interface OnboardingStep {
    completed: boolean;
    completed_at: string | null;
    title: string;
    description: string;
}

interface OnboardingProps {
    lease: {
        id: number;
        completion_percentage: number;
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

interface FlashMessages {
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
    lease_activated?: boolean;
}

const TenantOnboarding: React.FC<OnboardingProps> = ({ lease }) => {
    const { flash } = usePage<{ flash: FlashMessages }>().props;

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
    });

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
    });

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
    });

    const steps = [
        {
            id: 'fees',
            title: 'Pay Required Fees',
            description: `Pay ₱${lease.required_fees_amount} and upload proof of payment`,
            icon: CreditCard,
            completed: lease.onboarding_steps.fees?.completed || false,
        },
        {
            id: 'signed_lease',
            title: 'Upload Signed Lease',
            description: 'Upload the e-signed lease document (PDF)',
            icon: FileText,
            completed: lease.onboarding_steps.signed_lease?.completed || false,
        },
        {
            id: 'id_upload',
            title: 'Upload Government ID',
            description: 'Upload your valid government-issued ID',
            icon: Upload,
            completed: lease.onboarding_steps.id_upload?.completed || false,
        },
    ];

    const completedSteps = steps.filter(step => step.completed).length;
    const allStepsCompleted = completedSteps === steps.length;

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/tenant/onboarding/payment', paymentData, {
            onSuccess: () => {
                resetPayment('proof_of_payment');
                // Clear the file input
                const fileInput = document.getElementById('proof_of_payment') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            },
        });
    };

    const handleLeaseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/tenant/onboarding/signed-lease', leaseData, {
            onSuccess: () => {
                resetLease('signed_lease');
                // Clear the file input
                const fileInput = document.getElementById('signed_lease') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            },
        });
    };

    const handleIdSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/tenant/onboarding/id-upload', idData,  {
            onSuccess: () => {
                resetId('id_document');
                // Clear the file input
                const fileInput = document.getElementById('id_document') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            },
        });
    };

    const handleDownloadLease = () => {
        window.open(`/tenant/lease/${lease.id}/download`, '_blank');
    };

    return (
        <>
            <Head title="Complete Your Lease Activation" />
            <Header
                links={[
                    { label: "TENANT DASHBOARD", href: "/tenant/dashboard" },
                    { label: "VIEW LISTINGS", href: "/tenant/listings" },
                ]}
                links2={[
                    { label: "LOG OUT", href: "/logout", method: 'post' }
                ]}
            />

            <TenantLayout>
                <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-4xl mx-auto">
                    {/* Flash Messages */}
                    {flash.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                {flash.success}
                            </AlertDescription>
                        </Alert>
                    )}

                    {flash.error && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                {flash.error}
                            </AlertDescription>
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

                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Complete Your Lease Activation
                        </h1>
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
                            <Card key={step.id} className={`${step.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-3">
                                        {step.completed ? (
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <step.icon className="h-6 w-6 text-gray-400" />
                                        )}
                                        <span className={step.completed ? 'text-green-800' : 'text-gray-900'}>
                      {step.title}
                    </span>
                                    </CardTitle>
                                    <p className="text-sm text-gray-600 ml-9">
                                        {step.description}
                                    </p>
                                </CardHeader>

                                {!step.completed && (
                                    <CardContent className="ml-9">
                                        {step.id === 'fees' && (
                                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-2">
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
                                                        <div className="flex justify-between font-semibold border-t pt-1">
                                                            <span>Total Required:</span>
                                                            <span>₱{lease.required_fees_amount.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-yellow-50 p-4 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                                        <h4 className="font-semibold text-yellow-800">Payment Instructions</h4>
                                                    </div>
                                                    <div className="text-sm text-yellow-700 space-y-1">
                                                        <p>1. Make the payment using your preferred method (bank transfer, GCash, etc.)</p>
                                                        <p>2. Take a screenshot or photo of the payment receipt</p>
                                                        <p>3. Upload the proof of payment below</p>
                                                        <p>4. Enter the exact amount you paid</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="payment_amount">Payment Amount</Label>
                                                        <Input
                                                            id="payment_amount"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={paymentData.payment_amount}
                                                            onChange={(e) => setPaymentData('payment_amount', parseFloat(e.target.value) || 0)}
                                                            className="mt-1"
                                                        />
                                                        {paymentErrors.payment_amount && (
                                                            <p className="text-sm text-red-600 mt-1">{paymentErrors.payment_amount}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="proof_of_payment">Proof of Payment</Label>
                                                        <Input
                                                            id="proof_of_payment"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) => setPaymentData('proof_of_payment', e.target.files?.[0] || null)}
                                                            className="mt-1"
                                                        />
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Upload receipt screenshot (JPG, PNG, PDF - Max 5MB)
                                                        </p>
                                                        {paymentErrors.proof_of_payment && (
                                                            <p className="text-sm text-red-600 mt-1">{paymentErrors.proof_of_payment}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processingPayment || !paymentData.proof_of_payment}
                                                    className="w-full"
                                                >
                                                    {processingPayment ? 'Processing...' : 'Submit Payment & Proof'}
                                                </Button>
                                            </form>
                                        )}

                                        {step.id === 'signed_lease' && (
                                            <div className="space-y-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Download className="h-5 w-5 text-blue-600" />
                                                        <h4 className="font-semibold text-blue-800">Download & Sign Your Lease</h4>
                                                    </div>
                                                    <p className="text-sm text-blue-700 mb-3">
                                                        Download the lease contract, sign it electronically (using your preferred PDF signing tool), and upload it back.
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleDownloadLease}
                                                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
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
                                                            onChange={(e) => setLeaseData('signed_lease', e.target.files?.[0] || null)}
                                                            className="mt-1"
                                                        />
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Upload the e-signed lease document in PDF format (Max 10MB)
                                                        </p>
                                                        {leaseErrors.signed_lease && (
                                                            <p className="text-sm text-red-600 mt-1">{leaseErrors.signed_lease}</p>
                                                        )}
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        disabled={processingLease || !leaseData.signed_lease}
                                                        className="w-full"
                                                    >
                                                        {processingLease ? 'Uploading...' : 'Upload Signed Lease'}
                                                    </Button>
                                                </form>
                                            </div>
                                        )}

                                        {step.id === 'id_upload' && (
                                            <form onSubmit={handleIdSubmit} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="id_document">Government-Issued ID</Label>
                                                    <Input
                                                        id="id_document"
                                                        type="file"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => setIdData('id_document', e.target.files?.[0] || null)}
                                                        className="mt-1"
                                                    />
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Upload a clear photo or scan of your valid government ID (PDF, PNG, JPG, JPEG - Max 5MB)
                                                    </p>
                                                    {idErrors.id_document && (
                                                        <p className="text-sm text-red-600 mt-1">{idErrors.id_document}</p>
                                                    )}
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processingId || !idData.id_document}
                                                    className="w-full"
                                                >
                                                    {processingId ? 'Uploading...' : 'Upload ID Document'}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>

                    {allStepsCompleted && (
                        <Card className="border-green-200 bg-green-50 mt-6">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                                        Congratulations! Your lease is now active.
                                    </h3>
                                    <p className="text-green-700 mb-4">
                                        You have successfully completed all requirements. You can now access all tenant features.
                                    </p>
                                    <Button asChild className="bg-green-600 hover:bg-green-700">
                                        <Link href="/tenant/dashboard">
                                            Go to Dashboard
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </TenantLayout>
        </>
    );
};

export default TenantOnboarding;
