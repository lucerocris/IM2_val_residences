import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, QrCode, CheckCircle } from "lucide-react";

const GcashPayment = () => {
    const [proofFile, setProofFile] = useState<File | null > (null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")
    const [notes, setNotes] = useState("")

    const amount = 15000.00

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setProofFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({
            paymentMethod: "gcash",
            amount,
            referenceNumber,
            proofFile,
            notes,
        })
        setIsSubmitted(true);
    }

    if(isSubmitted) {
        return (
            <div className = "min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className = "w-full max-w-md">
                    <CardContent className = "flex flex-col items-center justify-center p-8">
                        <CheckCircle className = "size-16 text-green-500 mb-4" />
                        <h2 className = "text-2xl font-bold text-center mb-2">Payment Proof Submitted</h2>
                        <p className = "text-gray-600 text-center">Your payment proof has been submitted successfully.</p>
                        <Button className = "mt-6" onClick = {() => setIsSubmitted(false)}>
                            Submit Another Payment
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return(
        <>
            <div className = "min-h-screen bg-gray-50 p-4">
                <div className = "max-w-2xl mx-auto">
                    <div className = "mb-6">
                        <h1 className = "text-3xl font-bold text-gray-900">GCash Payment</h1>
                        <p className = "text-gray-600">Complete your rental payment using GCash</p>
                    </div>

                    <div className = "grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <Card>
                                    
                                </Card>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GcashPayment;