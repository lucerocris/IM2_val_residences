import LandlordLayout from '@/layout/LandlordLayout';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import { Wrench, Clock, Settings, AlertTriangle } from 'lucide-react';
import { MaintenanceDataTable } from '@/components/landlord/maintenance/maintenanceTable/maintenanceDataTable';
import { maintenanceRequestColumns, type MaintenanceRequest} from '@/components/landlord/maintenance/maintenanceTable/maintenanceColumns';


interface MaintenancePageProps {
    maintenanceTableData: MaintenanceRequest[];
};


const MaintenancePage = ({maintenanceTableData}: MaintenancePageProps) => {
    const metricData = [
        {
            title: 'Total Requests',
            metric: '12',
            metricDescription: 'All maintenance requests',
            icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Pending Requests',
            metric: '5',
            metricDescription: 'Awaiting assignment/action',
            icon: <Clock className="h-4 w-4 text-orange-600" />,
        },
        {
            title: 'In Progress',
            metric: '3',
            metricDescription: 'Currently being worked on',
            icon: <Settings className="h-4 w-4 text-blue-600" />,
        },

        {
            title: 'Urgent Priority',
            metric: '2',
            metricDescription: 'High priority requests',
            icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
        },
    ];

    const requestStatuses = [
        { label: 'Pending', value: 'pending'},
        { label: 'In Progress', value: 'in_progress'},
        { label: 'Completed', value: 'completed'},
        { label: 'Cancelled', value: 'cancelled'},
    ]

    const priorityLevels = [
        {label: 'Low', value: 'low'},
        {label: 'Medium', value: 'medium'},
        {label: 'High', value: 'high'},
        {label: 'Urgent', value: 'urgent'}
    ];

    const propertyType = [
        {label: 'Triplex', value: 'triplex'},
        {label: 'Duplex', value: 'duplex'}
    ];



    return (
        <LandlordLayout>
            <div className="space-y-6">
                <LandlordPageHeaderSection title={'Maintenance Management'} subtitle={'Manage and Track All Maintenance Requests'} metric={metricData} />
                <div className="flex-col items-start gap-2 self-stretch overflow-x-auto">
                    <MaintenanceDataTable columns={maintenanceRequestColumns} data={maintenanceTableData} requestStatuses={requestStatuses} priorityLevels={priorityLevels} propertyTypes={propertyType} />
                </div>
            </div>
        </LandlordLayout>
    )
}

export default MaintenancePage;
