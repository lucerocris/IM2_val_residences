import ListingsLayout from "@/layout/ListingsLayout";
import ListingsMain from "@/components/main/ui/Listings/main";
import { ListingsData } from "@/types/tenantDashboard.types";
import { UserInfo } from "@/types/userDash";

interface UserListingsProps {
    ListingsData: ListingsData[];
    UserInfo: UserInfo[];
}

const UserListings = ({ListingsData, UserInfo}: UserListingsProps) => {
    console.log(UserInfo);
    const title = `Welcome, ${UserInfo[0].user_name}`
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
