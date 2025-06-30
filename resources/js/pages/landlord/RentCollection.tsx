import LandlordLayout from '@/layout/LandlordLayout';
import MetricCard from '@/components/landlord/ui/MetricCard';
import { DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { RentCollectionDataTable } from '@/components/landlord/rentCollection/rentCollectionTable/rent-collection-data-table'
import { rentCollectionColumns, type RentalBill } from '@/components/landlord/rentCollection/rentCollectionTable/rent-collection-columns'

const mockRentalBills: RentalBill[] = [
  {
    id: 1,
    lease_id: 1,
    tenant_name: "John Smith",
    unit_address: "123 Oak Street",
    unit_number: "A",
    billing_date: "2024-01-01",
    rent_amount: 1500.0,
    due_date: "2024-01-05",
    paid_date: "2024-01-03",
    amount_paid: 1500.0,
    payment_status: "paid",
    tenant_contact: "john.smith@email.com",
  },
  {
    id: 2,
    lease_id: 2,
    tenant_name: "Sarah Johnson",
    unit_address: "456 Pine Avenue",
    unit_number: "B",
    billing_date: "2024-01-01",
    rent_amount: 1800.0,
    due_date: "2024-01-05",
    paid_date: undefined,
    amount_paid: 0,
    payment_status: "overdue",
    tenant_contact: "sarah.johnson@email.com",
  },
  {
    id: 3,
    lease_id: 3,
    tenant_name: "Mike Davis",
    unit_address: "789 Elm Drive",
    unit_number: "C",
    billing_date: "2024-01-01",
    rent_amount: 1600.0,
    due_date: "2024-01-05",
    paid_date: undefined,
    amount_paid: 800.0,
    payment_status: "partial",
    tenant_contact: "mike.davis@email.com",
  },
  {
    id: 4,
    lease_id: 4,
    tenant_name: "Emily Wilson",
    unit_address: "321 Maple Court",
    unit_number: "D",
    billing_date: "2024-01-01",
    rent_amount: 1400.0,
    due_date: "2024-01-05",
    paid_date: undefined,
    amount_paid: 0,
    payment_status: "pending",
    tenant_contact: "emily.wilson@email.com",
  },
  {
    id: 5,
    lease_id: 5,
    tenant_name: "David Brown",
    unit_address: "654 Cedar Lane",
    unit_number: "E",
    billing_date: "2024-01-01",
    rent_amount: 1700.0,
    due_date: "2024-01-05",
    paid_date: "2024-01-04",
    amount_paid: 1700.0,
    payment_status: "paid",
    tenant_contact: "david.brown@email.com",
  },
  {
    id: 6,
    lease_id: 6,
    tenant_name: "Lisa Martinez",
    unit_address: "987 Birch Street",
    billing_date: "2024-01-01",
    rent_amount: 1550.0,
    due_date: "2023-12-25",
    paid_date: undefined,
    amount_paid: 0,
    payment_status: "overdue",
    tenant_contact: "lisa.martinez@email.com",
  },
  {
    id: 7,
    lease_id: 7,
    tenant_name: "Robert Chen",
    unit_address: "234 Spruce Avenue",
    unit_number: "F",
    billing_date: "2024-01-01",
    rent_amount: 1650.0,
    due_date: "2024-01-08",
    paid_date: undefined,
    amount_paid: 0,
    payment_status: "pending",
    tenant_contact: "robert.chen@email.com",
  },
]

const Rent = () => {
    const totalRent = mockRentalBills.reduce((sum, bill) => sum + bill.rent_amount, 0)
    const totalPaid = mockRentalBills.reduce((sum, bill) => sum + bill.amount_paid, 0)
    const totalPending = totalRent - totalPaid
    const collectionRate = totalRent > 0 ? ((totalPaid / totalRent) * 100) : 0

    return (
        <LandlordLayout>
            <div className="space-y-6">
                <div className="container mx-auto px-4 py-8">
                    {/* Title */}
                    <div className="flex items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Rent Collection</h1>
                            <p className="text-gray-600">Manage rental payments and track collection status</p>
                        </div>
                    </div>

                    {/* Data Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <MetricCard 
                            title="Total Rent Due" 
                            metric={`₱${totalRent.toLocaleString()}`} 
                            metricDescription="This month" 
                            Icon={<DollarSign className="h-4 w-4 text-muted-foreground"/>} 
                        />

                        <MetricCard 
                            title="Amount Collected" 
                            metric={`₱${totalPaid.toLocaleString()}`} 
                            metricDescription="Paid in full" 
                            Icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                        />

                        <MetricCard 
                            title="Outstanding" 
                            metric={`₱${totalPending.toLocaleString()}`} 
                            metricDescription="Pending payment" 
                            Icon={<AlertCircle className="h-4 w-4 text-red-600" />}
                        />

                        <MetricCard 
                            title="Collection Rate" 
                            metric={`${collectionRate.toFixed(1)}%`} 
                            metricDescription="Current month" 
                            Icon={<Clock className="h-4 w-4 text-blue-600"/>} 
                        />
                    </div>

                    {/* Rental Bills Table */}
                    <div className="mb-8">
                        <RentCollectionDataTable 
                            columns={rentCollectionColumns} 
                            data={mockRentalBills} 
                        />
                    </div>
                </div>
            </div>
        </LandlordLayout>
    );
};

export default Rent;

