import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import Carousel from '@/components/main/ui/Carousel';
import img1 from '../../images/image1.jpg';
import img2 from '../../images/image2.jpg';
import img3 from '../../images/image3.jpg';
import img4 from '../../images/image4.jpg';
import { ReactNode } from 'react';
import Hero from '@/components/main/ui/Hero';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { Toaster } from 'sonner';

const slides = [
  <div className="flex items-center justify-center h-100 bg-gray-200 text-3xl font-bold"><img src= {img1} alt="Slide 1" className="w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-300 text-3xl font-bold"><img src= {img2} alt="Slide 2" className = "w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-400 text-3xl font-bold"><img src= {img3} alt="Slide 3" className = "w-full h-full object-cover"/></div>,
  <div className="flex items-center justify-center h-100 bg-gray-400 text-3xl font-bold"><img src= {img4} alt="Slide 3" className = "w-full h-full object-cover"/></div>,
];

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }:MainLayoutProps) => {
    useFlashMessages();
    return (
        <div className = "overflow-x-hidden">
            <Toaster duration={4000}/>
            <Hero title = "Val Residences" subtitle = "description" />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout;
