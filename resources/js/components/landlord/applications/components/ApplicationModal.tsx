import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RentalApplication } from '@/types/application.types';
import { getAvailabilityBadge, getStatusBadge } from '@/utils/applicationHelpers';
import {
    Briefcase,
    CalendarDays,
    CheckCircle,
    Clock,
    DollarSign,
    FileText,
    Home,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    User,
    XCircle,
} from 'lucide-react';

interface ApplicationModalProps {
    application: RentalApplication | null;
    isOpen: boolean;
    onClose: () => void;
    reviewNotes: string;
    messageText: string;
    onReviewNotesChange: (notes: string) => void;
    onMessageTextChange: (message: string) => void;
    onApplicationAction: (applicationId: string, action: 'approved' | 'rejected', notes: string) => void;
    onSendMessage: (applicationId: string, message: string) => void;
}

const InfoRow = ({ icon: Icon, label, value, children }: { icon: any; label: string; value?: string | number; children?: React.ReactNode }) => (
    <div className="flex items-start gap-3 py-2">
        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{label}</p>
            {children ? children : <p className="text-sm text-muted-foreground">{value}</p>}
        </div>
    </div>
);

const ApplicationModal = ({
    application,
    isOpen,
    onClose,
    reviewNotes,
    onReviewNotesChange,
    onMessageTextChange,
    onApplicationAction,
    onSendMessage,
    messageText,
}: ApplicationModalProps) => {
    if (!application) return null;

    const isPending = application.application_status === 'pending';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] !max-w-4xl overflow-y-auto">
                {/* Header */}
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {application.prospective_tenant.user_name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-semibold">{application.prospective_tenant.user_name}</DialogTitle>
                            <DialogDescription className="text-base">
                                {application.rental_unit.address} {application.rental_unit.unit_number}
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(application.application_status)}
                            <Badge variant="outline" className="text-xs">
                                #{application.id}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Contact & Basic Info */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Applicant Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <InfoRow icon={Mail} label="Email" value={application.prospective_tenant.email} />
                                <InfoRow icon={Phone} label="Phone" value={application.prospective_tenant.user_contact_number} />
                                <InfoRow
                                    icon={DollarSign}
                                    label="Monthly Income"
                                    value={`$${application.prospective_tenant.monthly_income.toLocaleString()}`}
                                />
                                <InfoRow icon={Briefcase} label="Employment" value={application.prospective_tenant.employment_status} />
                                <InfoRow icon={MapPin} label="Current Address" value={application.prospective_tenant.current_address} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Property Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <InfoRow
                                    icon={Home}
                                    label="Address"
                                    value={`${application.rental_unit.address} ${application.rental_unit.unit_number}`}
                                />
                                <InfoRow icon={DollarSign} label="Monthly Rent" value={`$${application.rental_unit.rent_price.toLocaleString()}`} />
                                <InfoRow icon={Home} label="Property Type" value={application.rental_unit.property_type} />
                                <InfoRow icon={CheckCircle} label="Availability">
                                    {getAvailabilityBadge(application.rental_unit.availability_status)}
                                </InfoRow>
                                <InfoRow
                                    icon={CalendarDays}
                                    label="Preferred Move-in"
                                    value={new Date(application.preferred_move_in_date).toLocaleDateString()}
                                />
                                <InfoRow icon={User} label="Landlord" value={application.rental_unit.landlord.user_name} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Timeline */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-medium">
                                <Clock className="h-4 w-4" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-muted-foreground">{new Date(application.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Updated</p>
                                    <p className="text-muted-foreground">{new Date(application.updated_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">Status</p>
                                    <div className="mt-1">{getStatusBadge(application.application_status)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Notes */}
                    {application.additional_notes && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base font-medium">
                                    <FileText className="h-4 w-4" />
                                    Additional Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border bg-muted/50 p-3">
                                    <p className="text-sm">{application.additional_notes}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Review Section - Only show for pending applications */}
                    {isPending && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base font-medium">
                                    <CheckCircle className="h-4 w-4" />
                                    Review Application
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="review-notes" className="text-sm font-medium">
                                        Review Notes
                                    </Label>
                                    <Textarea
                                        id="review-notes"
                                        placeholder="Add your review notes..."
                                        value={reviewNotes}
                                        onChange={(e) => onReviewNotesChange(e.target.value)}
                                        className="mt-2"
                                        rows={3}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => onApplicationAction(application.id, 'approved', reviewNotes)} className="flex-1" size="sm">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => onApplicationAction(application.id, 'rejected', reviewNotes)}
                                        variant="destructive"
                                        className="flex-1"
                                        size="sm"
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Previous Review Notes */}
                    {application.review_notes && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base font-medium">
                                    <FileText className="h-4 w-4" />
                                    Review Notes
                                    {application.reviewed_date && (
                                        <Badge variant="outline" className="ml-auto text-xs">
                                            {new Date(application.reviewed_date).toLocaleDateString()}
                                        </Badge>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border bg-muted/50 p-3">
                                    <p className="text-sm">{application.review_notes}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Communication */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-medium">
                                <MessageSquare className="h-4 w-4" />
                                Send Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Textarea
                                placeholder="Type your message to the applicant..."
                                value={messageText}
                                onChange={(e) => onMessageTextChange(e.target.value)}
                                rows={3}
                            />
                            <Button onClick={() => onSendMessage(application.id, messageText)} disabled={!messageText.trim()} size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ApplicationModal;
