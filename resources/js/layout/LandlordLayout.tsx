import LandlordHeader from '@/components/landlord/ui/LandlordHeader';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import LandlordSidebar from '@/components/landlord/ui/LandlordSidebar';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useFlashMessages } from '@/hooks/use-flash-messages';

interface LandlordLayoutProps {
    children: ReactNode;
}
const LandlordLayout = ({children}:LandlordLayoutProps ) => {
    useFlashMessages();
    return (
        <>
            <SidebarProvider>
                <LandlordSidebar/>
                <SidebarInset className="flex-grow overflow-hidden">
                    <Toaster duration={4000}/>
                    <div className="flex min-h-screen w-full">
                        <div className="w-full flex-1">
                            <LandlordHeader trigger={<SidebarTrigger />} />
                            {/* Main Content Container */}
                            <div className="w-full px-5 py-8 md:px-[24px]">
                                {/*  Main Content Content  */}
                                <div className="flex min-h-screen w-full flex-col gap-[32px]">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default LandlordLayout;
