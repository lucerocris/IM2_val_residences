// resources/js/hooks/use-application-filters.ts
import { useState, useMemo } from 'react';
import type { RentalApplication } from '@/types/application.types';

export function useApplicationFilters(applications: RentalApplication[]) {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'withdrawn'>('pending');

    const filtered = useMemo(() => {
        if (activeTab === 'all') return applications;
        return applications.filter(a => a.application_status === activeTab);
    }, [applications, activeTab]);

    return { activeTab, setActiveTab, filtered };
}
