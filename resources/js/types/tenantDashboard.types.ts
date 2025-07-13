export interface Tenant {
    user_name: string;
    email: string;
    user_contact_number: string;
    user_type: string;
    move_in_date: string;
    employment_status: string;
    emergency_contact: string;
    tenant_occupation: string;
}

export interface Lease {
    id: number;
    tenant_id: number;
    unit_id: number;
    start_date: string;
    end_date: string;
    monthly_rent: number;
    deposit_amount: number; // 2 months deposit
    lease_term: number;
    lease_status: string;
    // From rental_units table (via unit relationship)
    units: {
        id: number;
        landlord_id: number;
        address: string;
        unit_number: string;
        availability_status: 'active' | 'expired' | 'terminated' | 'pending';
        floor_area: string;
        rent_price: string;
        property_type: string;
        description: string;
        amenities: string[];
    };
}

export interface MaintenanceRequest {
    id: number;
    tenant_id: number;
    unit_id: number;
    lease_id: number;
    request_date: string;
    maintenance_description: string;
    request_status: string;
    priority_level: 'low' | 'medium' | 'high' | 'urgent';
    scheduled_date: string;
    completion_date: string;
    tenant_remarks: string;
}

export interface RentalBill {
    id: number;
    lease_id: number;
    billing_date: string;
    rent_amount: string;
    due_date: string;
    paid_date: string;
    amount_paid: number;
    payment_status: 'pending' | 'paid' | 'overdue' | 'partial';
}
export interface TenantDashboardProps {
    tenantData: Tenant;
    leaseData: Lease[];
    rentalBill: RentalBill;
    maintenanceRequests: MaintenanceRequest[];
}
