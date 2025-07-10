import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, CheckCircle, Clock, DollarSign, Home, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RentalApplication } from '@/types/application.types';

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                </Badge>
            );
        case 'approved':
            return (
                <Badge variant="outline" className="border-green-600 text-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Approved
                </Badge>
            );
        case 'rejected':
            return (
                <Badge variant="outline" className="border-red-600 text-red-600">
                    <XCircle className="mr-1 h-3 w-3" />
                    Rejected
                </Badge>
            );
        case 'withdrawn':
            return (
                <Badge variant="outline" className="border-gray-600 text-gray-600">
                    <XCircle className="mr-1 h-3 w-3" />
                    Withdrawn
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

interface ApplicationCardProps {
    application: RentalApplication;
    onViewDetails: (application: RentalApplication) => void;
}

const ApplicationCard = ({ application, onViewDetails }: ApplicationCardProps) => {
    // Add null checks for the relationships
    if (!application.prospective_tenant || !application.rental_unit) {
        return (
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>N/A</AvatarFallback>
                                </Avatar>
                                Data not available
                            </CardTitle>
                            <CardDescription>This application data is no longer available</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">{getStatusBadge(application.application_status)}</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Application #{application.id} - {application.application_status}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    {application.prospective_tenant.user_name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            {application.prospective_tenant.user_name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                {application.rental_unit.address} {application.rental_unit.unit_number}
                            </span>
                            <span className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                Applied: {application.application_date ? new Date(application.application_date).toLocaleDateString() : 'N/A'}
                            </span>
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge(application.application_status)}
                        <Button variant="outline" size="sm" onClick={() => onViewDetails(application)}>
                            View Details
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Income: ${application.prospective_tenant.monthly_income.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span>Rent: ${application.rental_unit.rent_price.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Move-in: {new Date(application.preferred_move_in_date).toLocaleDateString()}</span>
                    </div>
                </div>
                {application.additional_notes && (
                    <div className="mt-3 border-t pt-3">
                        <p className="line-clamp-2 text-sm text-muted-foreground">{application.additional_notes}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ApplicationCard;
