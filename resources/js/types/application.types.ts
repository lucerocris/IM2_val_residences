export interface RentalApplication {
    id: string;
    prospective_tenant_id: string;
    unit_id: string;
    application_date: string | null;
    preferred_move_in_date: string;
    application_status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
    additional_notes: string;
    reviewed_date: string | null;
    review_notes: string | null;
    created_at: string;
    updated_at: string;
    prospective_tenant: {
        id: string;
        user_name: string;
        email: string;
        user_contact_number: string;
        monthly_income: number;
        current_address: string;
        employment_status: string;
    };
    rental_unit: {
        id: string;
        address: string;
        unit_number: string;
        property_type: 'duplex' | 'triplex';
        rent_price: number;
        availability_status: 'available' | 'occupied' | 'maintenance' | 'unavailable';
        landlord: {
            id: string;
            user_name: string;
        };
    };
}

export interface ApplicationData {
    application_id: string;
    unit_id: string;
    address: string;
    unit_number: string;
    rent_price: string;
    property_type: string;
    floor_area: string;
    application_date: string;
    preferred_move_in_date: string | null;
    application_status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
    additional_notes: string | null;
    reviewed_date: string | null;
    review_notes: string | null;
}

export interface UserApplicationProps {
    applicationData: ApplicationData[];
}