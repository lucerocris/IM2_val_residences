import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";

interface Listing {
    id: number;
    address: string;
    unit_number: string;
    availability_status: string;
    floor_area: number;
    rent_price: number;
    property_type: string;
    description: string;
    amenities: string[];
    unit_photos: string[];
}

interface UserListingsProps {
    ListingsData: Listing[];
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
            <ListingsMain ListingsData={ListingsData}/>
        </ListingsLayout>
    );
}

export default UserListings;
