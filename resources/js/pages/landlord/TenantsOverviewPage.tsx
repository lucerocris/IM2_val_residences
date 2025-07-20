import { Tenant, tenantColumns } from '@/components/landlord/tenants/tenantsTable/tenantColumn';
import { TenantsDataTable } from '@/components/landlord/tenants/tenantsTable/tenants-data-table';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
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

''

interface TenantsOverviewPageProps {
    tenants: Tenant[];
    numberOfActiveTenants: number;
    monthRevenue: number;
    pendingReviews: number;
    expiringLeases: number;

}

const TenantsOverviewPage = ({ expiringLeases,  tenants, numberOfActiveTenants, monthRevenue, pendingReviews }: TenantsOverviewPageProps) => {
    const metricData = [
        {
            title: 'Active Tenants',
            metric: numberOfActiveTenants,
            metricDescription: '1 pending lease renewal',
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Lease Expiring Soon',
            metric: expiringLeases,
            metricDescription: 'Within next 90 days',
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Monthly Revenue',
            metric: monthRevenue,
            metricDescription: 'Revenue this month',
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Pending Reviews',
            metric: pendingReviews,
            metricDescription: 'Pending documents to be reviewed',
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
        },
    ];

    return (
        <LandlordLayout>
            <div className="w-full space-y-6">
                <LandlordPageHeaderSection title={'Tenants'} subtitle={'View and Manage Tenant Details'} metric={metricData} />
                <div className="flex-col items-start gap-2 self-stretch">
                    <TenantsDataTable columns={tenantColumns} data={tenants} employmentStatuses={employmentStatuses} leaseStatuses={leaseStatuses} />
                </div>
            </div>
        </LandlordLayout>
    );
};

export default TenantsOverviewPage;
