export interface TenantFormData {
    user_name: string;
    email: string;
    user_contact_number: string;
    move_in_date: string;
    employment_status: string;
    emergency_contact: string;
    tenant_occupation: string;
    current_address: string;
    monthly_income: string;
    user_type: string;

    // Allow additional dynamic fields to satisfy Inertia's FormDataType constraint
    [key: string]: string | number | boolean | Blob | File | null | (string | number | boolean | Blob | File | null)[];
}
