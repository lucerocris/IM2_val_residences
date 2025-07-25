import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import Hero from '@/components/main/ui/Hero';
import LoginModal from '@/components/main/ui/LoginModal';
import SignUpModal from '@/components/main/ui/SignUpModal';
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { router } from '@inertiajs/react';

interface LandingLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    buttonLabel?: string;
}

const LandingLayout = ({ children, title, subtitle, buttonLabel }: LandingLayoutProps) => {
    const [headerVisible, setHeaderVisible] = useState(false);
    useFlashMessages();

    const headerLinks = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" }
    ];

    const headerActions = (
        <>
            <Button variant = "outline" className = "bg-transparent hover:opacity-70 duration-400 opacity-90 px-4" onClick = {() => router.visit('/login')}>
                Log In
            </Button>

            <Button variant = "outline" className = "bg-white text-black hover:opacity-70 duration-400 opacity-90 px-4" onClick = {() => router.visit('/register')}>
                Sign Up
            </Button>
        </>
    );

    return (
        <div className="overflow-x-hidden">
            {/* Dynamic Header */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                headerVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
                <Header links={headerLinks} actions={headerActions}/>
            </div>

            {/* Hero Section */}
            <Hero
                title={title}
                subtitle={subtitle}
                buttonLabel={buttonLabel}
                onHeaderToggle={setHeaderVisible}
                showScrollButton={true}
            />

            {/* Listings Section */}
            <div id="listings-section" className="w-full pt-[4.3rem] pb-[4.3rem] bg-white">
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default LandingLayout;
