import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputLabel from "@/components/tenants/tenantsDashboard/contact-landlord-inputs";

interface Listing {
    id: number;
    address: string;
    unit_number: string;
    rent_price: number;
}

interface ApplyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listing: Listing | null;
}

const ApplyModal = ({ open, onOpenChange, listing }:ApplyModalProps) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        occupation: "",
        annualIncome: "",
        moveInDate: "",
        message: ""
    })

    if(!listing) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log({ lisitngId: listing.id, ...formData })
        onOpenChange(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return(
        <>
            <Dialog open = {open} onOpenChange = {onOpenChange}>
                <DialogContent className = "sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Apply for {listing.address} - Unit {listing.unit_number}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit = {handleSubmit} className = "space-y-4">
                        <div className = "grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel 
                                    label = "Full Name" 
                                    input = 
                                    {<Input 
                                        id = "Full Name" 
                                        value = {formData.fullName} 
                                        onChange={(e) => handleInputChange("Full Name", e.target.value)} 
                                        required 
                                    />} 
                                />
                            </div>

                            <div>
                                <InputLabel 
                                    label = "Email"
                                    input = 
                                    {<Input 
                                        id = "Email"
                                        type = "email"
                                        value = {formData.email}
                                        onChange = {(e) => handleInputChange("Email", e.target.value)}
                                        required
                                    />}
                                />
                            </div>
                        </div>

                        <div className = "grid grid-cols-2 gap-4">

                            <div>
                                <InputLabel 
                                    label = "Phone Number"
                                    input = 
                                    {<Input 
                                        id = "Phone Number"
                                        value = {formData.phone}
                                        onChange = {(e) => handleInputChange("Phone Number", e.target.value)}
                                        required
                                    />}
                                />
                            </div>

                            <div>
                                <InputLabel 
                                    label = "Occupation"
                                    input = 
                                    {<Input 
                                        id = "Occupation"
                                        value = {formData.occupation}
                                        onChange = {(e) => handleInputChange("Occupation", e.target.value)}
                                        required
                                    />}
                                />
                            </div>
                        </div>

                        <div className = "grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel 
                                    label = "Annual Income"
                                    input = 
                                    {<Input 
                                        id = "Annual Income"
                                        type = "number"
                                        value = {formData.annualIncome}
                                        onChange = {(e) => handleInputChange("Annual Income", e.target.value)}
                                        required
                                    />}
                                />
                            </div>

                            <div>
                                <InputLabel 
                                    label = "Preferred Move In Date"
                                    input = 
                                    {<Input 
                                        id = "Preferred Move In Date"
                                        type = "date"
                                        value = {formData.moveInDate}
                                        onChange = {(e) => handleInputChange("Preferred Move In Date", e.target.value)}
                                        required
                                    />}
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel 
                                label = "Additional Message"
                                input = 
                                {<Textarea 
                                    id = "Additional Message"
                                    value = {formData.message}
                                    onChange = {(e) => handleInputChange("AdditionalMessage", e.target.value)}
                                    placeholder = "Tell us why you'd be a great tenant..."
                                    rows = {3}
                                />}
                            />
                        </div>

                        <div className = "flex justify-end gap-2 pt-2">
                            <Button type = "button" variant = "outline" onClick = {() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type = "submit">Submit Application</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ApplyModal;