import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wrench } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import InputLabel from "./contact-landlord-inputs";
import { Textarea } from "@/components/ui/textarea";

interface leaseData {
    apartment: string;
    unitNo: string;
    totalFloors: string;
    livingArea: string;
    bedrooms: string;
    toiletBaths: string;
    balcony: string;
    parkingSpace: string;
    petFriendly: string;
    furnished: string;
    leaseTerm: string;
    rentPrice: string;
    deposit: string;
    advance: string;
    startDate: string;
    endDate: string;
    status: string;
}

interface currentBill {
    id: number;
    billingDate: string;
    rentAmount: string;
    dueDate: string;
    paymentStatus: string;
    amountPaid: string;
}

interface ButtonSectionProps {
    leaseData: leaseData;
    currentBill: currentBill;
}

const ButtonSection = ({leaseData, currentBill }:ButtonSectionProps) => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const[maintenanceModalOpen, setMaintenanceModalOpen] = useState(false)

    return(
        <>
            <Dialog open = {paymentModalOpen} onOpenChange = {setPaymentModalOpen}>
                <DialogTrigger asChild>
                    <Card className = "cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                        <CardContent className = "p-6">
                            <PaymentButton />
                        </CardContent>
                    </Card>
                </DialogTrigger>

                <DialogContent className = "sm:max-w-md">
                    <PaymentModal leaseData = {leaseData} currentBill = {currentBill}/>
                </DialogContent>
            </Dialog>

            <Dialog open = {maintenanceModalOpen} onOpenChange = {setMaintenanceModalOpen} >
                <DialogTrigger asChild>
                    <Card className = "cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                        <CardContent className = "p-6">
                            <MaintenanceButton/>
                        </CardContent>
                    </Card>
                </DialogTrigger>

                <DialogContent className = "sm:max-w-lg">
                    <MaintenanceModal leaseData = {leaseData} currentBill = {currentBill} />
                </DialogContent>
            </Dialog>
        </>
    );
}

const PaymentButton = () => {
    return(
        <>
            <div className = "flex items-center justify-between">
                <div>
                    <h3 className = "text-lg font-semibold text-gray-900">Make Payment</h3>
                    <p className = "text-gray-600">Pay your monthly rent</p>
                </div>
                <CreditCard />
            </div>
        </>
    );
}

const MaintenanceButton = () => {
    return(
        <>
            <div className = "flex items-center justify-between">
                <div>
                    <h3 className = "text-lg font-semibold text-gray-900">Request Maintenance</h3>
                    <p className = "text-gray-600">Submit a maintenance request</p>
                </div>
                <Wrench />
            </div>
        </>
    );
}

const PaymentModal = ({leaseData, currentBill }:ButtonSectionProps) => {
    const [paymentMethod, setPaymentMethod] = useState("")
    const [referenceNumber, setReferenceNumber] = useState("")

    return(
        <>
            <DialogHeader>
                <DialogTitle>Make Payment</DialogTitle>
                <DialogDescription>Pay your monthly rent {leaseData.apartment}</DialogDescription>
            </DialogHeader>
            <div className = "space-y-4">
                <div className = "bg-gray-50 p-4 rounded-lg">
                    <div className = "flex justify-between items-center mb-2">
                        <span className = "text-sm text-gray-600">Amount Due:</span>
                        <span className = "font-semibold">₱{currentBill.rentAmount}</span>
                    </div>
                    <div className = "flex justify-between items-center">
                        <span className = "text-sm text-gray-600">Due Date:</span>
                        <span className = "text-sm">{currentBill.dueDate}</span>
                    </div>
                </div>

                <div className = "space-y-2">
                    <Label htmlFor = "payment-method">Payment Method</Label>
                    <Select value = {paymentMethod} onValueChange = {setPaymentMethod}>
                        <SelectTrigger>
                            <SelectValue placeholder = "Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value = "gcash">GCash</SelectItem>
                            <SelectItem value = "paymaya">PayMaya</SelectItem>
                            <SelectItem value = "bank-transfers">Bank Transfer</SelectItem>
                            <SelectItem value = "credit-card">Credit Card</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "Amount" input = {<Input id = {"amount"} type = "number" value = {currentBill.rentAmount} readOnly className = "bg-gray-50"/>} />
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "Reference Number" input = {<Input id = "reference" placeholder = "Enter reference number" value = {referenceNumber} onChange = {(e) => setReferenceNumber(e.target.value)} />} />
                </div>

                <Button className = "w-full" disabled = {!paymentMethod || !referenceNumber.trim()}>
                    <CreditCard className = "w-4 h-4 mr-2"/>
                    Proceed to Payment
                </Button>
            </div>
        </>
    );
}

const MaintenanceModal = ({leaseData, currentBill}:ButtonSectionProps) => {
    
    const [priorityLevel, setPriorityLevel] = useState("")

    return(
        <>
            <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
                <DialogDescription>Describe the maintenance issue for {leaseData.apartment}</DialogDescription>
            </DialogHeader>

            <div className = "space-y-4">
                <div className = "space-y-2">
                    <Label htmlFor = "priority">Priority Level</Label>
                    <Select value = {priorityLevel} onValueChange = {setPriorityLevel}>
                        <SelectTrigger>
                            <SelectValue placeholder = "Select your priority level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value = "low">Low - Can wait a few days</SelectItem>
                            <SelectItem value = "medium">Medium - Should be addressed soon</SelectItem>
                            <SelectItem value = "high">High - Needs attention within 24 hours</SelectItem>
                            <SelectItem value = "urgent">Urgent - Emergency repair needed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "Description" input = {<Textarea id = "description" placeholder = "Please describe the maintenance issue in detail..." className = "min-h-[100px]"/>} />
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "Additional Notes (Optional)" input = {<Textarea id = "tenant-remarks" placeholder = "Any additional information or special instructions..." rows = {3} />} />
                </div>

                <Button className = "w-full" disabled = {!priorityLevel}>
                    <Wrench className = "w-4 h-4 mr-2" />
                    Submit Request
                </Button>
            </div>
        </>
    );
}

export default ButtonSection;