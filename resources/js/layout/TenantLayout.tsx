import Header from '@/components/main/ui/Header';
import Footer from '@/components/main/ui/Footer';
import { ReactNode } from 'react';

interface TenantLayoutProps {
    children: ReactNode;
}
    
const TenantLayout = ({ children }:TenantLayoutProps) => {
    return (
        <div className="overflow-x-hidden min-h-screen">
            {children}
            <Footer />
        </div>
    )
}

export default TenantLayout;