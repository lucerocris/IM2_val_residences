import MainLayout from '@/layout/MainLayout';
import CarouselText from '@/components/main/ui/CarouselText';

const landing = () => {
    const desc = "Enjoy stunning views and a revitalizing sea breeze for a truly relaxing stay here at Val Residences at Corona del Mar.";
    const btnLabel = "Read More";
    const title = "About Us";

    return (
        <MainLayout carouselText = {<CarouselText description = {desc} buttonLabel= {btnLabel} title = {title} />}/>
    )
}

export default landing;
