import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, QrCode, CheckCircle } from "lucide-react";
import InputLabel from "@/components/tenants/tenantsDashboard/contact-landlord-inputs";

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
                                <CardTitle className = "flex items-center gap-2">
                                    <QrCode className = "size-5" />
                                    Payment Instructions
                                </CardTitle>
                                <CardDescription>Scan the QR code or use the details below</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className = "flex justify-center">
                                    <div className = "size-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
                                        <div className = "text-center">
                                            <QrCode className = "size-12 text-gray-400 mx-auto mb-2" />
                                            <p className = "text-sm text-gray-500">GCash QR Code</p>
                                        </div>
                                    </div>
                                </div>

                                <div className = "space-y-2">
                                    <div className = "flex justify-between mt-4">
                                        <span className = "text-lg">Amount:</span>
                                        <span>₱{amount.toLocaleString()}</span>
                                    </div>

                                    <div className = "flex justify-between">
                                        <span>GCash Number:</span>
                                        <span>0917-123-4567</span>
                                    </div>
                                    
                                    <div className = "flex justify-between">
                                        <span>Account Name:</span>
                                        <span>Val Residences Co.</span>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className = "flex items-center gap-2">
                                    <Upload className = "size-5" />
                                    Submit Proof of Payment
                                </CardTitle>
                                <CardDescription>Submit your GCash transaction screenshot</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit = {handleSubmit}>
                                    <div>
                                        <InputLabel 
                                        label = "ref" 
                                        labelText = "GCash Reference Number"
                                        input = {<Input 
                                            id = "ref"
                                            value = {referenceNumber}
                                            onChange = {(e) => setReferenceNumber(e.target.value)}
                                            placeholder = "Enter reference number"
                                            required
                                        />}
                                        />
                                    </div>

                                    <div>
                                        <Label className = "text-base font-medium flex items-center gap-2 my-3">
                                            <Upload className = "size-5" />
                                            Proof of Payment
                                        </Label>
                                        <p className = "text-sm">Upload your GCash transaction screenshot</p>

                                        <div 
                                        className = "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                                        onDrop = {(e) => {
                                            e.preventDefault()
                                            const files = e.dataTransfer.files
                                            if(files.length > 0) {
                                                setProofFile(files[0])
                                            }
                                        }}
                                        onDragOver = {(e) => e.preventDefault()}
                                        onDragEnter = {(e) => e.preventDefault()}
                                        >
                                            <Input 
                                                type = "file"
                                                id = "proof-upload"
                                                accept = "image/*"
                                                onChange = {handleFileChange}
                                                className = "hidden"
                                                required
                                            />

                                            {!proofFile ? (
                                                <label htmlFor="proof-upload" className = "cursor-pointer">
                                                    <div className = "flex flex-col items-center space-y-4">
                                                        <div className = "size-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <Upload className = "size-8 text-gray-400"/>
                                                        </div>
                                                        
                                                        <div>
                                                            <p>Upload Payment</p>
                                                            <p>Click to browse or drag and drop</p>
                                                            <p>PNG, JPG</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className = "space-y-4"> 
                                                    <div className = "relative inline-block">
                                                        <img
                                                        src = {URL.createObjectURL(proofFile) || "placeholder.svg"}
                                                        alt = "payment proof preview" 
                                                        className = "max-w-xs max-h-48 rounded-lg shadow-md"
                                                        />

                                                        <Button
                                                        onClick = {() => setProofFile(null)}
                                                        >
                                                            x
                                                        </Button>
                                                    </div>
                                                    <p>{proofFile.name}</p>
                                                    <Label htmlFor ="proof-upoad">
                                                        Change image
                                                    </Label>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className = "space-y-4 my-4">
                                        <Label htmlFor = "notes">Additional Notes (Optional)</Label>
                                        <Textarea 
                                        id = "notes"
                                        value = {notes}
                                        onChange = {(e) => setNotes(e.target.value)}
                                        placeholder = "Any additional information..."
                                        rows = {3}
                                        />
                                    </div>

                                    <Button type = "submit" className = "w-full bg-blue-600"
                                    disabled = {!proofFile || !referenceNumber}>
                                        Submit Payment Proof
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GcashPayment;