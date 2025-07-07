export interface LeaseFormData {
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

export interface Tenant {
    id: number;
    user_name: string;
    email: string;
}

export interface RentalUnit {
    id: number;
    address: string;
    unit_number: string;
    rent_price: number;
}

export interface AddLeaseProps {
    tenants: Tenant[];
    available_units: RentalUnit[];
}
