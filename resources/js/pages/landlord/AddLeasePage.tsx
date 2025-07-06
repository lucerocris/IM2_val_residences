import FinancialTermsCard from '@/components/landlord/addLease/components/FinancialTermsCard';
import LeaseFormAction from '@/components/landlord/addLease/components/LeaseFormAction';
import LeaseTermsCard from '@/components/landlord/addLease/components/LeaseTermsCard';
import TenantPropertyCard from '@/components/landlord/addLease/components/TenantPropertyCard';
import TermsAndConditionCard from '@/components/landlord/addLease/components/TermsAndConditionCard';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import LandlordLayout from '@/layout/LandlordLayout';
import type { AddLeaseProps, LeaseFormData } from '@/types/addLease.types';
import { router, useForm } from '@inertiajs/react';
import type React from 'react';

export default function AddLease({ tenants, available_units }: AddLeaseProps) {
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

    console.log(data);
    console.log(tenants);
    console.log(available_units);

    const handleInputChange = (field: keyof LeaseFormData, value: string) => {
        setData(field, value);
    };

    const handleUnitChange = (unitId: string) => {
        setData('unit_id', unitId);

        // Autofill rent amount based on selected unit
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
                    <TenantPropertyCard
                        tenant_id={data.tenant_id}
                        tenants={tenants}
                        availableUnits={available_units}
                        unit_id={data.unit_id}
                        onInputChange={handleInputChange}
                        onUnitChange={handleUnitChange}
                        errors={errors}
                    />

                    {/* Lease Terms */}
                    <LeaseTermsCard
                        start_date={data.start_date}
                        lease_term={data.lease_term}
                        end_date={data.end_date}
                        onInputChange={handleInputChange}
                        onLeaseTermChange={handleLeaseTermChange}
                        onStartDateChange={handleStartDateChange}
                        errors={errors}
                    />

                    {/* Financial Terms */}
                    <FinancialTermsCard
                        monthly_rent={data.monthly_rent}
                        lease_status={data.lease_status}
                        deposit_amount={data.deposit_amount}
                        onInputChange={handleInputChange}
                        errors={errors}
                    />

                    {/* Terms and Conditions */}
                    <TermsAndConditionCard terms_and_conditions={data.terms_and_conditions} onInputChange={handleInputChange} errors={errors} />

                    {/* Submit Buttons */}
                    <LeaseFormAction onCancel={handleCancel} processing={processing} />
                </form>
            </div>
        </LandlordLayout>
    );
}
