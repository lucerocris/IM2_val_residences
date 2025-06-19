import MainLayout from '@/layout/MainLayout'
import CarouselText from '@/components/main/ui/CarouselText';

const landing = () => {
    const desc = "Have questions or need more details about our apartments? Contact us today!";
    const btnLabel = "Get in Touch";
    const title = "Contact Us";

    return(
        <MainLayout carouselText = {<CarouselText description= {desc} buttonLabel = {btnLabel} title = {title} />} />
    );
}

export default landing;