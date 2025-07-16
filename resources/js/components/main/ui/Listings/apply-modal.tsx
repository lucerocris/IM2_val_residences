import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { PropertyFormData } from '@/types/propertyFormData.types';
import { ListingsData } from '@/types/tenantDashboard.types';

interface ApplyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listing: ListingsData | null;
}

interface User {
    id: number;
    user_name: string;
    email: string;
    user_contact_number?: string;
    user_type: string;
    [key: string]: string | number | undefined;
}

interface AuthProps {
    user: User;
}

interface PageProps {
    auth: AuthProps;

    [key: string]: unknown;
}

interface ApplicationFormData {
    unit_id: number;
    preferred_move_in_date: string;
    additional_notes: string;
    monthly_income: string;
    employment_status: string;
    [key: string]: string | number;
}

const ApplyModal = ({ open, onOpenChange, listing }: ApplyModalProps) => {
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;

    const { data, setData, post, processing, errors, reset } = useForm<ApplicationFormData>({
        unit_id: 0,
        preferred_move_in_date: '',
        additional_notes: '',
        monthly_income: '',
        employment_status: '',
    });

    const [displayData, setDisplayData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    // Pre-populate form when modal opens
    useEffect(() => {
        if (open && user && listing) {
            setDisplayData({
                fullName: user.user_name || '',
                email: user.email || '',
                phone: user.user_contact_number || '',
            });

            setData({
                unit_id: listing.id,
                preferred_move_in_date: '',
                additional_notes: '',
                monthly_income: '',
                employment_status: '',
            });
        }
    }, [open, user, listing]);

    if (!listing) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update the existing form data with additional required fields
        const updatedData = {
            ...data,
            prospective_tenant_id: user.id,
            application_date: new Date().toISOString().split('T')[0],
            application_status: 'pending',
        };

        router.post('/user/application', updatedData, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('success apply');
                onOpenChange(false);
                reset();
            },
            onError: (formErrors: Record<string, string>) => {
                console.error('Submission errors:', formErrors);
            },
        });
    };

    const handleInputChange = (field: keyof ApplicationFormData, value: string) => {
        setData(field, value);
    };



    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[650px]">
                    <DialogHeader className="mb-4">
                        <DialogTitle>
                            Apply for {listing.address} - Unit {listing.unit_number}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Display-only fields (pre-populated, not submitted) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Full Name</Label>
                                <Input value={displayData.fullName} disabled className="bg-gray-50" />
                            </div>
                            <div>
                                <Label className="mb-2">Email</Label>
                                <Input value={displayData.email} disabled className="bg-gray-50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Phone Number</Label>
                                <Input value={displayData.phone} disabled className="bg-gray-50" />
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="employment_status">
                                    Employment Status
                                </Label>
                                <Select value={data.employment_status} onValueChange={(value) => handleInputChange('employment_status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select employment status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="employed">Employed</SelectItem>
                                        <SelectItem value="self-employed">Self-employed</SelectItem>
                                        <SelectItem value="unemployed">Unemployed</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.employment_status && <p className="text-sm text-red-600">{errors.employment_status}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2" htmlFor="annual_income">
                                    Monthly Income
                                </Label>
                                <Input
                                    id="monthly_income"
                                    type="number"
                                    value={data.monthly_income}
                                    placeholder={'Your monthly income'}
                                    onChange={(e) => handleInputChange('monthly_income', e.target.value)}
                                    required={true}
                                />
                                {errors.annual_income && <p className="text-sm text-red-600">{errors.annual_income}</p>}
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="preferred_move_in_date">
                                    Preferred Move-In Date
                                </Label>
                                <Input
                                    id="preferred_move_in_date"
                                    type="date"
                                    value={data.preferred_move_in_date}
                                    onChange={(e) => handleInputChange('preferred_move_in_date', e.target.value)}
                                    required
                                />
                                {errors.preferred_move_in_date && <p className="text-sm text-red-600">{errors.preferred_move_in_date}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2" htmlFor="additional_notes">
                                Additional Message
                            </Label>
                            <Textarea
                                id="additional_notes"
                                value={data.additional_notes}
                                onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                                placeholder="Tell us why you'd be a great tenant..."
                                rows={3}
                            />
                            {errors.additional_notes && <p className="text-sm text-red-600">{errors.additional_notes}</p>}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ApplyModal;
