import MainLayout from '@/layout/MainLayout';

const landing = () => {
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu.";
    const btnLabel = "View Listings";
    const title = "Val Residences";

    return (
        <MainLayout title = { title } description = {desc}  buttonLabel = { btnLabel }/>
    )
}

export default landing;
