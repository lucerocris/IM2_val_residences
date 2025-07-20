import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";
import { ListingsData, UserInfo } from "@/types/tenantDashboard.types";

interface UserListingsProps {
    ListingsData: ListingsData[];
    userInfo: UserInfo[];
}

const UserListings = ({ListingsData, userInfo}: UserListingsProps) => {
    const userName = userInfo && userInfo.length > 0 ? userInfo[0].user_name : "Guest";
    const title = `Welcome, ${userName}`
    const subtitle = "Discover your perfect home among our premium rental collection in the heart of Cebu."
    const buttonLabel = "VIEW LISTINGS"

    const headerLinks = [
        {label: "VIEW LISTINGS", href: "/user/listings"},
        {label: "USER DASHBOARD", href: "/user"}

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
