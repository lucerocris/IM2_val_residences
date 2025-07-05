// resources/js/hooks/use-application-actions.ts
import type { RentalApplication } from '@/types/application.types';

export function useApplicationActions(
    applications: RentalApplication[],
    setApplications: React.Dispatch<React.SetStateAction<RentalApplication[]>>
) {
    function updateApplicationStatus(
        id: string,
        status: 'approved' | 'rejected',
        reviewNotes: string
    ) {
        setApplications(prev =>
            prev.map(app =>
                app.id === id
                    ? {
                        ...app,
                        application_status: status,
                        reviewed_date: new Date().toISOString().split('T')[0],
                        review_notes: reviewNotes,
                        updated_at: new Date().toISOString(),
                    }
                    : app
            )
        );
        // Optionally await an API call here.
    }

    function sendMessage(id: string, message: string) {
        // await axios.post(`/api/applications/${id}/messages`, { message });
        console.log(`Sending message to ${id}: ${message}`);
    }

    return { updateApplicationStatus, sendMessage };
}
