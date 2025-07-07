import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplicationActions } from '@/hooks/landlord/application/use-application-actions';
import { useApplicationFilters } from '@/hooks/landlord/application/use-application-filters';
import { useApplicationMetrics } from '@/hooks/landlord/application/use-application-metrics';
import { useApplications } from '@/hooks/landlord/application/use-applications';
import LandlordLayout from '@/layout/LandlordLayout';
import { RentalApplication } from '@/types/application.types';
import { CheckCircle, Clock, FileText, Home, TrendingUp } from 'lucide-react';
import { useState } from 'react';

import ApplicationCard from '@/components/landlord/applications/components/ApplicationCard';
import ApplicationModal from '@/components/landlord/applications/components/ApplicationModal';

interface ApplicationsPageProps {
    applicationsData: RentalApplication[];
}

const ApplicationsPage = ({ applicationsData }: ApplicationsPageProps) => {
    const { applications, setApplications } = useApplications(applicationsData);
    const { updateApplicationStatus, sendMessage } = useApplicationActions(applications, setApplications);
    const { activeTab, setActiveTab, filtered: filteredApplications } = useApplicationFilters(applications);
    const metrics = useApplicationMetrics(applications);

    const [selectedApplication, setSelectedApplication] = useState<RentalApplication | null>(null);
    const [reviewNotes, setReviewNotes] = useState('');
    const [messageText, setMessageText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleViewDetails(app: RentalApplication) {
        setSelectedApplication(app);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedApplication(null);
        setReviewNotes('');
        setMessageText('');
    }

    return (
        <LandlordLayout>
            <div className="container mx-auto space-y-6">
                <LandlordPageHeaderSection
                    title="Applications"
                    subtitle="Review and manage rental applications for your properties"
                    metric={[
                        {
                            title: 'Total Applications',
                            metric: metrics.total.toString(),
                            metricDescription: `${metrics.pending} pending, ${metrics.approved} approved, ${metrics.rejected} rejected`,
                            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
                        },
                        {
                            title: 'Pending Review',
                            metric: metrics.pending.toString(),
                            metricDescription: `${metrics.needingReview} awaiting initial review`,
                            icon: <Clock className="h-4 w-4 text-orange-600" />,
                        },
                        {
                            title: 'Approved',
                            metric: metrics.approved.toString(),
                            metricDescription: 'Ready for lease agreements',
                            icon: <CheckCircle className="h-4 w-4 text-green-600" />,
                        },
                        {
                            title: 'Recent (7 days)',
                            metric: metrics.recent.toString(),
                            metricDescription: `${Math.round((metrics.recent / metrics.total) * 100)}% of total applications`,
                            icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
                        },
                    ]}
                />

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                    <TabsList>
                        <TabsTrigger value="pending">Pending ({applications.filter((a) => a.application_status === 'pending').length})</TabsTrigger>
                        <TabsTrigger value="approved">
                            Approved ({applications.filter((a) => a.application_status === 'approved').length})
                        </TabsTrigger>
                        <TabsTrigger value="rejected">
                            Rejected ({applications.filter((a) => a.application_status === 'rejected').length})
                        </TabsTrigger>
                        <TabsTrigger value="withdrawn">
                            Withdrawn ({applications.filter((a) => a.application_status === 'withdrawn').length})
                        </TabsTrigger>
                        <TabsTrigger value="all">All Applications</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        {filteredApplications.length === 0 ? (
                            <Card>
                                <CardContent className="flex items-center justify-center py-12">
                                    <div className="text-center">
                                        <Home className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                        <h3 className="mb-2 text-lg font-semibold">No applications found</h3>
                                        <p className="text-muted-foreground">No applications match the current filter.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredApplications.map((app) => <ApplicationCard key={app.id} application={app} onViewDetails={handleViewDetails} />)
                        )}
                    </TabsContent>
                </Tabs>

                <ApplicationModal
                    application={selectedApplication}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    reviewNotes={reviewNotes}
                    onReviewNotesChange={setReviewNotes}
                    messageText={messageText}
                    onMessageTextChange={setMessageText}
                    onApplicationAction={updateApplicationStatus}
                    onSendMessage={sendMessage}
                />
            </div>
        </LandlordLayout>
    );
};

export default ApplicationsPage;
