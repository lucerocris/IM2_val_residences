import { useState } from "react";
import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";
import TenantProfileModal from "@/components/tenants/tenantsDashboard/tenant-profile-modal";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TenantDashboardProps } from "@/types/tenantDashboard.types";

const TenantListings = ({ userInfo }:TenantDashboardProps) => {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const title = "Welcome, Jose"
    const subtitle = "Find your ideal residence from our curated collection of premium rental properties."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/tenant/listings"},
        {label: "TENANT DASHBOARD", href: "/tenant/dashboard"}
    ];

    const headerLinks2 = [
        {label: "LOG OUT", href: "/logout", method: "post"}
    ]

    const tenantData = {
        user_name: "Jose Rivera",
        email: "jose.rivera@email.com",
        user_contact_number: "+63 912 345 6789",
        user_type: "tenant",
        move_in_date: "2024-01-15",
        employment_status: "Full-time",
        emergency_contact: "Maria Rivera - +63 920 123 4567",
        tenant_occupation: "Software Engineer",
    };

    return(
        <>
            <ListingsLayout
                title={title}
                subtitle={subtitle}
                buttonLabel={buttonLabel}
                headerLinks={headerLinks}
                headerLinks2 = {headerLinks2}
                headerActions={
                    <Button
                        variant = "outline"
                        onClick={() => setProfileModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-white bg-transparent hover:text-black hover:bg-white/90 rounded-md transition-colors"
                    >
                        <User className="h-4 w-4" />
                    </Button>
                }
            >
                <ListingsMain />
            </ListingsLayout>

            <TenantProfileModal
                open={profileModalOpen}
                onOpenChange={setProfileModalOpen}
                tenantData={tenantData}
                userInfo = {userInfo}
            />
        </>
    );
}

export default TenantListings;
