// resources/js/hooks/use-application-metrics.ts
import { useMemo } from 'react';
import type { RentalApplication } from '@/types/application.types';

export function useApplicationMetrics(applications: RentalApplication[]) {
    return useMemo(() => {
        const total = applications.length;
        const pending = applications.filter(a => a.application_status === 'pending').length;
        const approved = applications.filter(a => a.application_status === 'approved').length;
        const rejected = applications.filter(a => a.application_status === 'rejected').length;
        const withdrawn = applications.filter(a => a.application_status === 'withdrawn').length;

        const needingReview = applications.filter(
            a => a.application_status === 'pending' && !a.reviewed_date
        ).length;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recent = applications.filter(
            a => a.application_date && new Date(a.application_date) >= sevenDaysAgo
        ).length;

        return {
            total,
            pending,
            approved,
            rejected,
            withdrawn,
            needingReview,
            recent,
            recentPercentage: total ? Math.round((recent / total) * 100) : 0,
        };
    }, [applications]);
}
