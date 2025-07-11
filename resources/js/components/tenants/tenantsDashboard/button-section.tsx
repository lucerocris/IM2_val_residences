import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Link, Wrench } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import InputLabel from "./contact-landlord-inputs";
import { Textarea } from "@/components/ui/textarea";

interface leaseData {
    id: number;
    tenant_id: number;
    unit_id: number;
    start_date: string;
    end_date: string;
    monthly_rent: string;
    deposit_amount: string;
    lease_term: number;
    lease_status: string;
    terms_and_conditions: string;
    unit: {
        id: number;
        landlord_id: number;
        address: string;
        unit_number: string;
        availability_status: string;
        floor_area: string;
        rent_price: string;
        property_type: string;
        description: string;
        amenities: string[];
    };
}

interface currentBill {
    id: number;
    lease_id: number;
    billing_date: string;
    rent_amount: string;
    due_date: string;
    paid_date: string | null;
    amount_paid: string;
    payment_status: string;
    // Backward compatibility
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
                <DialogDescription>Pay your monthly rent for {leaseData.unit.address}</DialogDescription>
            </DialogHeader>
            <div className = "space-y-4">
                <div className = "bg-gray-50 p-4 rounded-lg">
                    <div className = "flex justify-between items-center mb-2">
                        <span className = "text-sm text-gray-600">Amount Due:</span>
                        <span className = "font-semibold">₱{currentBill.rent_amount}</span>
                    </div>
                    <div className = "flex justify-between items-center">
                        <span className = "text-sm text-gray-600">Due Date:</span>
                        <span className = "text-sm">{currentBill.due_date}</span>
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
                        </SelectContent>
                    </Select>
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "Amount" labelText="Amount" input = {<Input id = {"Amount"} type = "number" value = {currentBill.rent_amount} readOnly className = "bg-gray-50"/>} />
                </div>

                <div className = "space-y-2">
                    <InputLabel label = "refNo" labelText="Reference Number" input = {<Input id = "refNo" placeholder = "Enter reference number" value = {referenceNumber} onChange = {(e) => setReferenceNumber(e.target.value)} />} />
                </div>

                <Button
                    className = "w-full"
                    disabled = {!paymentMethod || !referenceNumber.trim()}
                    onClick = {() => {
                        if(paymentMethod === "gcash") {
                            router.visit("/tenant/payments/gcash");
                        } else if (paymentMethod === "paymaya") {
                            router.visit("/tenant/payments/paymaya");
                        } else if (paymentMethod === "bank-transfers") {
                            router.visit("/tenant/payments/bankTransfer");
                        }
                    }}
                    >
                    <CreditCard className = "w-4 h-4 mr-2"/>
                    Proceed to Payment
                </Button>
            </div>
        </>
    );
}

const MaintenanceModal = ({ leaseData, currentBill }: ButtonSectionProps) => {
    const [priorityLevel, setPriorityLevel] = useState("");
    const [description, setDescription] = useState("");
    const [remarks, setRemarks] = useState("");

    const handleMaintenanceSubmit = () => {
        router.post('/tenant/maintenanceRequest', {
            priority_level: priorityLevel,
            description,
            remarks,
            lease_id: leaseData.id, // optional: assuming you want to associate the request with a lease
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
                <DialogDescription>
                    Describe the maintenance issue for {leaseData.unit.address}
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your priority level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low - Can wait a few days</SelectItem>
                            <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                            <SelectItem value="high">High - Needs attention within 24 hours</SelectItem>
                            <SelectItem value="urgent">Urgent - Emergency repair needed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <InputLabel
                        label="desc"
                        labelText="Description"
                        input={
                            <Textarea
                                id="desc"
                                placeholder="Please describe the maintenance issue in detail..."
                                className="min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        }
                    />
                </div>

                <div className="space-y-2">
                    <InputLabel
                        label="tenant-remarks"
                        labelText="Additional Notes (Optional)"
                        input={
                            <Textarea
                                id="tenant-remarks"
                                placeholder="Any additional information or special instructions..."
                                rows={3}
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        }
                    />
                </div>

                <Button
                    className="w-full"
                    disabled={!priorityLevel || !description}
                    onClick={handleMaintenanceSubmit}
                >
                    <Wrench className="w-4 h-4 mr-2" />
                    Submit Request
                </Button>
            </div>
        </>
    );
};

export default ButtonSection;
