import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image1 from '../../../../images/image1.jpg'

interface HeroProps {
    title: string;
    subtitle: string;
    buttonLabel?: string;
    onHeaderToggle?: (isVisible: boolean) => void;
    showScrollButton?: boolean;
}

const Hero = ({ title, subtitle, buttonLabel, onHeaderToggle, showScrollButton = false }:HeroProps) => {
    const [isInListingsSection, setIsInListingsSection] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(!showScrollButton);

    useEffect(() => {
        if (!showScrollButton) return;

        const handleScroll = () => {
            const heroSection = document.querySelector('.hero-section');
            const listingsSection = document.getElementById('listings-section');
            
            if (!heroSection || !listingsSection) return;

            const heroHeight = heroSection.getBoundingClientRect().height;
            const scrollY = window.scrollY;
            
            // Check if scrolled 50% of hero
            const inListings = scrollY > heroHeight * 0.5; 
            
            if (inListings !== isInListingsSection) {
                setIsInListingsSection(inListings);
                setHeaderVisible(inListings);
                onHeaderToggle?.(inListings);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInListingsSection, onHeaderToggle, showScrollButton]);

    const scrollToListings = () => {
        const listingsSection = document.getElementById('listings-section');
        if (listingsSection) {
            listingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <>
            <div className="hero-section relative min-h-screen overflow-hidden">
                
                <div className = "absolute inset-0">
                    <img src = {Image1} className= "size-full object-cover" />
                    <div className = "absolute inset-0 bg-black opacity-50"></div>
                </div>

                {/* Text n shi */}
                <div className = "absolute z-10 container mx-auto px-20 h-full flex items-center">
                    <div className = "max-w-2xl lg:max-w-3xl">
                        <h1 className = "text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                            {title}
                        </h1>

                        <p className = "text-lg lg:text-xl text-white/90 mb-6 leading-relaxed font-light max-w-xl">
                            {subtitle}
                        </p>

                        {showScrollButton && (
                            <Button 
                                onClick={scrollToListings}
                                size="lg"
                                className="bg-white hover:bg-white/90 text-black px-8 py-3 text-md font-semibold flex items-center gap-2"
                            >
                                {buttonLabel || "VIEW LISTINGS"}
                                <ChevronDown className="size-5" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Dynamic bottom gradient that only appears when in listings section */}
                <div className = {`absolute bottom-0 left-0 w-full h-32 transition-opacity duration-500 ${
                    isInListingsSection ? 'opacity-100' : 'opacity-0'
                } bg-gradient-to-t from-background to-transparent`}></div>

            </div>
        </>
    );
}

export default Hero;