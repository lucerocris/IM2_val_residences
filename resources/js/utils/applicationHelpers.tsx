import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const getAvailabilityBadge = (status: string) => {
    switch (status) {
        case 'available':
            return (
                <Badge variant="outline" className="border-green-600 text-green-600">
            Available
            </Badge>
        );
        case 'occupied':
            return (
                <Badge variant="outline" className="border-blue-600 text-blue-600">
            Occupied
            </Badge>
        );
        case 'maintenance':
            return (
                <Badge variant="outline" className="border-orange-600 text-orange-600">
            Maintenance
            </Badge>
        );
        case 'unavailable':
            return (
                <Badge variant="outline" className="border-red-600 text-red-600">
            Unavailable
            </Badge>
        );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};



export const getStatusBadge = (status: string) => {
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
