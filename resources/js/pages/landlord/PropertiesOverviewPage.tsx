import { PropertiesDataTable } from '@/components/landlord/Properties/propertiesTable/properties-data-table';
import { propertyColumns, type RentalProperty } from '@/components/landlord/Properties/propertiesTable/propertiesColumn';
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

const PropertiesOverviewPage = () => {
    const mockProperties: RentalProperty[] = [
        {
            id: '1',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '123 Main Street, Downtown',
            unit_number: 'A1',
            availability_status: 'available',
            floor_area: 1200,
            rent_price: 2500,
            property_type: 'duplex',
            description: 'Beautiful duplex with modern amenities',
            amenities: ['Parking', 'AC', 'WiFi', 'Laundry'],
            unit_photos: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg'],
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
        },
        {
            id: '2',
            landlord_id: 'landlord-2',
            landlord: {
                id: 'landlord-2',
                user_name: 'Sarah Johnson',
                email: 'sarah@example.com',
                user_contact_number: '+1-555-0456',
            },
            address: '456 Oak Avenue, Suburbs',
            unit_number: null,
            availability_status: 'occupied',
            floor_area: 1800,
            rent_price: 3200,
            property_type: 'triplex',
            description: 'Spacious triplex perfect for families',
            amenities: ['Garden', 'Garage', 'Pool', 'Security'],
            unit_photos: ['/images/property2-1.jpg', '/images/property2-2.jpg'],
            created_at: '2024-01-10T14:20:00Z',
            updated_at: '2024-01-20T09:15:00Z',
        },
        {
            id: '3',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '789 Pine Street, City Center',
            unit_number: 'B2',
            availability_status: 'maintenance',
            floor_area: 950,
            rent_price: 1900,
            property_type: 'duplex',
            description: 'Cozy duplex unit under renovation',
            amenities: ['Heating', 'AC'],
            unit_photos: null,
            created_at: '2024-01-05T16:45:00Z',
            updated_at: '2024-02-01T11:30:00Z',
        },
        {
            id: '1',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '123 Main Street, Downtown',
            unit_number: 'A1',
            availability_status: 'available',
            floor_area: 1200,
            rent_price: 2500,
            property_type: 'duplex',
            description: 'Beautiful duplex with modern amenities',
            amenities: ['Parking', 'AC', 'WiFi', 'Laundry'],
            unit_photos: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg'],
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
        },
        {
            id: '1',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '123 Main Street, Downtown',
            unit_number: 'A1',
            availability_status: 'available',
            floor_area: 1200,
            rent_price: 2500,
            property_type: 'duplex',
            description: 'Beautiful duplex with modern amenities',
            amenities: ['Parking', 'AC', 'WiFi', 'Laundry'],
            unit_photos: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg'],
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
        },
        {
            id: '1',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '123 Main Street, Downtown',
            unit_number: 'A1',
            availability_status: 'available',
            floor_area: 1200,
            rent_price: 2500,
            property_type: 'duplex',
            description: 'Beautiful duplex with modern amenities',
            amenities: ['Parking', 'AC', 'WiFi', 'Laundry'],
            unit_photos: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg'],
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
        },
        {
            id: '1',
            landlord_id: 'landlord-1',
            landlord: {
                id: 'landlord-1',
                user_name: 'John Smith',
                email: 'john@example.com',
                user_contact_number: '+1-555-0123',
            },
            address: '123 Main Street, Downtown',
            unit_number: 'A1',
            availability_status: 'available',
            floor_area: 1200,
            rent_price: 2500,
            property_type: 'duplex',
            description: 'Beautiful duplex with modern amenities',
            amenities: ['Parking', 'AC', 'WiFi', 'Laundry'],
            unit_photos: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg'],
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
        },
    ];

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
                        data={mockProperties}
                        landlords={landlordOptions}
                        propertyTypes={propertyTypeOptions}
                    />
                </div>
            </div>
        </LandlordLayout>
    );
};

export default PropertiesOverviewPage;
