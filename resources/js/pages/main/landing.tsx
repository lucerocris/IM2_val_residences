import LandingLayout from '@/layout/LandingLayout';
import ListingsMain from '@/components/main/ui/Listings/main';

const landing = () => {
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
                <ListingsMain />
            </LandingLayout>
        </>
    )
}

export default landing;