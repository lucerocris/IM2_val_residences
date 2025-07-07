import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type React from 'react';
import type { LeaseFormData } from '@/types/addLease.types';

interface FinancialTermsCardProps {
    monthly_rent: string;
    lease_status: string;
    deposit_amount: string;
    onInputChange: (field: keyof LeaseFormData, value: string) => void;
    errors: Partial<Record<keyof LeaseFormData, string>>;


}

const FinancialTermsCard = ({monthly_rent, lease_status, deposit_amount, onInputChange, errors}: FinancialTermsCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Terms
                </CardTitle>
                <CardDescription>Set the rent amount and security deposit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="monthly_rent">Monthly Rent *</Label>
                        <div className="relative">
                            <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="monthly_rent"
                                type="number"
                                placeholder="1800"
                                value={monthly_rent}
                                onChange={(e) => onInputChange('monthly_rent', e.target.value)}
                                className={`pl-10 ${errors.monthly_rent ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.monthly_rent && <p className="text-sm text-red-500">{errors.monthly_rent}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deposit_amount">Security Deposit *</Label>
                        <div className="relative">
                            <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="deposit_amount"
                                type="number"
                                placeholder="1800"
                                value={deposit_amount}
                                onChange={(e) => onInputChange('deposit_amount', e.target.value)}
                                className={`pl-10 ${errors.deposit_amount ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.deposit_amount && <p className="text-sm text-red-500">{errors.deposit_amount}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lease_status">Lease Status</Label>
                        <Select value={lease_status} onValueChange={(value) => onInputChange('lease_status', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                                <SelectItem value="terminated">Terminated</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.lease_status && <p className="text-sm text-red-500">{errors.lease_status}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FinancialTermsCard;
