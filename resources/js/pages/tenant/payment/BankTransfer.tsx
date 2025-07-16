import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Building2, CheckCircle, Copy } from "lucide-react";
import { toast, Toaster } from "sonner";
import InputLabel from "@/components/tenants/tenantsDashboard/contact-landlord-inputs";
import { BankTransferInfo } from "@/components/tenants/payments/paymentInfo";
import { useForm, usePage, router } from '@inertiajs/react';

interface paymentAmountType {
    amount: number;
    leaseid: number;
}

type PageProps = {
    paymentData: paymentAmountType;
}

type PaymentFormData = {
    lease_id: number;
    reference_number: string;
    amount_paid: number | string;
    payment_status: 'paid' | 'overdue' | 'partial' | 'pending';
    paid_date: string;
    proof_of_payment: File | null;
    notes?: string;
};

const BankTransferPayment = () => {
    const { props } = usePage<PageProps>();
    const { paymentData } = props;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, setData, post, errors, processing } = useForm<PaymentFormData>({
        lease_id: paymentData.leaseid,
        reference_number: '',
        payment_status: 'pending',
        paid_date: '',
        amount_paid: paymentData.amount,
        proof_of_payment: null,
        notes: '',
    });

    console.log(paymentData.leaseid);

    const bankDetails = {
        bankName: "BPI (Bank of the Philippine Islands)",
        accountNumber: "1234-5678-90",
        accountName: "Val Residences Co.",
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('proof_of_payment', file);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.proof_of_payment || !data.reference_number) {
            return;
        }

        const updatedData = {
            ...data,
            paid_date: new Date().toISOString()
        };

        router.post('/tenant/payments/bank-transfer', updatedData, {
            onSuccess: () => {
                setIsSubmitted(true);
            },
            onError: (errors) => {
                console.error('Payment submission error:', errors);
            },
        });
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast(`${label} copied to clipboard`)
    }

    if (isSubmitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <CheckCircle className="mb-4 size-16 text-green-500" />
                        <h2 className="mb-2 text-center text-2xl font-bold">Payment Proof Submitted</h2>
                        <p className="text-center text-gray-600">Your payment proof has been submitted successfully.</p>
                        <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                            Submit Another Payment
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Bank Transfer Payment</h1>
                        <p className="text-gray-600">Complete your rental payment via bank transfer</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="size-5" />
                                    Bank Transfer Details
                                </CardTitle>
                                <CardDescription>Use the following bank details for your transfer</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div>
                                            <span className="text-sm font-medium">Amount</span>
                                            <p className="text-lg font-bold">₱{paymentData?.amount?.toLocaleString() || 0}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <BankTransferInfo
                                            label="Bank Name"
                                            value={bankDetails.bankName}
                                            button={
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(bankDetails.bankName, "Bank name")}
                                                >
                                                    <Copy className="size-4"/>
                                                </Button>
                                            }
                                        />

                                        <BankTransferInfo
                                            label="Account Number"
                                            value={bankDetails.accountNumber}
                                            button={
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                                                >
                                                    <Copy className="size-4" />
                                                </Button>
                                            }
                                        />

                                        <BankTransferInfo
                                            label="Account Name"
                                            value={bankDetails.accountName}
                                            button={
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                                                >
                                                    <Copy className="size-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="size-5" />
                                    Submit Proof of Payment
                                </CardTitle>
                                <CardDescription>Upload your bank transfer receipt or screenshot</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <InputLabel
                                            label="reference"
                                            labelText="Bank Reference Number"
                                            input={
                                                <Input
                                                    id="reference"
                                                    value={data.reference_number}
                                                    onChange={(e) => setData('reference_number', e.target.value)}
                                                    placeholder="Enter bank reference number"
                                                    required
                                                />
                                            }
                                        />
                                        {errors.reference_number && <p className="mt-1 text-sm text-red-600">{errors.reference_number}</p>}
                                    </div>

                                    <div>
                                        <Label className="mb-3 flex items-center gap-2 text-base font-medium">
                                            <Upload className="size-5" />
                                            Proof of Payment
                                        </Label>
                                        <p className="mb-4 text-sm">Upload your bank transfer receipt or screenshot</p>

                                        <div
                                            className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400"
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const files = e.dataTransfer.files;
                                                if (files.length > 0) {
                                                    setData('proof_of_payment', files[0]);
                                                }
                                            }}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragEnter={(e) => e.preventDefault()}
                                        >
                                            <Input
                                                type="file"
                                                id="proof-upload"
                                                accept="image/*,.pdf"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                required
                                            />

                                            {!data.proof_of_payment ? (
                                                <label htmlFor="proof-upload" className="cursor-pointer">
                                                    <div className="flex flex-col items-center space-y-4">
                                                        <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
                                                            <Upload className="size-8 text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-medium text-gray-900">Upload Payment Receipt</p>
                                                            <p className="text-gray-500">Click to browse or drag and drop files here</p>
                                                            <p className="mt-2 text-sm text-gray-400">PNG, JPG, GIF, PDF up to 5MB each</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="relative inline-block">
                                                        {data.proof_of_payment.type.startsWith("image/") ? (
                                                            <img
                                                                src={URL.createObjectURL(data.proof_of_payment) || "/placeholder.svg"}
                                                                alt="Payment proof preview"
                                                                className="max-h-48 max-w-xs rounded-lg shadow-md"
                                                            />
                                                        ) : (
                                                            <div className="flex h-32 w-48 items-center justify-center rounded-lg bg-gray-100">
                                                                <div className="text-center">
                                                                    <Building2 className="mx-auto mb-2 size-8 text-gray-400" />
                                                                    <p className="text-sm text-gray-600">PDF Document</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Button
                                                            type="button"
                                                            onClick={() => setData('proof_of_payment', null)}
                                                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 p-0 text-sm text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{data.proof_of_payment.name}</p>
                                                    <Label
                                                        htmlFor="proof-upload"
                                                        className="cursor-pointer text-sm text-purple-600 hover:text-purple-700"
                                                    >
                                                        Change file
                                                    </Label>
                                                </div>
                                            )}
                                        </div>
                                        {errors.proof_of_payment && <p className="mt-1 text-sm text-red-600">{errors.proof_of_payment}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes || ''}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={3}
                                            placeholder="Add any additional information about your payment"
                                        />
                                        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600"
                                        disabled={!data.proof_of_payment || !data.reference_number || processing}
                                    >
                                        {processing ? 'Submitting...' : 'Submit Payment Proof'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default BankTransferPayment;
