import MainLayout from '@/layout/MainLayout';

const landing = () => {
    const desc = "Enjoy stunning views and a revitalizing sea breeze for a truly relaxing stay here at Val Residences at Corona del Mar.";
    const btnLabel = "Read More";
    const title = "About Us";

    return (
        <MainLayout title = {title} description = {desc}  buttonLabel = {btnLabel}/>
    )
}

export default landing;
