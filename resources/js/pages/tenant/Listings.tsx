import { useState } from "react";
import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";
import TenantProfileModal from "@/components/tenants/tenantsDashboard/tenant-profile-modal";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserInfo, ListingsData } from "@/types/tenantDashboard.types";

interface TenantListingsProps {
    userInfo: UserInfo[];
    listingsData: ListingsData[];
}

const TenantListings = ({ userInfo, listingsData }: TenantListingsProps) => {
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const userName = userInfo && userInfo.length > 0 ? userInfo[0].user_name : "Guest";
    const title = `Welcome, ${userName}`;
    const subtitle = "Find your ideal residence from our curated collection of premium rental properties."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/tenant/listings"},
        {label: "TENANT DASHBOARD", href: "/tenant/dashboard"}
    ];

    const headerLinks2 = [
        {label: "LOG OUT", href: "/logout", method: "post"}
    ]

    // Use actual user data instead of hardcoded values
    const tenantData = userInfo && userInfo.length > 0 ? {
        user_name: userInfo[0].user_name,
        email: userInfo[0].email,
        user_contact_number: userInfo[0].user_contact_number,
        user_type: userInfo[0].user_type,
        move_in_date: userInfo[0].move_in_date,
        employment_status: userInfo[0].employment_status,
        emergency_contact: userInfo[0].emergency_contact,
        tenant_occupation: userInfo[0].tenant_occupation,
    } : {
        user_name: "Guest",
        email: "",
        user_contact_number: "",
        user_type: "tenant",
        move_in_date: "",
        employment_status: "",
        emergency_contact: "",
        tenant_occupation: "",
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
                <ListingsMain listingsData={listingsData} />
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
