import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { useState } from 'react';

// Helper functions for null-safe formatting
const formatCurrency = (value: number | null | undefined): string => {
    return value != null ? `$${value.toLocaleString()}` : 'N/A';
};

const formatDate = (date: string | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toLocaleDateString();
    } catch (error) {
        return 'Invalid date';
    }
};

interface ApplicationModalProps {
    application: RentalApplication | null;
    isOpen: boolean;
    onClose: () => void;
    reviewNotes: string;
    messageText: string;
    onReviewNotesChange: (notes: string) => void;
    onMessageTextChange: (message: string) => void;
    onApplicationAction: (applicationId: string, action: 'approved' | 'rejected', notes: string) => void;

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
    messageText,
}: ApplicationModalProps) => {
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    if (!application) return null;

    // Handle cases where prospective_tenant or rental_unit might be null (for approved applications)
    const prospectiveTenant = application.prospective_tenant;
    const rentalUnit = application.rental_unit;

    // If critical data is missing, show a simplified view
    if (!prospectiveTenant || !rentalUnit) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-h-[90vh] !max-w-4xl overflow-y-auto">
                    <DialogHeader className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary text-primary-foreground">N/A</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <DialogTitle className="text-xl font-semibold">Application #{application.id}</DialogTitle>
                                <DialogDescription className="text-base">Data not available - Application has been processed</DialogDescription>
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
                        <Card>
                            <CardContent className="py-6">
                                <p className="text-center text-muted-foreground">
                                    This application has been {application.application_status}.
                                    {application.application_status === 'approved' && ' The prospective tenant has been converted to a tenant.'}
                                </p>
                                {application.review_notes && (
                                    <div className="mt-4 rounded-md bg-muted p-4">
                                        <p className="text-sm">
                                            <strong>Review Notes:</strong> {application.review_notes}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    const isPending = application.application_status === 'pending';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] !max-w-4xl overflow-y-auto">
                {/* Header */}
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {prospectiveTenant.user_name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-semibold">{prospectiveTenant.user_name}</DialogTitle>
                            <DialogDescription className="text-base">
                                {rentalUnit.address} {rentalUnit.unit_number}
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
                                <InfoRow icon={Mail} label="Email" value={prospectiveTenant.email} />
                                <InfoRow icon={Phone} label="Phone" value={prospectiveTenant.user_contact_number} />
                                <InfoRow icon={DollarSign} label="Monthly Income" value={formatCurrency(prospectiveTenant.monthly_income)} />
                                <InfoRow icon={Briefcase} label="Employment" value={prospectiveTenant.employment_status} />
                                <InfoRow icon={MapPin} label="Current Address" value={prospectiveTenant.current_address} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Property Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <InfoRow icon={Home} label="Address" value={`${rentalUnit.address} ${rentalUnit.unit_number}`} />
                                <InfoRow icon={DollarSign} label="Monthly Rent" value={formatCurrency(rentalUnit.rent_price)} />
                                <InfoRow icon={Home} label="Property Type" value={rentalUnit.property_type} />
                                <InfoRow icon={CheckCircle} label="Availability">
                                    {getAvailabilityBadge(rentalUnit.availability_status)}
                                </InfoRow>
                                <InfoRow icon={CalendarDays} label="Preferred Move-in" value={formatDate(application.preferred_move_in_date)} />
                                <InfoRow icon={User} label="Landlord" value={rentalUnit.landlord.user_name} />
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
                                    <p className="text-muted-foreground">{formatDate(application.created_at)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Updated</p>
                                    <p className="text-muted-foreground">{formatDate(application.updated_at)}</p>
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
                                    <Button onClick={() => setShowApproveDialog(true)} className="flex-1" size="sm">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve
                                    </Button>
                                    <Button onClick={() => setShowRejectDialog(true)} variant="destructive" className="flex-1" size="sm">
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
                                            {formatDate(application.reviewed_date)}
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

                </div>

                {/* Approve Confirmation Dialog */}
                <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to approve this application?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will approve {prospectiveTenant.user_name}'s application for {rentalUnit.address} {rentalUnit.unit_number}. This
                                action will also automatically reject all other pending applications for this unit.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    onApplicationAction(application.id, 'approved', reviewNotes);
                                    setShowApproveDialog(false);
                                    onClose();
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Application
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Reject Confirmation Dialog */}
                <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to reject this application?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will reject {prospectiveTenant.user_name}'s application for {rentalUnit.address} {rentalUnit.unit_number}. This
                                action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    onApplicationAction(application.id, 'rejected', reviewNotes);
                                    setShowRejectDialog(false);
                                    onClose();
                                }}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Application
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DialogContent>
        </Dialog>
    );
};

export default ApplicationModal;
