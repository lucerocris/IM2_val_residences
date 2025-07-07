import LandlordLayout from '@/layout/LandlordLayout';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import { DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { RentCollectionDataTable } from '@/components/landlord/rentCollection/rentCollectionTable/rent-collection-data-table'
import { rentCollectionColumns, type RentalBill } from '@/components/landlord/rentCollection/rentCollectionTable/rent-collection-columns'

interface RentProps {
    rents: RentalBill[];
}

const Rent = ({ rents }: RentProps) => {
    // Add error handling and default to empty array
    const rentalBills = Array.isArray(rents) ? rents : [];
    
    // Calculate metrics from actual data
    const totalRent = rentalBills.reduce((sum, bill) => sum + bill.rent_amount, 0);
    const totalPaid = rentalBills.reduce((sum, bill) => sum + bill.amount_paid, 0);
    const totalOutstanding = totalRent - totalPaid;
    const collectionRate = totalRent > 0 ? (totalPaid / totalRent) * 100 : 0;

    // Prepare metrics data for LandlordPageHeaderSection
    const metrics = [
        {
            title: "Total Rent Due",
            metric: `₱${totalRent.toLocaleString()}`,
            metricDescription: "This month",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: "Amount Collected",
            metric: `₱${totalPaid.toLocaleString()}`,
            metricDescription: "Paid in full",
            icon: <CheckCircle className="h-4 w-4 text-green-600" />
        },
        {
            title: "Outstanding",
            metric: `₱${totalOutstanding.toLocaleString()}`,
            metricDescription: "Pending payment",
            icon: <AlertCircle className="h-4 w-4 text-red-600" />
        },
        {
            title: "Collection Rate",
            metric: `${collectionRate.toFixed(1)}%`,
            metricDescription: "Current month",
            icon: <Clock className="h-4 w-4 text-blue-600" />
        }
    ]

    return (
        <LandlordLayout>
            <div className="space-y-6">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section with Data Summary */}
                    <LandlordPageHeaderSection
                        title="Rent Collection"
                        subtitle="Manage rental payments and track collection status"
                        metric={metrics}
                    />

                    {/* Rental Bills Table */}
                    <div className="mt-8">
                        <RentCollectionDataTable 
                            columns={rentCollectionColumns} 
                            data={rents} 
                        />
                    </div>
                </div>
            </div>
        </LandlordLayout>
    );
};

export default Rent;