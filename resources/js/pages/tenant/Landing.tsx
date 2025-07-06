import { useState } from "react";
import Header from "@/components/main/ui/Header";
import TenantLayout from "@/layout/TenantLayout";
import TenantProfileModal from "@/components/tenants/tenantsDashboard/tenant-profile-modal";
import { User } from "lucide-react";
import CurrentBill from "@/components/tenants/tenantsDashboard/current-bill";
import LeaseDetails from '@/components/tenants/tenantsDashboard/lease-details';
import MaintenanceRequestComponent from "@/components/tenants/tenantsDashboard/maintenance-request";
import ButtonSection from "@/components/tenants/tenantsDashboard/button-section";
import ContactLandlord from "@/components/tenants/tenantsDashboard/contact-landlord";


const TenantDashboard = () => {   
  const [profileModalOpen, setProfileModalOpen] = useState(false)

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

  const leaseData = {
    apartment: "Ph. 4, Lot 6, Block 6",
    unitNo: "3",
    totalFloors: "2",
    livingArea: "70.00",
    bedrooms: "3",
    toiletBaths: "2",
    balcony: "Yes",
    parkingSpace: "Yes",
    petFriendly: "Yes",
    furnished: "Unfurnished",
    leaseTerm: "12",
    rentPrice: "20000.00",
    deposit: "2",
    advance: "1",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "active",
  }

  const currentBill = {
    id: 1,
    billingDate: "2024-12-01",
    rentAmount: "20000.00",
    dueDate: "2024-12-15",
    paymentStatus: "pending",
    amountPaid: "0.00",
  }

  const maintenanceRequests = [
    {
      id: 1,
      description: "Leaking faucet in kitchen",
      status: "in_progress",
      priority: "medium",
      requestDate: "2024-11-28",
      scheduledDate: "2024-12-05",
    },
    {
      id: 2,
      description: "Air conditioning not working",
      status: "completed",
      priority: "high",
      requestDate: "2024-11-20",
      completionDate: "2024-11-25",
    },
  ]

  return(
    <>
      <Header 
        links={[ 
          {label: "VIEW LISTINGS", href: "/tenant/listings"},
          {label: "TENANT DASHBOARD", href: "/tenant/dashboard"},
          {label: "LOG OUT", href: "/"}
        ]}
        actions={
          <button 
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </button>
        }
      />
      <TenantLayout>
        <div className=" px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CurrentBill currentBill={currentBill} />
            <LeaseDetails leaseData={leaseData} />
            <MaintenanceRequestComponent maintenanceRequests={maintenanceRequests} />
          </div>

          <div className="space-y-6">
            <ContactLandlord />
            <ButtonSection leaseData={leaseData} currentBill={currentBill} />
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