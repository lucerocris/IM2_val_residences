import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type React from 'react';
import type { LeaseFormData } from '@/types/addLease.types';

interface LeaseTermsCardProps {
    start_date: string;
    lease_term: string;
    end_date: string;
    onInputChange: (field: keyof LeaseFormData, value: string) => void;
    onLeaseTermChange: (term: string) => void;
    onStartDateChange: (startDate: string) => void;
    errors: Partial<Record<keyof LeaseFormData, string>>;

}


const LeaseTermsCard = ({start_date, lease_term, onStartDateChange, errors, onLeaseTermChange, onInputChange, end_date}: LeaseTermsCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Lease Terms
                </CardTitle>
                <CardDescription>Define the lease duration and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date *</Label>
                        <Input
                            id="start_date"
                            type="date"
                            value={start_date}
                            onChange={(e) => onStartDateChange(e.target.value)}
                            className={errors.start_date ? 'border-red-500' : ''}
                        />
                        {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lease_term">Lease Term (Months) *</Label>
                        <Select value={lease_term} onValueChange={onLeaseTermChange}>
                            <SelectTrigger className={errors.lease_term ? 'border-red-500' : ''}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="6">6 Months</SelectItem>
                                <SelectItem value="12">12 Months</SelectItem>
                                <SelectItem value="18">18 Months</SelectItem>
                                <SelectItem value="24">24 Months</SelectItem>
                                <SelectItem value="36">36 Months</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.lease_term && <p className="text-sm text-red-500">{errors.lease_term}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date *</Label>
                        <Input
                            id="end_date"
                            type="date"
                            value={end_date}
                            onChange={(e) => onInputChange('end_date', e.target.value)}
                            className={errors.end_date ? 'border-red-500' : ''}
                        />
                        {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LeaseTermsCard;
