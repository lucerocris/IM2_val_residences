import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type React from 'react';
import { TenantFormData } from '@/types/addTenant.types';

interface EmploymentInfoCardProps {
    tenant_occupation: string;
    employment_status: string;
    monthly_income: string;
    move_in_date: string;
    errors: Partial<Record<keyof TenantFormData, string>>;
    onInputChange: (field: keyof TenantFormData, value: string) => void;
}

const EmploymentInfoCard = ({tenant_occupation, employment_status, monthly_income, move_in_date, onInputChange, errors}: EmploymentInfoCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Employment Information
                </CardTitle>
                <CardDescription>Employment and financial details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="tenant_occupation">Occupation</Label>
                        <Input
                            id="tenant_occupation"
                            placeholder="Software Engineer"
                            value={tenant_occupation}
                            onChange={(e) => onInputChange('tenant_occupation', e.target.value)}
                            className={errors.tenant_occupation ? 'border-red-500' : ''}
                        />
                        {errors.tenant_occupation && <p className="text-sm text-red-500">{errors.tenant_occupation}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="employment_status">Employment Status</Label>
                        <Select value={employment_status} onValueChange={(value) => onInputChange('employment_status', value)}>
                            <SelectTrigger className={errors.employment_status ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select employment status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full_time">Full Time</SelectItem>
                                <SelectItem value="part_time">Part Time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="self_employed">Self Employed</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.employment_status && <p className="text-sm text-red-500">{errors.employment_status}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="monthly_income">Monthly Income</Label>
                        <Input
                            id="monthly_income"
                            type="number"
                            placeholder="5000"
                            value={monthly_income}
                            onChange={(e) => onInputChange('monthly_income', e.target.value)}
                            className={errors.monthly_income ? 'border-red-500' : ''}
                        />
                        {errors.monthly_income && <p className="text-sm text-red-500">{errors.monthly_income}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="move_in_date">Preferred Move-in Date</Label>
                        <div className="relative">
                            <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="move_in_date"
                                type="date"
                                value={move_in_date}
                                onChange={(e) => onInputChange('move_in_date', e.target.value)}
                                className={`pl-10 ${errors.move_in_date ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.move_in_date && <p className="text-sm text-red-500">{errors.move_in_date}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EmploymentInfoCard;
