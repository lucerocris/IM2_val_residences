import { leaseColumns, type Lease } from '@/components/landlord/leases/leasesTable/leaseColumn';
import { LeasesDataTable } from '@/components/landlord/leases/leasesTable/leases-data-table';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import LandlordLayout from '@/layout/LandlordLayout';
import { AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';

interface LeasesPageProps {
    leases: Lease[];
}

const LeasesPage = ({leases}: LeasesPageProps) => {

    const leaseStatuses = [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Expired', value: 'expired' },
        { label: 'Terminated', value: 'terminated' },
    ];

    const propertyTypes = [
        { label: 'Duplex', value: 'duplex' },
        { label: 'Triplex', value: 'triplex' },
    ];

    const metricData = [
        {
            title: 'Total leases',
            metric: '1',
            metricDescription: 'All lease agreements',
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
        },

        {
            title: 'Active Leases',
            metric: '1',
            metricDescription: 'Currently active agreements',
            icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        },

        {
            title: 'Pending Approval',
            metric: '0',
            metricDescription: 'Awaiting approval process',
            icon: <Clock className="h-4 w-4 text-orange-600" />,
        },
        {
            title: 'With Overdue Bills',
            metric: '0',
            metricDescription: 'Outstanding payment issues',
            icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
        },
    ];

    return (
        <LandlordLayout>
            <div className="space-y-6">
                {/* Header Section*/}
                <LandlordPageHeaderSection title={'Leases'} subtitle={'Manage active leases, renewals, and terminations'} metric={metricData} />

                <div className="flex-col items-start gap-2 self-stretch">
                    <LeasesDataTable columns={leaseColumns} data={leases} leaseStatuses={leaseStatuses} propertyTypes={propertyTypes} />
                </div>
            </div>
        </LandlordLayout>
    );
};

export default LeasesPage;
