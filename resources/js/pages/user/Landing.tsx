import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";
import { ListingsData } from "@/types/tenantDashboard.types";

interface UserListingsProps {
    ListingsData: ListingsData[];
}

const UserListings = ({ListingsData}: UserListingsProps) => {
    const title = "Welcome, Cris"
    const subtitle = "Discover your perfect home among our premium rental collection in the heart of Cebu."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/user"},
        {label: "USER DASHBOARD", href: "/user/application"}

    ];

    const headerLinks2 = [
        {label: "LOG OUT", href: "/logout", method: "post"}
    ]

    return(
        <ListingsLayout
            title={title}
            subtitle={subtitle}
            buttonLabel={buttonLabel}
            headerLinks={headerLinks}
            headerLinks2 = {headerLinks2}
        >
            <ListingsMain listingsData={ListingsData}/>
        </ListingsLayout>
    );
}

export default UserListings;
