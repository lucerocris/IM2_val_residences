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

const BankTransferPayment = () => {
    const [proofFile, setProofFile] = useState<File | null> (null)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState("")
    const [notes, setNotes] = useState("")

    const amount = 15000.00
    const bankDetails = {
        bankName: "BPI (Bank of the Philippine Islands)",
        accountNumber: "1234-5678-90",
        accountName: "Val Residences Co.",
        swiftCode: "BOPIPHMM",
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setProofFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log({
            paymentMethod: "bank_transfer",
            amount,
            referenceNumber,
            proofFile,
            notes,
        })
        setIsSubmitted(true)
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast(`${label} copied to clipboard`)
    }

    if(isSubmitted) {
        return(
            <div className = "min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className = "w-full max-w-md">
                    <CardContent className = "flex flex-col items-center justify-center p-8">
                        <CheckCircle className = "size-16 text-green-500 mb-4" />
                        <h2 className = "text-2xl font-bold text-center">Payment Proof Submitted</h2>
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
                        <h1 className = "text-3xl font-bold">Bank Transfer Payment</h1>
                        <p>Complete your rental payment via bank transfer</p>
                    </div>

                    <div className = "grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className = "flex items-center gap-2">
                                    <Building2 className = "size-5" />
                                    Bank Transfer Details
                                </CardTitle>
                                <CardDescription>Use the following bank details for your transfer</CardDescription>
                            </CardHeader>
                            <CardContent className = "space-y-4">

                                <div className = "space-y-3">
                                    <div className = "flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className = "font-medium text-sm">Amount</span>
                                            <p className = "text-lg font-bold">₱{amount.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className = "space-y-3">

                                        <BankTransferInfo 
                                        label = "Bank Name" 
                                        value = {bankDetails.bankName}  
                                        button = {
                                            <Button
                                              variant = "ghost"
                                              size = "sm"
                                              onClick = {() => copyToClipboard(bankDetails.bankName, "Bank name")}
                                            >
                                                <Copy className = "size-4"/>
                                            </Button>
                                        }
                                        />

                                        <BankTransferInfo 
                                        label = "Account Number"
                                        value = {bankDetails.accountNumber}
                                        button = {
                                            <Button
                                            variant = "ghost"
                                            size = "sm"
                                            onClick = {() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                                            >
                                                <Copy className = "size-4" />
                                            </Button>
                                        }
                                        />

                                        <BankTransferInfo 
                                        label = "Account Name"
                                        value = {bankDetails.accountName}
                                        button = {
                                            <Button
                                            variant = "ghost"
                                            size = "sm"
                                            onClick = {() => copyToClipboard(bankDetails.accountName, "Account name")}
                                            >
                                                <Copy className = "size-4" />
                                            </Button>
                                        }
                                        />

                                        <BankTransferInfo 
                                        label = "SWIFT Code"
                                        value = {bankDetails.swiftCode}
                                        button = {
                                            <Button
                                            variant = "ghost"
                                            size = "sm"
                                            onClick = {() => copyToClipboard(bankDetails.swiftCode, "SWIFT code")}
                                            >
                                                <Copy className = "size-4" />
                                            </Button>
                                        }
                                        />
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
                                <CardDescription>Upload your bank transfer receipt or screenshot</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit = {handleSubmit} className = "space-y-4">
                                    <div>
                                        <InputLabel 
                                          label = "reference"
                                          labelText = "Bank Reference Number"
                                          input = {
                                            <Input
                                              id = "reference"
                                              value = {referenceNumber}
                                              onChange = {(e) => setReferenceNumber(e.target.value)}
                                              placeholder = "Enter bank reference number"
                                              required
                                            />
                                          }
                                        />
                                    </div>

                                    <div>
                                        <Label className = "text-base font-medium flex items-center gap-2 mb-3">
                                          <Upload className = "size-5" />
                                          Proof of Payment
                                        </Label>
                                        <p className = "text-sm mb-4">Upload your bank transfer receipt or screenshot</p>

                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                                            onDrop={(e) => {
                                            e.preventDefault()
                                            const files = e.dataTransfer.files
                                            if (files.length > 0) {
                                                setProofFile(files[0])
                                            }
                                            }}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragEnter={(e) => e.preventDefault()}
                                        >
                                            <input
                                            type="file"
                                            id="proof-upload"
                                            accept="image/*,.pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required
                                            />

                                            {!proofFile ? (
                                            <label htmlFor="proof-upload" className="cursor-pointer">
                                                <div className="flex flex-col items-center space-y-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Upload className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-medium text-gray-900">Upload Payment Receipt</p>
                                                    <p className="text-gray-500">Click to browse or drag and drop files here</p>
                                                    <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF, PDF up to 5MB each</p>
                                                </div>
                                                </div>
                                            </label>
                                            ) : (
                                            <div className="space-y-4">
                                                <div className="relative inline-block">
                                                {proofFile.type.startsWith("image/") ? (
                                                    <img
                                                    src={URL.createObjectURL(proofFile) || "/placeholder.svg"}
                                                    alt="Payment proof preview"
                                                    className="max-w-xs max-h-48 rounded-lg shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <div className="text-center">
                                                        <Building2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-sm text-gray-600">PDF Document</p>
                                                    </div>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => setProofFile(null)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                                </div>
                                                <p className="text-sm text-gray-600">{proofFile.name}</p>
                                                <label
                                                htmlFor="proof-upload"
                                                className="text-purple-600 hover:text-purple-700 cursor-pointer text-sm"
                                                >
                                                Change file
                                                </label>
                                            </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor = "notes">Additional Notes (Optional)</Label>
                                        <Textarea 
                                        id = "notes"
                                        value = {notes}
                                        onChange = {(e) => setNotes(e.target.value)}
                                        rows = {3} 
                                        />
                                    </div>

                                    <Button
                                      type = "submit"
                                      className = "w-full"
                                      disabled = {!proofFile || !referenceNumber}
                                    >
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

export default BankTransferPayment;