export type MaintenanceRequest = {
    id: string
    tenant_id: string
    unit_id: string
    lease_id: string | null
    request_date: string
    maintenance_description: string
    request_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    priority_level: 'low' | 'medium' | 'high' | 'urgent'
    scheduled_date: string | null
    completion_date: string | null
    tenant_remarks: string | null
    landlord_notes: string | null
    estimated_cost: number | null
    actual_cost: number | null
    created_at: string
    updated_at: string
    // Related data
    tenant: {
        id: string
        user_name: string
        email: string
        user_contact_number: string
    }
    unit: {
        id: string
        address: string
        unit_number: string | null
        property_type: 'duplex' | 'triplex'
        landlord: {
            id: string
            user_name: string
        }
    }
    lease: {
        id: string
        start_date: string
        end_date: string
        lease_status: string
    } | null
}
