import { PropertiesDataTable } from '@/components/landlord/Properties/propertiesTable/properties-data-table';
import { propertyColumns, type Unit } from '@/components/landlord/Properties/propertiesTable/propertiesColumn';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import { Button } from '@/components/ui/button';
import LandlordLayout from '@/layout/LandlordLayout';
import { Building2, CheckSquare, Plus, Users, Wrench } from 'lucide-react';



const metricsData = [
    {
        title: 'Total Units',
        metric: '24',
        metricDescription: '18 occupied, 6 available',
        icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: 'Available',
        metric: '24',
        metricDescription: '18 occupied, 6 available',
        icon: <CheckSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: 'Occupied',
        metric: '24',
        metricDescription: '18 occupied, 6 available',
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: 'Maintenance',
        metric: '24',
        metricDescription: '18 occupied, 6 available',
        icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
    },
];

interface PropertiesOverviewPageProps {
    units: Unit[]
}

const PropertiesOverviewPage = ({units}: PropertiesOverviewPageProps) => {

    const landlordOptions = [
        { label: 'John Smith', value: 'landlord-1' },
        { label: 'Sarah Johnson', value: 'landlord-2' },
    ];

    const propertyTypeOptions = [
        { label: 'Duplex', value: 'duplex' },
        { label: 'Triplex', value: 'triplex' },
    ];

    return (
        <LandlordLayout>
            <div className="w-full space-y-6">
                {/* Header Section*/}
                <LandlordPageHeaderSection
                    title={'Properties'}
                    subtitle={'Manage and monitor all your rental units'}
                    metric={metricsData}
                    action={
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Property
                        </Button>
                    }
                />

                <div className="flex-col items-start gap-2 self-stretch">
                    <PropertiesDataTable
                        columns={propertyColumns}
                        data={units}
                        landlords={landlordOptions}
                        propertyTypes={propertyTypeOptions}
                    />
                </div>
            </div>
        </LandlordLayout>
    );
};

export default PropertiesOverviewPage;
