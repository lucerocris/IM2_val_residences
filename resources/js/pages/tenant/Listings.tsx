import MainLayout from "@/layout/MainLayout";
import Header from "@/components/main/ui/Header";
import { CardContent } from "../main/landing";
import CarouselText from "@/components/main/ui/CarouselText";
import ListingsMain from "@/components/main/ui/Listings/main";

const TenantListings = () => {
    const title = "Welcome, Jose"
    const subtitle = "Signed in as Tenant"
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu."
    const btnLabel = "VIEW LISTINGS"

    return(
        <>
            <Header links = {[
                {label: "VIEW LISTINGS", href: "/tenant/listings"},
                {label: "TENANT DASHBOARD", href: "/tenant"},
                {label: "LOG OUT", href: "/"}
            ]}
            />
            <MainLayout>
                <div className = "w-full pt-[4.3rem] pb-[4.3rem] bg-white">
                    <ListingsMain />
                </div>    
            </MainLayout>
        </>
    );
}

export default TenantListings;