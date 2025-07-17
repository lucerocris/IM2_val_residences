import BasicInformationCard from '@/components/landlord/addTenant/BasicInformationCard';
import EmploymentInfoCard from '@/components/landlord/addTenant/EmploymentInfoCard';
import AddTenantFormAction from '@/components/landlord/addTenant/addTenantFormAction';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import LandlordLayout from '@/layout/LandlordLayout';
import type { TenantFormData } from '@/types/addTenant.types';
import { router, useForm } from '@inertiajs/react';
import type React from 'react';

interface TenantData {
    id: string;
    user_name: string;
    email: string;
    user_contact_number: string;
    move_in_date: string | null;
    employment_status: string | null;
    emergency_contact: string | null;
    tenant_occupation: string | null;
    current_address: string | null;
    monthly_income: string | null;
}
interface AddTenantProps {
    tenant?: TenantData;
    isEditing?: boolean;
}

export default function AddTenant({tenant, isEditing}: AddTenantProps) {
    const { data, setData, post, put,  processing, errors, reset } = useForm<TenantFormData>({
        user_name: tenant?.user_name || '',
        email: tenant?.email || '',
        user_contact_number: tenant?.user_contact_number || '',
        move_in_date: tenant?.move_in_date || '',
        employment_status: tenant?.employment_status || '',
        emergency_contact: tenant?.emergency_contact || '',
        tenant_occupation: tenant?.tenant_occupation || '',
        current_address: tenant?.current_address || '',
        monthly_income: tenant?.monthly_income || '',
        user_type: 'tenant',
    });

    const handleInputChange = (field: keyof TenantFormData, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isEditing && tenant) {
            // UPDATE EXISTING TENANT
            router.put(`/landlord/tenants/${tenant.id}`, data,  {
                onSuccess: () => {
                    router.visit('/landlord/tenants');
                },
                onError: (errors: Record<string, string>) => {
                    console.error('Form submission errors:', errors);
                },
            });
        } else {
            // CREATE NEW TENANT
            router.post('/landlord/tenants', data, {
                onSuccess: () => {
                    router.visit('/landlord/tenants');
                },
                onError: (errors: Record<string, string>) => {
                    console.error('Form submission errors:', errors);
                },
            });
        }
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
