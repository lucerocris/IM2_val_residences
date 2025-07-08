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
    const now = new Date();

    const targetMonth = now;

    const thisMonthBills = rentalBills.filter(bill => {
        const billDate = new Date(bill.due_date);
        return (
            billDate.getFullYear() === targetMonth.getFullYear() &&
            billDate.getMonth() === targetMonth.getMonth()
        );
    });

    const totalMonthlyRent = thisMonthBills.reduce(
        (sum, bill) => sum + bill.rent_amount, 0
    );

    const totalMonthlyPaid = thisMonthBills.reduce(
        (sum, bill) => sum + Math.min(bill.amount_paid, bill.rent_amount), 0
    );

    const totalOutstanding = Math.max(
        0, totalMonthlyRent - totalMonthlyPaid
    );

    const collectionRate = totalMonthlyRent ?
        Math.min(100, (totalMonthlyPaid / totalMonthlyRent) * 100) : 0;

    // Prepare metrics data for LandlordPageHeaderSection
    const metrics = [
        {
            title: "Total Rent Due",
            metric: `₱${totalMonthlyRent.toLocaleString()}`,
            metricDescription: "Due this month",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: "Amount Collected",
            metric: `₱${totalMonthlyPaid.toLocaleString()}`,
            metricDescription: "Paid this month",
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
                <div className="container mx-auto px-4">
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
