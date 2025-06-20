import MainLayout from '@/layout/MainLayout';
import CarouselText from '@/components/main/ui/CarouselText';

const landing = () => {
    const desc = "Enjoy stunning views and a revitalizing sea breeze for a truly relaxing stay here at Val Residences at Corona del Mar.";
    const btnLabel = "Read More";
    const title = "About Us";

    return (
        <MainLayout carouselText = {<CarouselText description = {desc} buttonLabel= {btnLabel} title = {title} />}>
            <div className = "p-[4.3rem] flex gap-[40px] items-start">
                <div className = "flex-[2] text-[1.1em] leading-[1.5]">
                    <Text />
                </div>

                <div className = "flex-[1]">
                    <div className = "grid grid-cols-2 gap-2.5">
                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />
                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />

                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />
                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />

                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />
                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />

                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />
                        <img src="https://t4.ftcdn.net/jpg/00/76/25/75/360_F_76257590_OMqEbhnSnz30cLj6xAG511xSZrJabcsq.jpg" alt="" />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

const Text = () => {
    return(
        <>
            <h2 className = "mb-[15px] text-3xl font-bold">Welcome to Val Residences</h2>
            <p className = "mb-[40px]">Your home in the exclusive seaside community of Corona del Mar in Talisay City, Cebu. Nestled within
                    this Spanish Mediterranean-inspired beachfront subdivision, our apartments offer the perfect blend
                    of resort-style living and modern city convenience.</p>
            <p className = "mb-[40px]">Just a 15-minute drive from Cebu City via the South Coastal Road, Corona del Mar is the first
                    residential beachfront development of its kind in Cebu. Here, you'll wake up to breathtaking
                    panoramic views, a refreshing sea breeze, and the serenity of living close to nature—while still
                    enjoying easy access to schools, businesses, and shopping centers.</p>
            <h3 className = "mb-[15px] text-2xl font-bold">Features & Amenities</h3>
            <ul className = "pl-[20px] list-disc">
                <li>Beach Frontage facing Bohol Strait</li>
                <li>Well-lighted Spine Road with Tree Lines</li>
                <li>Clubhouse</li>
                <li>Infinity Pool with Shower Rooms</li>
                <li>View Tower</li>
                <li>Gazebo</li>
                <li>Tennis and Basketball Courts</li>
                <li>Landscaped Open Area</li>
                <li>Pocket Parks</li>
            </ul>
        </>
    );
}

export default landing;
