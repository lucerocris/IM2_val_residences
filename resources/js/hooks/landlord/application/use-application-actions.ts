import { router } from '@inertiajs/react';
import type { RentalApplication } from '@/types/application.types';

export function useApplicationActions(
    applications: RentalApplication[],
    setApplications: React.Dispatch<React.SetStateAction<RentalApplication[]>>
) {
    function updateApplicationStatus(
        id: string,
        action: 'approved' | 'rejected',
        reviewNotes: string
    ) {
        setApplications(prev =>
            prev.map(app =>
                app.id === id
                    ? {
                        ...app,
                        application_status: action,
                        reviewed_date: new Date().toISOString().split('T')[0],
                        review_notes: reviewNotes,
                        updated_at: new Date().toISOString(),
                    }
                    : app
            )
        );

        router.patch(`/landlord/applications/${id}/status`, {
            action: action, notes: reviewNotes
        }, {
            preserveScroll: true,
            onSuccess: page => {
                if(page.props.applicationsData) {
                    setApplications(page.props.applicationsData as RentalApplication[]);
                }
            },
            onError: () => {
                setApplications(prev =>
                    prev.map(app =>
                        app.id === id ? { ...app, application_status: 'pending' } : app
                    )
                );
            },
        })
    }


    function sendMessage(id: string, message: string) {
        router.post(
            `/landlord/applications/${id}/message`,
            { message },
            { preserveScroll: true }
        );
    }
    return { updateApplicationStatus, sendMessage };
}
