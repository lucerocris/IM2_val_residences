import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import MetricGrid from '@/components/landlord/ui/MetricGrid';
import { ReactNode } from 'react';

type Metric = {
    title: string;
    metric: string | number;
    metricDescription: string | ReactNode;
    icon: ReactNode;
};

interface LandlordPageHeaderSectionProps {
    title: string;
    subtitle: string;
    action?: ReactNode;
    metric: Metric[];
}

const LandlordPageHeaderSection = ({title, subtitle, metric, action}: LandlordPageHeaderSectionProps) => {
    return (
        <>
            {/* Header */}
            <LandlordPageHeader title={title} subtitle={subtitle}  {...(action && { action })} />

            {/* Metric Grid Cards */}
            <MetricGrid metrics={metric} />
        </>
    );
};

export default LandlordPageHeaderSection;
