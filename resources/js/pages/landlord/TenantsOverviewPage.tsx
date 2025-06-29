import { Tenant, tenantColumns } from '@/components/landlord/tenants/tenantsTable/tenantColumn';
import { TenantsDataTable } from '@/components/landlord/tenants/tenantsTable/tenants-data-table';
import MetricCard from '@/components/landlord/ui/MetricCard';
import LandlordLayout from '@/layout/LandlordLayout';
import { AlertCircle, AlertTriangle, Calendar, CheckCircle2, Clock, DollarSign, House, Users, XCircle } from 'lucide-react';

const leaseStatusOptions = [
    {
        label: 'Active',
        value: 'active',
        icon: CheckCircle2,
    },
    {
        label: 'Pending',
        value: 'pending',
        icon: Clock,
    },
    {
        label: 'Expired',
        value: 'expired',
        icon: AlertCircle,
    },
    {
        label: 'Terminated',
        value: 'terminated',
        icon: XCircle,
    },
    {
        label: 'No Active Lease',
        value: 'no_lease',
        icon: AlertCircle,
    },
];

const propertyTypeOptions = [
    {
        label: 'Duplex',
        value: 'duplex',
        icon: House,
    },
    {
        label: 'Duplex',
        value: 'triplex',
        icon: House,
    },
];

const mockTenants: Tenant[] = [
    {
        id: 'tenant_001',
        user_name: 'John Smith',
        email: 'john.smith@email.com',
        user_contact_number: '+1-555-0123',
        employment_status: 'employed',
        emergency_contact: '+1-555-0124 (Sarah Smith)',
        tenant_occupation: 'Software Engineer',
        move_in_date: '2023-03-15',
        created_at: '2023-02-28T10:30:00Z',
        updated_at: '2024-01-15T14:20:00Z',
        current_lease: {
            id: 'lease_001',
            unit: {
                id: 'unit_001',
                address: '123 Main St, Downtown',
                unit_number: '2A',
            },
            start_date: '2023-03-15',
            end_date: '2024-03-14',
            monthly_rent: 2500,
            lease_status: 'active',
        },
        total_leases: 1,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_002',
        user_name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        user_contact_number: '+1-555-0234',
        employment_status: 'self-employed',
        emergency_contact: '+1-555-0235 (Carlos Garcia)',
        tenant_occupation: 'Graphic Designer',
        move_in_date: '2022-08-01',
        created_at: '2022-07-15T09:15:00Z',
        updated_at: '2024-01-10T11:45:00Z',
        current_lease: {
            id: 'lease_002',
            unit: {
                id: 'unit_002',
                address: '456 Oak Avenue, Midtown',
                unit_number: '1B',
            },
            start_date: '2023-08-01',
            end_date: '2024-07-31',
            monthly_rent: 1800,
            lease_status: 'active',
        },
        total_leases: 2,
        active_maintenance_requests: 1,
    },
    {
        id: 'tenant_003',
        user_name: 'David Chen',
        email: 'david.chen@email.com',
        user_contact_number: '+1-555-0345',
        employment_status: 'student',
        emergency_contact: '+1-555-0346 (Linda Chen)',
        tenant_occupation: 'Graduate Student',
        move_in_date: '2023-09-01',
        created_at: '2023-08-20T16:00:00Z',
        updated_at: '2023-12-05T10:30:00Z',
        current_lease: {
            id: 'lease_003',
            unit: {
                id: 'unit_003',
                address: '789 University Blvd, Campus Area',
                unit_number: '3C',
            },
            start_date: '2023-09-01',
            end_date: '2024-08-31',
            monthly_rent: 1200,
            lease_status: 'active',
        },
        total_leases: 1,
        active_maintenance_requests: 2,
    },
    {
        id: 'tenant_004',
        user_name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        user_contact_number: '+1-555-0456',
        employment_status: 'unemployed',
        emergency_contact: '+1-555-0457 (Mike Johnson)',
        tenant_occupation: null,
        move_in_date: '2021-12-01',
        created_at: '2021-11-15T13:45:00Z',
        updated_at: '2024-01-20T09:15:00Z',
        current_lease: {
            id: 'lease_004',
            unit: {
                id: 'unit_004',
                address: '321 Pine Street, Suburbs',
                unit_number: null,
            },
            start_date: '2023-12-01',
            end_date: '2024-11-30',
            monthly_rent: 1600,
            lease_status: 'active',
        },
        total_leases: 3,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_005',
        user_name: 'Robert Wilson',
        email: 'robert.wilson@email.com',
        user_contact_number: '+1-555-0567',
        employment_status: 'retired',
        emergency_contact: '+1-555-0568 (Betty Wilson)',
        tenant_occupation: 'Retired Teacher',
        move_in_date: '2020-06-15',
        created_at: '2020-05-30T11:20:00Z',
        updated_at: '2023-11-28T15:10:00Z',
        current_lease: null,
        total_leases: 1,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_006',
        user_name: 'Emily Davis',
        email: 'emily.davis@email.com',
        user_contact_number: '+1-555-0678',
        employment_status: 'employed',
        emergency_contact: '+1-555-0679 (James Davis)',
        tenant_occupation: 'Marketing Manager',
        move_in_date: '2023-01-10',
        created_at: '2022-12-28T14:30:00Z',
        updated_at: '2024-01-18T12:00:00Z',
        current_lease: {
            id: 'lease_006',
            unit: {
                id: 'unit_006',
                address: '654 Elm Street, Historic District',
                unit_number: 'A',
            },
            start_date: '2023-01-10',
            end_date: '2023-12-31',
            monthly_rent: 2200,
            lease_status: 'expired',
        },
        total_leases: 1,
        active_maintenance_requests: 1,
    },
    {
        id: 'tenant_007',
        user_name: 'Michael Brown',
        email: 'michael.brown@email.com',
        user_contact_number: '+1-555-0789',
        employment_status: 'self-employed',
        emergency_contact: '+1-555-0790 (Lisa Brown)',
        tenant_occupation: 'Freelance Writer',
        move_in_date: '2023-11-01',
        created_at: '2023-10-15T08:45:00Z',
        updated_at: '2023-12-20T16:30:00Z',
        current_lease: {
            id: 'lease_007',
            unit: {
                id: 'unit_007',
                address: '987 Maple Drive, Riverside',
                unit_number: 'B2',
            },
            start_date: '2023-11-01',
            end_date: '2024-10-31',
            monthly_rent: 1900,
            lease_status: 'pending',
        },
        total_leases: 1,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_008',
        user_name: 'Jessica Taylor',
        email: 'jessica.taylor@email.com',
        user_contact_number: '+1-555-0890',
        employment_status: 'employed',
        emergency_contact: null,
        tenant_occupation: 'Nurse',
        move_in_date: '2022-04-20',
        created_at: '2022-04-01T12:15:00Z',
        updated_at: '2023-10-05T14:25:00Z',
        current_lease: {
            id: 'lease_008',
            unit: {
                id: 'unit_008',
                address: '159 Cedar Lane, Medical District',
                unit_number: '4A',
            },
            start_date: '2023-04-20',
            end_date: '2024-04-19',
            monthly_rent: 2100,
            lease_status: 'terminated',
        },
        total_leases: 2,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_009',
        user_name: 'Alexander Kim',
        email: 'alex.kim@email.com',
        user_contact_number: '+1-555-0901',
        employment_status: null,
        emergency_contact: '+1-555-0902 (Grace Kim)',
        tenant_occupation: null,
        move_in_date: null,
        created_at: '2024-01-25T10:00:00Z',
        updated_at: '2024-01-25T10:00:00Z',
        current_lease: null,
        total_leases: 0,
        active_maintenance_requests: 0,
    },
    {
        id: 'tenant_010',
        user_name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        user_contact_number: '+1-555-1012',
        employment_status: 'student',
        emergency_contact: '+1-555-1013 (Tom Anderson)',
        tenant_occupation: 'Medical Student',
        move_in_date: '2023-05-15',
        created_at: '2023-05-01T09:30:00Z',
        updated_at: '2023-12-10T11:20:00Z',
        current_lease: {
            id: 'lease_010',
            unit: {
                id: 'unit_010',
                address: '753 Hospital Road, Medical Center',
                unit_number: '12B',
            },
            start_date: '2023-05-15',
            end_date: '2024-05-14',
            monthly_rent: 1400,
            lease_status: 'active',
        },
        total_leases: 1,
        active_maintenance_requests: 3,
    },
];

