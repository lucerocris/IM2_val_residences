import LandingLayout from '@/layout/LandingLayout';
import ListingsMain from '@/components/main/ui/Listings/main';
import { ListingsData } from '@/types/tenantDashboard.types';

interface LandingProps {
    listingsData: ListingsData[];
}

const landing = ({ listingsData }: LandingProps) => {
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu.";
    const btnLabel = "View Listings";
    const title = "Val Residences";

    return (
        <>
            <LandingLayout
                title={title}
                subtitle={desc}
                buttonLabel={btnLabel}
            >
                <ListingsMain listingsData={listingsData} redirectToLoginIfUnauthenticated={true} />
            </LandingLayout>
        </>
    )
}

export default landing;
