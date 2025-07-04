import { Button } from "@/components/ui/button";
import Image1 from '../../../../images/image1.jpg'

interface HeroProps {
    title: string;
    subtitle: string;
    buttonLabel?: string;
}

const Hero = ({ title, subtitle, buttonLabel }:HeroProps) => {
    return(
        <>
            <div className = "relative min-h-screen overflow-hidden">
                
                <div className = "absolute inset-0">
                    <img src = {Image1} className= "size-full object-cover" />
                    <div className = "absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent"></div>
                </div>

                {/* Text n shi */}
                <div className = "relative z-10 container mx-auto px-4 h-full flex items-center">
                    <div className = "max-w-2xl lg:max-w-3xl">
                        <h1 className = "text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h1>

                        <p className = "text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light max-w-xl">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className = "absolute bottom-0 left-0 w-ful h-32 bg-gradient-to-t from-background to-transparent"></div>
            </div>
        </>
    );
}

export default Hero;