import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";

const TenantListings = () => {
    const title = "Welcome, Jose"
    const subtitle = "Find your ideal residence from our curated collection of premium rental properties."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/tenant/listings"},
        {label: "TENANT DASHBOARD", href: "/tenant/dashboard"},
        {label: "LOG OUT", href: "/"}
    ];

    return(
        <ListingsLayout
            title={title}
            subtitle={subtitle}
            buttonLabel={buttonLabel}
            headerLinks={headerLinks}
        >
            <ListingsMain />
        </ListingsLayout>
    );
}

export default TenantListings;