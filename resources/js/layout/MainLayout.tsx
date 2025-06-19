import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import Carousel from '@/components/main/ui/Carousel';
import img1 from '../../images/image1.jpg';
import img2 from '../../images/image2.jpg';
import img3 from '../../images/image3.jpg';
import img4 from '../../images/image4.jpg';

const slides = [
  <div className="flex items-center justify-center h-100 bg-gray-200 text-3xl font-bold"><img src= {img1} alt="Slide 1" className="w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-300 text-3xl font-bold"><img src= {img2} alt="Slide 2" className = "w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-400 text-3xl font-bold"><img src= {img3} alt="Slide 3" className = "w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-400 text-3xl font-bold"><img src= {img4} alt="Slide 3" className = "w-full h-full object-cover"/></div>,
];

interface MainLayoutProps {
  title: string;
  description: string;
  buttonLabel: string;
  
}
    
const MainLayout = ({ title, description, buttonLabel }: MainLayoutProps) => {
    return (
        <div className = "overflow-x-hidden">
            <div className="w-full h-[30px] bg-[#323232]"></div>
            <Header/>
            <div className = "relative isolate top-0 left-0 w-full h-full flex overflow-hidden">
                <Carousel slides={slides} />

                <div className="absolute top-0 left-0 w-[75%] h-full pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 65%, rgba(255, 255, 255, 0.4) 85%, rgba(255, 255, 255, 0) 100%)'}} />

                <div className = "w-[30%] flex flex-col absolute left-[10%] top-[15%]">
                    <h1 className = "text-[2.4rem] pb-[30px]">{title}</h1>
                    <p className = "text-[1.1rem] pb-[30px] font-medium">  {description}</p>
                    <button className = "bg-[#323232] hover:bg-[#606060] transition-colors duration-300 cursor-pointer text-[1rem] w-[200px] text-white py-[10px] px-[15px]">{buttonLabel}</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;
