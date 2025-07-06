import { MaintenanceDataTable } from "@/components/landlord/maintenance/maintenanceTable/maintenanceDataTable";
import { maintenanceColumns, MaintenanceRequest } from "@/components/landlord/maintenance/maintenanceTable/maintenanceTableColumn";
import LandlordLayout from "@/layout/LandlordLayout";

const mockMaintenanceData: MaintenanceRequest[] = [
    {
        id: "1",
        tenant_id: "tenant_1",
        unit_id: "unit_1", 
        lease_id: "lease_1",
        request_date: "2024-01-15",
        maintenance_description: "Kitchen faucet is leaking and needs repair. Water is dripping constantly.",
        request_status: "pending",
        priority_level: "medium",
        scheduled_date: null,
        completion_date: null,
        tenant_remarks: "The leak started about a week ago and is getting worse",
        landlord_notes: null,
        estimated_cost: 150,
        actual_cost: null,
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T10:30:00Z",
        tenant: {
            id: "tenant_1",
            user_name: "John Smith",
            email: "john.smith@email.com",
            user_contact_number: "+1-555-0123"
        },
        unit: {
            id: "unit_1",
            address: "123 Main Street",
            unit_number: "A",
            property_type: "duplex",
            landlord: {
                id: "landlord_1",
                user_name: "Jane Doe"
            }
        },
        lease: {
            id: "lease_1",
            start_date: "2023-06-01",
            end_date: "2024-05-31",
            lease_status: "active"
        }
    },
    {
        id: "2",
        tenant_id: "tenant_2",
        unit_id: "unit_2",
        lease_id: "lease_2", 
        request_date: "2024-01-12",
        maintenance_description: "Heating system not working properly. Temperature not reaching set point.",
        request_status: "in_progress",
        priority_level: "high",
        scheduled_date: "2024-01-20",
        completion_date: null,
        tenant_remarks: null,
        landlord_notes: "HVAC technician scheduled for Saturday morning",
        estimated_cost: 300,
        actual_cost: null,
        created_at: "2024-01-12T14:20:00Z",
        updated_at: "2024-01-18T09:15:00Z",
        tenant: {
            id: "tenant_2",
            user_name: "Sarah Johnson",
            email: "sarah.johnson@email.com", 
            user_contact_number: "+1-555-0456"
        },
        unit: {
            id: "unit_2",
            address: "456 Oak Avenue",
            unit_number: "B",
            property_type: "triplex",
            landlord: {
                id: "landlord_1",
                user_name: "Jane Doe"
            }
        },
        lease: {
            id: "lease_2",
            start_date: "2023-09-01",
            end_date: "2024-08-31",
            lease_status: "active"
        }
    },
    {
        id: "3",
        tenant_id: "tenant_3",
        unit_id: "unit_3",
        lease_id: null,
        request_date: "2024-01-08",
        maintenance_description: "Electrical outlet in bedroom not working. Need electrician to inspect.",
        request_status: "completed",
        priority_level: "urgent",
        scheduled_date: "2024-01-10",
        completion_date: "2024-01-10",
        tenant_remarks: "Safety concern - sparks noticed",
        landlord_notes: "Faulty wiring replaced. Electrical inspection passed.",
        estimated_cost: 200,
        actual_cost: 185,
        created_at: "2024-01-08T16:45:00Z", 
        updated_at: "2024-01-10T17:30:00Z",
        tenant: {
            id: "tenant_3",
            user_name: "Mike Wilson",
            email: "mike.wilson@email.com",
            user_contact_number: "+1-555-0789"
        },
        unit: {
            id: "unit_3",
            address: "789 Pine Street",
            unit_number: null,
            property_type: "duplex",
            landlord: {
                id: "landlord_1", 
                user_name: "Jane Doe"
            }
        }
    }
];

// Filter options for the data table
const requestStatuses = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" }
];

const priorityLevels = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" }
];

const propertyTypes = [
    { label: "Duplex", value: "duplex" },
    { label: "Triplex", value: "triplex" }
];

const MaintenanceRequestMain = () => {
    return(
        <>
            <LandlordLayout>
                <div className = "space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Maintenance Requests</h1>
                        <p className="text-muted-foreground">
                            Manage and track all maintenance requests from your tenants
                        </p>
                    </div>
                    
                    <MaintenanceDataTable
                        columns={maintenanceColumns}
                        data={mockMaintenanceData}
                        requestStatuses={requestStatuses}
                        priorityLevels={priorityLevels}
                        propertyTypes={propertyTypes}
                    />
                </div>
            </LandlordLayout>  
        </>
    );
}

export default MaintenanceRequestMain