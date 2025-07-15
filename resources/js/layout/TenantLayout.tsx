import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import { ReactNode } from 'react';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { Toaster } from 'sonner';

interface TenantLayoutProps {
    children: ReactNode;
}

const TenantLayout = ({ children }:TenantLayoutProps) => {
    useFlashMessages();
    return (
        <div className="overflow-x-hidden min-h-screen">
            <Toaster duration={4000}/>
            {children}
            <Footer />
        </div>
    )
}

export default TenantLayout;
