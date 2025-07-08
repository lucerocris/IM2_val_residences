import LandingLayout from '@/layout/LandingLayout';
import ListingsMain from '@/components/main/ui/Listings/main';

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
interface landingProps {
    ListingsData: Listing[];
}


const landing = ({ListingsData}: landingProps) => {
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
                <ListingsMain ListingsData={ListingsData} />
            </LandingLayout>
        </>
    )
}

export default landing;
