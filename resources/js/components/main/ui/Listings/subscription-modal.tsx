import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubscriptionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SubscriptionModal = ({open, onOpenChange}:SubscriptionModalProps) => {
    const [email, setEmail] = useState("")
    const [maxRent, setMaxRent] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log({email, maxRent, propertyType })
        onOpenChange(false)
    }

    return(
        <>
            <Dialog open = {open} onOpenChange = {onOpenChange}>
                <DialogContent className = "sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Get Notified of New Properties</DialogTitle>
                    </DialogHeader>

                    <form onSubmit = {handleSubmit} className = "space-y-4">
                        <div className = "space-y-2">
                            <Label htmlFor = "email">Email Address</Label>
                            <Input 
                            id = "email"
                            type = "email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder = "Enter your email"
                            required
                            />
                        </div>

                        <div className = "space-y-2">
                            <Label htmlFor = "maxRent">Maximum Rent</Label>
                            <Select value = {maxRent} onValueChange = {setMaxRent}>
                                <SelectTrigger>
                                    <SelectValue placeholder = "Select max rent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value = "1000">$1,000</SelectItem>
                                    <SelectItem value = "1500">$1,500</SelectItem>
                                    <SelectItem value = "2000">$2,000</SelectItem>
                                    <SelectItem value = "any">Any Amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className = "space-y-2">
                            <Label htmlFor = "propertyType">Property Type</Label>
                            <Select value = {propertyType} onValueChange = {setPropertyType}>
                                <SelectTrigger>
                                    <SelectValue placeholder = "Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value = "duplex">Duplex</SelectItem>
                                    <SelectItem value = "triplex">Triplex</SelectItem>
                                    <SelectItem value = "any">Any Type</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className = "flex justify-end gap-2 pt-4">
                            <Button 
                                type = "button" 
                                variant = "outline"
                                onClick = {() => onOpenChange(false)}
                                >
                                    Cancel
                            </Button>
                            <Button type = "submit">Subscribe</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SubscriptionModal