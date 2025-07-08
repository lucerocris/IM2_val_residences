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
        <div className = "space-y-4">
            {/* Header */}
            <LandlordPageHeader title={title} subtitle={subtitle}  actions={action ? action : undefined}  />

            {/* Metric Grid Cards */}
            <MetricGrid metrics={metric} />
        </div>
    );
};

export default LandlordPageHeaderSection;
