import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardCardHeaderProps {
    icon: ReactNode,
    cardTitle: string,
    cardDescription: string
}

const DashboardCardHeader = ({icon, cardTitle, cardDescription}: DashboardCardHeaderProps) => {
    return (
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                {icon}
                {cardTitle}
            </CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
    );
};

export default DashboardCardHeader;
