import { useState } from 'react';
import type {RentalApplication} from '@/types/application.types';

type UseApplicationsReturn = {
    applications: RentalApplication[];
    setApplications: React.Dispatch<React.SetStateAction<RentalApplication[]>>;
}
export function useApplications(initial: RentalApplication[] = []): UseApplicationsReturn {
    const [applications, setApplications] = useState<RentalApplication[]>(initial);

    return { applications, setApplications };
}