export const employmentStatuses = [
    {
        label: 'Employed',
        value: 'employed',
    },
    {
        label: 'Self-employed',
        value: 'self-employed',
    },
    {
        label: 'Student',
        value: 'student',
    },
    {
        label: 'Unemployed',
        value: 'unemployed',
    },
    {
        label: 'Retired',
        value: 'retired',
    },
    {
        label: 'Not Specified',
        value: 'not-specified',
    },
];

// Lease status filter options
export const leaseStatuses = [
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Pending',
        value: 'pending',
    },
    {
        label: 'Expired',
        value: 'expired',
    },
    {
        label: 'Terminated',
        value: 'terminated',
    },
    {
        label: 'No Lease',
        value: 'no-lease',
    },
];

const TenantsOverviewPage = () => {
    return (
        <LandlordLayout>
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
                        <p className="mt-1 text-gray-600">View and Manage Tenant Details</p>
                    </div>
                </div>

                <div className="flex w-full gap-6">
                    <MetricCard
                        className="flex-1"
                        title="Active Tenants"
                        metric="7"
                        metricDescription="1 pending lease renewal"
                        Icon={<Users className="h-4 w-4 text-muted-foreground" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title="Lease Expiring Soon"
                        metric="2"
                        metricDescription="Within next 90 days"
                        Icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title="Monthly Revenue"
                        metric="$12,800"
                        metricDescription="+8.5% from last month"
                        Icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title="Issues to Address"
                        metric="2"
                        metricDescription="1 expired lease, 1 unemployed tenant"
                        Icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
                    />
                </div>
                <div className="flex-col items-start gap-2 self-stretch">
                    <TenantsDataTable
                        columns={tenantColumns}
                        data={mockTenants}
                        employmentStatuses={employmentStatuses}
                        leaseStatuses={leaseStatuses}
                    />
                </div>
            </div>
        </LandlordLayout>
    );
};

export default TenantsOverviewPage;
