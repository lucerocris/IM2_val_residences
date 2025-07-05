import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import LandlordLayout from '@/layout/LandlordLayout';
import { router, useForm } from '@inertiajs/react';
import { Calendar, DollarSign, FileText, Save, User } from 'lucide-react';
import type React from 'react';

interface LeaseFormData {
    tenant_id: string;
    unit_id: string;
    start_date: string;
    end_date: string;
    monthly_rent: string;
    deposit_amount: string;
    lease_term: string;
    lease_status: string;
    terms_and_conditions: string;
    [key: string]: string | number | boolean | File | null | undefined | (string | number | boolean | File | null | undefined)[];
}

interface Tenant {
    id: number;
    user_name: string;
    email: string;
}

interface RentalUnit {
    id: number;
    address: string;
    unit_number: string;
    rent_price: number;
}

interface AddLeaseProps {
    tenants: Tenant[];
    available_units: RentalUnit[];
}

export default function AddLease({ tenants = [], available_units = [] }: AddLeaseProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LeaseFormData>({
        tenant_id: '',
        unit_id: '',
        start_date: '',
        end_date: '',
        monthly_rent: '',
        deposit_amount: '',
        lease_term: '12',
        lease_status: 'pending',
        terms_and_conditions: '',
    });

    const handleInputChange = (field: keyof LeaseFormData, value: string) => {
        setData(field, value);
    };

    const handleUnitChange = (unitId: string) => {
        setData('unit_id', unitId);

        // Auto-fill rent amount based on selected unit
        const selectedUnit = available_units.find((unit) => unit.id.toString() === unitId);
        if (selectedUnit) {
            setData('monthly_rent', selectedUnit.rent_price.toString());
        }
    };

    const handleLeaseTermChange = (term: string) => {
        setData('lease_term', term);

        // Auto-calculate end date based on start date and lease term
        if (data.start_date && term) {
            const startDate = new Date(data.start_date);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + Number.parseInt(term));
            setData('end_date', endDate.toISOString().split('T')[0]);
        }
    };

    const handleStartDateChange = (startDate: string) => {
        setData('start_date', startDate);

        // Auto-calculate end date based on lease term
        if (startDate && data.lease_term) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setMonth(end.getMonth() + Number.parseInt(data.lease_term));
            setData('end_date', end.toISOString().split('T')[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/landlord/leases', {
            onSuccess: () => {
                router.visit('/landlord/leases');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        router.visit('/landlord/leases');
    };

    return (
        <LandlordLayout>
            <div className="space-y-6">
                {/* Header */}
                <LandlordPageHeader title={'Add Lease Agreement'} subtitle={'Create a new lease agreement between tenant and property'} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tenant and Property Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Tenant & Property Selection
                            </CardTitle>
                            <CardDescription>Select the tenant and rental unit for this lease</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="tenant_id">Tenant *</Label>
                                    <Select value={data.tenant_id} onValueChange={(value) => handleInputChange('tenant_id', value)}>
                                        <SelectTrigger className={errors.tenant_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a tenant" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tenants.map((tenant) => (
                                                <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                                    {tenant.user_name} ({tenant.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.tenant_id && <p className="text-sm text-red-500">{errors.tenant_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_id">Rental Unit *</Label>
                                    <Select value={data.unit_id} onValueChange={handleUnitChange}>
                                        <SelectTrigger className={errors.unit_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a rental unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {available_units.map((unit) => (
                                                <SelectItem key={unit.id} value={unit.id.toString()}>
                                                    {unit.address} {unit.unit_number && `- Unit ${unit.unit_number}`} (${unit.rent_price}/month)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.unit_id && <p className="text-sm text-red-500">{errors.unit_id}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lease Terms */}
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
                                        value={data.start_date}
                                        onChange={(e) => handleStartDateChange(e.target.value)}
                                        className={errors.start_date ? 'border-red-500' : ''}
                                    />
                                    {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lease_term">Lease Term (Months) *</Label>
                                    <Select value={data.lease_term} onValueChange={handleLeaseTermChange}>
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
                                        value={data.end_date}
                                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                                        className={errors.end_date ? 'border-red-500' : ''}
                                    />
                                    {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial Terms */}
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
                                            value={data.monthly_rent}
                                            onChange={(e) => handleInputChange('monthly_rent', e.target.value)}
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
                                            value={data.deposit_amount}
                                            onChange={(e) => handleInputChange('deposit_amount', e.target.value)}
                                            className={`pl-10 ${errors.deposit_amount ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.deposit_amount && <p className="text-sm text-red-500">{errors.deposit_amount}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lease_status">Lease Status</Label>
                                    <Select value={data.lease_status} onValueChange={(value) => handleInputChange('lease_status', value)}>
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

                    {/* Terms and Conditions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Terms and Conditions
                            </CardTitle>
                            <CardDescription>Additional lease terms and conditions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="terms_and_conditions">Terms and Conditions</Label>
                                <Textarea
                                    id="terms_and_conditions"
                                    placeholder="Enter specific lease terms, rules, and conditions..."
                                    value={data.terms_and_conditions}
                                    onChange={(e) => handleInputChange('terms_and_conditions', e.target.value)}
                                    rows={6}
                                    className={errors.terms_and_conditions ? 'border-red-500' : ''}
                                />
                                {errors.terms_and_conditions && <p className="text-sm text-red-500">{errors.terms_and_conditions}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-32">
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Creating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Create Lease
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </LandlordLayout>
    );
}
