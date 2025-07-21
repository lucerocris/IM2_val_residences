import InputLabel from '@/components/tenants/tenantsDashboard/contact-landlord-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage, router } from '@inertiajs/react';
import { CheckCircle, QrCode, Upload } from 'lucide-react';
import { useState } from 'react';


interface paymentAmountType {
    amount: number;
    leaseid: number;
    billid: number;
}

type PageProps = {
    paymentData: paymentAmountType;
};

type PaymentFormData = {
    reference_number: string;
    amount_paid: number | string;
    paid_date: string;
    proof_of_payment: File | null;
};

const GcashPayment = () => {
    // Get the props passed from the controller using usePage
    const { props } = usePage<PageProps>();
    const { paymentData } = props;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, setData, post, errors, processing } = useForm<PaymentFormData>({
        reference_number: '',
        paid_date: '',
        amount_paid: paymentData.amount,
        proof_of_payment_path: null,
    });

    console.log(paymentData.billid);
    console.log(data);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('proof_of_payment', file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.proof_of_payment || !data.reference_number) {
            return;
        }

        const formData = new FormData();
        formData.append('reference_number', data.reference_number);
        formData.append('amount_paid', data.amount_paid.toString());
        formData.append('proof_of_payment', data.proof_of_payment); // File object
        formData.append('paid_date', new Date().toISOString().split('T')[0]); // Format: YYYY-MM-DD
        formData.append('_method', 'PATCH'); // Method spoofing for Laravel

        router.post(`/tenant/payments/gcash/${paymentData.billid}`, formData, {
            preserveScroll: true,
            forceFormData: true, // Ensure Inertia uses FormData
            onSuccess: () => {
                setIsSubmitted(true);
            },
            onError: (errors) => {
                console.error('Payment submission error:', errors);
            },
        });
    };

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
                        <h1 className="text-3xl font-bold text-gray-900">GCash Payment</h1>
                        <p className="text-gray-600">Complete your rental payment using GCash</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <QrCode className="size-5" />
                                    Payment Instructions
                                </CardTitle>
                                <CardDescription>Scan the QR code or use the details below</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <div className="flex size-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
                                        <div className="text-center">
                                            {/* <QrCode className="mx-auto mb-2 size-12 text-gray-400" /> */}
                                            <img src = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" />
                                            {/* <p className="text-sm text-gray-500">GCash QR Code</p> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="mt-4 flex justify-between">
                                        <span className="text-lg">Amount:</span>
                                        <span>₱{paymentData?.amount || 0}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>GCash Number:</span>
                                        <span>0917-123-4567</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Account Name:</span>
                                        <span>Val Residences Co.</span>
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
                                <CardDescription>Submit your GCash transaction screenshot</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <InputLabel
                                            label="ref"
                                            labelText="GCash Reference Number"
                                            input={
                                                <Input
                                                    id="ref"
                                                    value={data.reference_number}
                                                    onChange={(e) => setData('reference_number', e.target.value)}
                                                    placeholder="Enter reference number"
                                                    required
                                                />
                                            }
                                        />
                                        {errors.reference_number && <p className="mt-1 text-sm text-red-600">{errors.reference_number}</p>}
                                    </div>

                                    <div>
                                        <Label className="my-3 flex items-center gap-2 text-base font-medium">
                                            <Upload className="size-5" />
                                            Proof of Payment
                                        </Label>
                                        <p className="text-sm mb-4">Upload your GCash transaction screenshot</p>

                                        <div
                                            className=" mb-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400"
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
                                                accept="image/*"
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
                                                            <p>Upload Payment</p>
                                                            <p>Click to browse or drag and drop</p>
                                                            <p>PNG, JPG</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={URL.createObjectURL(data.proof_of_payment) || 'placeholder.svg'}
                                                            alt="payment proof preview"
                                                            className="max-h-48 max-w-xs rounded-lg shadow-md"
                                                        />

                                                        <Button
                                                            type="button"
                                                            onClick={() => setData('proof_of_payment', null)}
                                                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                    <p>{data.proof_of_payment.name}</p>
                                                    <Label htmlFor="proof-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                                                        Change image
                                                    </Label>
                                                </div>
                                            )}
                                        </div>
                                        {errors.proof_of_payment && <p className="mt-1 text-sm text-red-600">{errors.proof_of_payment}</p>}
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
        </>
    );
};

export default GcashPayment;
