import MainLayout from '@/layout/MainLayout'

const landing = () => {
    const desc = "Have questions or need more details about our apartments? Contact us today!";
    const btnLabel = "Get in Touch";
    const title = "Contact Us";

    return(
        <MainLayout title = {title} description = {desc} buttonLabel= {btnLabel} />
    );
}

export default landing;