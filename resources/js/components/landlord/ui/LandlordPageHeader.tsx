import LandlordTextHeader from '@/components/landlord/ui/LandlordTextHeader';
import { ReactNode } from 'react';

interface LandlordPageHeaderProps {
    title: string;
    subtitle: string;
    actions?: ReactNode;

}

const LandlordPageHeader = ({ title, subtitle, actions }: LandlordPageHeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <LandlordTextHeader title={title} subtitle={subtitle} />
            {actions && (
                <div className="flex gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default LandlordPageHeader;
