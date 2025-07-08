import AccountSecurityCard from '@/components/landlord/addTenant/AccountSecurityCard';
import BasicInformationCard from '@/components/landlord/addTenant/BasicInformationCard';
import EmploymentInfoCard from '@/components/landlord/addTenant/EmploymentInfoCard';
import AddTenantFormAction from '@/components/landlord/addTenant/addTenantFormAction';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import LandlordLayout from '@/layout/LandlordLayout';
import type { TenantFormData } from '@/types/addTenant.types';
import { router, useForm } from '@inertiajs/react';
import type React from 'react';

export default function AddTenant() {
    const { data, setData, post, processing, errors, reset } = useForm<TenantFormData>({
        user_name: '',
        email: '',
        user_contact_number: '',
        move_in_date: '',
        employment_status: '',
        emergency_contact: '',
        tenant_occupation: '',
        current_address: '',
        monthly_income: '',
        user_type: 'tenant',
    });

    const handleInputChange = (field: keyof TenantFormData, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/landlord/tenants', {
            onSuccess: () => {
                router.visit('/landlord/tenants');
            },
            onError: (errors: Record<string, string>) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        router.visit('/landlord/tenants');
    };

    return (
        <LandlordLayout>
            <div className="space-y-6 min-h-screen">
                {/* Header */}
                <LandlordPageHeader title={'Add Tenant'} subtitle={'Create a new tenant account'} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <BasicInformationCard
                        user_name={data.user_name}
                        email={data.email}
                        user_contact_number={data.user_contact_number}
                        current_address={data.current_address}
                        emergency_contact={data.emergency_contact}
                        errors={errors}
                        onInputChange={handleInputChange}
                    />

                    {/* Employment Information */}
                    <EmploymentInfoCard
                        tenant_occupation={data.tenant_occupation}
                        employment_status={data.employment_status}
                        monthly_income={data.monthly_income}
                        move_in_date={data.move_in_date}
                        errors={errors}
                        onInputChange={handleInputChange}
                    />

                    {/* Submit Buttons */}
                    <AddTenantFormAction processing={processing} onCancel={handleCancel} />
                </form>
            </div>
        </LandlordLayout>
    );
}
