import InputLabel from '@/components/tenants/tenantsDashboard/contact-landlord-inputs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

const ApplyModal = ({ open, onOpenChange, listing }: ApplyModalProps) => {
    const { props } = usePage();
    const user = (props as any).auth?.user;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        occupation: '',
        annualIncome: '',
        moveInDate: '',
        message: '',
    });

    // Pre-populate form with user data when modal opens
    useEffect(() => {
        if (open && user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.user_name || '',
                email: user.email || '',
                phone: user.user_contact_number || '',
            }));
        }
    }, [open, user]);

    if (!listing) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({ lisitngId: listing.id, ...formData });
        onOpenChange(false);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
                    <DialogHeader className="mb-4">
                        <DialogTitle>
                            Apply for {listing.address} - Unit {listing.unit_number}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    label="fullName"
                                    labelText="Full Name"
                                    input={
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            required
                                        />
                                    }
                                />
                            </div>

                            <div>
                                <InputLabel
                                    label="Email"
                                    labelText="Email"
                                    input={
                                        <Input
                                            id="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                        />
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    label="phoneNo"
                                    labelText="Phone Number"
                                    input={
                                        <Input
                                            id="phoneNo"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            required
                                        />
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="occupation" className="mb-2">Occupation</Label>
                                <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your occupation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="employed">Employed</SelectItem>
                                        <SelectItem value="self-employed">Self-employed</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    label="Annual Income"
                                    labelText="Annual Income"
                                    input={
                                        <Input
                                            id="Annual Income"
                                            type="number"
                                            value={formData.annualIncome}
                                            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                                            required
                                        />
                                    }
                                />
                            </div>

                            <div>
                                <InputLabel
                                    label="moveInDate"
                                    labelText="Preferred Move-In Date"
                                    input={
                                        <Input
                                            id="moveInDate"
                                            type="date"
                                            value={formData.moveInDate}
                                            onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                                            required
                                        />
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel
                                label="Additional Message"
                                labelText="Additional Message"
                                input={
                                    <Textarea
                                        id="Additional Message"
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        placeholder="Tell us why you'd be a great tenant..."
                                        rows={3}
                                    />
                                }
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Submit Application</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ApplyModal;
