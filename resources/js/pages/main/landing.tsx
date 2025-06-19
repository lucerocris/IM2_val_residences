import MainLayout from '@/layout/MainLayout';
import CarouselText from '@/components/main/ui/CarouselText'

const landing = () => {
    const desc = "Wake up to refreshing mornings in our apartments at Corona del Mar, a Spanish Mediterranean-inspired seaside community in Cebu.";
    const btnLabel = "View Listings";
    const title = "Val Residences";

    return (
        <MainLayout carouselText = {<CarouselText description = {desc} buttonLabel = {btnLabel} title = {title}/>} />
    )
}

export default landing;
