import { useState } from "react";
import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import CarouselText from "@/components/main/ui/CarouselText";
import Btn from "@/components/main/ui/Button";
import TenantLayout from "@/layout/TenantLayout";
import {
  CreditCard,
  Wrench,
  Home,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  Eye,
  Contact,
} from "lucide-react";
import CurrentBill from "@/components/landlord/tenants/tenantsDashboard/current-bill";
import LeaseDetails from '@/components/landlord/tenants/tenantsDashboard/lease-details';
import MaintenanceRequestComponent from "@/components/landlord/tenants/tenantsDashboard/maintenance-request";
import ButtonSection from "@/components/landlord/tenants/tenantsDashboard/button-section";
import ContactLandlord from "@/components/landlord/tenants/tenantsDashboard/contact-landlord";


const TenantDashboard = () => {   

const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [priorityLevel, setPriorityLevel] = useState("")

  // Mock data based on the schema
  const tenantData = {
    name: "Jose",
    email: "jose@email.com",
    contactNumber: "+63 912 345 6789",
    moveInDate: "2024-01-15",
    occupation: "Software Engineer",
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
            <Header links = {[ 
                {label: "VIEW LISTINGS", href: "/tenant/listings"},
                {label: "TENANT DASHBOARD", href: "/tenant/dashboard"},
                {label: "LOG OUT", href: "/"}
            ]}
            />
            <TenantLayout>
                <div className = " px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className = "lg:col-span-2 space-y-6">
                        <CurrentBill currentBill={currentBill} />
                        <LeaseDetails leaseData = {leaseData} />
                        <MaintenanceRequestComponent maintenanceRequests={maintenanceRequests} />
                    </div>

                    <div className = "space-y-6">
                        
                        <ContactLandlord />
                        <ButtonSection leaseData = {leaseData} currentBill = {currentBill} />
                    </div>
                </div>
            </TenantLayout>
        </>
    );
}

export default TenantDashboard;