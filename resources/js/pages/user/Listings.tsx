import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";

const UserListings = () => {
    const title = "Welcome, Cris"
    const subtitle = "Discover your perfect home among our premium rental collection in the heart of Cebu."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/user/listings"},
        {label: "USER DASHBOARD", href: "/user"},
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

export default UserListings;