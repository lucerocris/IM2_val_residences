import { useState } from "react";
import Header from "@/components/main/ui/Header";
import TenantLayout from "@/layout/TenantLayout";
import TenantProfileModal from "@/components/tenants/tenantsDashboard/tenant-profile-modal";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrentBill from "@/components/tenants/tenantsDashboard/current-bill";
import LeaseDetails from '@/components/tenants/tenantsDashboard/lease-details';
import MaintenanceRequestComponent from "@/components/tenants/tenantsDashboard/maintenance-request";
import ButtonSection from "@/components/tenants/tenantsDashboard/button-section";

const TenantDashboard = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [showAllLeases, setShowAllLeases] = useState(false)

  const tenantData = {
    user_name: "Jose Rivera",
    email: "jose.rivera@email.com",
    user_contact_number: "+63 912 345 6789",
    user_type: "tenant",
    move_in_date: "2024-01-15",
    employment_status: "Full-time",
    emergency_contact: "Maria Rivera - +63 920 123 4567",
    tenant_occupation: "Software Engineer",
  }

  const leaseDataArray = [
  {
    // From lease table
    id: 1,
    tenant_id: 1,
    unit_id: 1,
    start_date: "2024-01-15",
    end_date: "2025-01-15",
    monthly_rent: "20000.00",
    deposit_amount: "40000.00", // 2 months deposit
    lease_term: 12,
    lease_status: "active",
    terms_and_conditions: "Standard lease terms and conditions apply.",
    // From rental_units table (via unit relationship)
    unit: {
      id: 1,
      landlord_id: 1,
      address: "Ph. 4, Lot 6, Block 6",
      unit_number: "3",
      availability_status: "occupied",
      floor_area: "70.00",
      rent_price: "20000.00",
      property_type: "duplex",
      description: "2-story duplex unit with modern amenities",
      amenities: ["bedrooms", "bathrooms", "balcony", "parking_space", "pet_friendly", "unfurnished"],
    },
  },
  {
    id: 2,
    tenant_id: 2,
    unit_id: 2,
    start_date: "2024-03-01",
    end_date: "2025-03-01",
    monthly_rent: "15000.00",
    deposit_amount: "30000.00",
    lease_term: 12,
    lease_status: "pending",
    terms_and_conditions: "Standard lease terms with pet restrictions.",
    unit: {
      id: 2,
      landlord_id: 1,
      address: "Ph. 2, Lot 12, Block 3",
      unit_number: "1A",
      availability_status: "pending",
      floor_area: "55.00",
      rent_price: "15000.00",
      property_type: "apartment",
      description: "Cozy 1-bedroom apartment with city view",
      amenities: ["bedrooms", "bathrooms", "balcony", "furnished"],
    },
  },
  {
    id: 3,
    tenant_id: 3,
    unit_id: 3,
    start_date: "2023-06-15",
    end_date: "2024-06-15",
    monthly_rent: "25000.00",
    deposit_amount: "50000.00",
    lease_term: 12,
    lease_status: "expired",
    terms_and_conditions: "Premium lease with additional maintenance services included.",
    unit: {
      id: 3,
      landlord_id: 1,
      address: "Ph. 1, Lot 8, Block 1",
      unit_number: "2B",
      availability_status: "available",
      floor_area: "85.00",
      rent_price: "25000.00",
      property_type: "townhouse",
      description: "Spacious 3-bedroom townhouse with garden",
      amenities: ["bedrooms", "bathrooms", "balcony", "parking_space", "garden", "furnished"],
    },
  },
]

  const currentBill = {
    id: 1,
    lease_id: 1,
    billing_date: "2024-12-01",
    rent_amount: "20000.00",
    due_date: "2024-12-15",
    paid_date: null,
    amount_paid: "0.00",
    payment_status: "pending",
    // Backward compatibility
    billingDate: "2024-12-01",
    rentAmount: "20000.00",
    dueDate: "2024-12-15",
    paymentStatus: "pending",
    amountPaid: "0.00",
  }

  const maintenanceRequests = [
    {
      id: 1,
      tenant_id: 1,
      unit_id: 1,
      lease_id: 1,
      request_date: "2024-11-28",
      maintenance_description: "Leaking faucet in kitchen",
      request_status: "in_progress",
      priority_level: "medium",
      scheduled_date: "2024-12-05",
      completion_date: null,
      tenant_remarks: "Kitchen sink faucet has been dripping for 3 days",
      landlord_notes: "Plumber scheduled for Friday",
      estimated_cost: "1500.00",
      actual_cost: null,
      // Backward compatibility
      description: "Leaking faucet in kitchen",
      status: "in_progress",
      priority: "medium",
      requestDate: "2024-11-28",
      scheduledDate: "2024-12-05",
    },
    {
      id: 2,
      tenant_id: 1,
      unit_id: 1,
      lease_id: 1,
      request_date: "2024-11-20",
      maintenance_description: "Air conditioning not working",
      request_status: "completed",
      priority_level: "high",
      scheduled_date: "2024-11-22",
      completion_date: "2024-11-25",
      tenant_remarks: "AC stopped working completely",
      landlord_notes: "Replaced compressor, tested and working",
      estimated_cost: "8000.00",
      actual_cost: "7500.00",
      // Backward compatibility
      description: "Air conditioning not working",
      status: "completed",
      priority: "high",
      requestDate: "2024-11-20",
      completionDate: "2024-11-25",
    },
  ]

  const displayedLeases = showAllLeases ? leaseDataArray : [leaseDataArray[0]]

  return(
    <>
      <Header
        links={[
          {label: "VIEW LISTINGS", href: "/tenant/listings"},
          {label: "TENANT DASHBOARD", href: "/tenant/dashboard"}
        ]}
        links2 = {[
          {label: "LOG OUT", href: "/logout", method: 'post'}
        ]}
        actions={
          <Button
            variant = "outline"
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-white bg-transparent hover:text-black hover:bg-white/90 rounded-md transition-colors"
          >
            <User className="h-4 w-4" />
          </Button>
        }
      />
      <TenantLayout>
        <div className="px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CurrentBill currentBill={currentBill} />
            
            {/* Lease Details with Toggle Button */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button 
                  onClick={() => setShowAllLeases(!showAllLeases)} 
                  variant={showAllLeases ? "outline" : "default"}
                >
                  {showAllLeases ? "Show Single Lease" : `Show All Leases (${leaseDataArray.length})`}
                </Button>
              </div>
              
              {displayedLeases.map((leaseData) => (
                <LeaseDetails key={leaseData.id} leaseData={leaseData} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ButtonSection leaseData={leaseDataArray[0]} currentBill={currentBill} />
            <MaintenanceRequestComponent maintenanceRequests={maintenanceRequests} />
          </div>
        </div>
      </TenantLayout>

      <TenantProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        tenantData={tenantData}
      />
    </>
  );
}

export default TenantDashboard;
