import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import Hero from '@/components/main/ui/Hero';
import { ReactNode, useState } from 'react';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { Toaster } from 'sonner';

interface ListingsLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    buttonLabel?: string;
    headerLinks: { label: string; href: string }[];
    headerLinks2?: { label: string; href: string }[];
    headerActions?: ReactNode;
}

const ListingsLayout = ({ children, title, subtitle, buttonLabel, headerLinks, headerLinks2, headerActions }: ListingsLayoutProps) => {
    const [headerVisible, setHeaderVisible] = useState(false);
    useFlashMessages();

    return (
        <div className="overflow-x-hidden">
            <Toaster duration={4000}/>
            {/* Dynamic Header */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                headerVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
                <Header links={headerLinks} links2 = {headerLinks2} actions={headerActions} />
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

export default ListingsLayout;
