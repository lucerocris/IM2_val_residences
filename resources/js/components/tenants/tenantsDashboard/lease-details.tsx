import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lease } from '@/types/tenantDashboard.types';
import LeaseDetailsInfo from './lease-details-info';

interface LeaseData {
    id: number;
    tenant_id: number;
    unit_id: number;
    start_date: string;
    end_date: string;
    monthly_rent: string;
    deposit_amount: string;
    lease_term: number;
    lease_status: string;
    terms_and_conditions: string;
    unit: {
        id: number;
        landlord_id: number;
        address: string;
        unit_number: string;
        availability_status: string;
        floor_area: string;
        rent_price: string;
        property_type: string;
        description: string;
        amenities: string[];
    };
}

interface LeaseDetailsProps {
    leaseData: Lease;
}

export default function LeaseDetails({ leaseData }: LeaseDetailsProps) {
    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 hover:bg-green-100';
            case 'expired':
                return 'bg-red-100 text-red-800 hover:bg-red-100';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    const formatAmenity = (amenity: string) => {
        return amenity.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <Card className="mx-auto w-full">
            <CardContent className="space-y-4">
                {/* Lease Information */}
                <div>
                    <h3 className="mb-2 text-base font-bold text-gray-900">Lease Information</h3>
                    <div className="grid grid-cols-5 gap-4">
                        <LeaseDetailsInfo title="Start Date" data={formatDate(leaseData.start_date)} />
                        <LeaseDetailsInfo title="Monthly Rent (Php)" data={formatCurrency(leaseData.monthly_rent)} />
                        <LeaseDetailsInfo title="Deposit Amount (Php)" data={formatCurrency(leaseData.deposit_amount)} />
                        <LeaseDetailsInfo title="Lease Term (months)" data={leaseData.lease_term.toLocaleString()} />

                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Lease Status</p>
                            <Badge className={`${getStatusColor(leaseData.lease_status)} text-sm`}>
                                {leaseData.lease_status.charAt(0).toUpperCase() + leaseData.lease_status.slice(1)}
                            </Badge>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Rental Unit Information */}
                <div>
                    <h3 className="mb-2 text-base font-bold text-gray-900">Rental Unit Information</h3>
                    <div className="mb-3 grid grid-cols-3 gap-4">
                        <LeaseDetailsInfo title="Address" data={leaseData.units?.address || 'N/A'} />
                        <LeaseDetailsInfo title="Unit Number" data={leaseData.units?.unit_number || 'N/A'} />
                        <LeaseDetailsInfo
                            title="Property Type"
                            data={
                                leaseData.units?.property_type
                                    ? leaseData.units.property_type.charAt(0).toUpperCase() + leaseData.units.property_type.slice(1)
                                    : 'N/A'
                            }
                        />
                    </div>

                    <div className="mb-3 space-y-1">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-md text-gray-900">{leaseData.units?.description || 'N/A'}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">Amenities</p>
                        <div className="flex flex-wrap gap-1">
                            {leaseData.units?.amenities?.map((amenity, index) => (
                                <Badge key={index} variant="secondary" className="bg-blue-100 px-2 py-1 text-sm text-blue-800 hover:bg-blue-100">
                                    {formatAmenity(amenity)}
                                </Badge>
                            )) || <span className="text-gray-500">No amenities listed</span>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
