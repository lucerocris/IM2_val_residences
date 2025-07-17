'use client';

import { Head, router } from '@inertiajs/react';
import LandlordLayout from '@/layout/LandlordLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Eye, FileText, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Tenant {
    id: number;
    user_name: string;
    email: string;
    user_contact_number: string;
}

interface Unit {
    id: number;
    address: string;
    unit_number: string;
    landlord_id: number;
}

interface DocumentPaths {
    signed_lease: string | null;
    id_document: string | null;
    payment_proof: string | null;
}

interface PendingReview {
    id: number;
    tenant: Tenant;
    unit: Unit;
    monthly_rent: number;
    deposit_amount: number;
    documents_submitted_at: string;
    onboarding_fees_amount: number;
    document_paths: DocumentPaths;
}

interface Props {
    pendingReviews: PendingReview[];
}

export default function DocumentReviewPage({ pendingReviews }: Props) {
    const handleViewDetails = (leaseId: number) => {
        router.get(route('landlord.document-review.show', leaseId));
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    };

    const getDocumentCount = (documentPaths: DocumentPaths) => {
        return Object.values(documentPaths).filter((path) => path !== null).length;
    };

    return (
        <LandlordLayout>
            <Head title="Document Review" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Document Review</h1>
                        <p className="text-gray-600 mt-1">Review and approve tenant document submissions</p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {pendingReviews.length} Pending Review{pendingReviews.length !== 1 ? 's' : ''}
                    </Badge>
                </div>

                {/* Pending Reviews */}
                {pendingReviews.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FileText className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reviews</h3>
                            <p className="text-gray-600 text-center max-w-md">
                                All tenant document submissions have been reviewed. New submissions will appear here.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {pendingReviews.map((review) => (
                            <Card key={review.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                                    {getInitials(review.tenant.user_name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-lg">{review.tenant.user_name}</CardTitle>
                                                <p className="text-sm text-gray-600">{review.tenant.email}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline"
                                               className="text-yellow-700 border-yellow-300 bg-yellow-50">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Pending Review
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Property Info */}
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{review.unit.address}</span>
                                            {review.unit.unit_number && (
                                                <span className="text-gray-400">• Unit {review.unit.unit_number}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financial Info */}
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 px-4 bg-gray-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Monthly Rent</div>
                                            <div
                                                className="font-semibold text-gray-900">{formatCurrency(Number(review.monthly_rent))}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Security Deposit</div>
                                            <div
                                                className="font-semibold text-gray-900">{formatCurrency(Number(review.deposit_amount))}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Onboarding Fees</div>
                                            <div
                                                className="font-semibold text-gray-900">{formatCurrency(Number(review.onboarding_fees_amount))
                                            }</div>
                                        </div>
                                    </div>

                                    {/* Document Info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <FileText className="h-4 w-4" />
                                            <span>{getDocumentCount(review.document_paths)} documents submitted</span>
                                            <span className="text-gray-400">•</span>
                                            <span>{formatDistanceToNow(new Date(review.documents_submitted_at), { addSuffix: true })}</span>
                                        </div>

                                        <Button onClick={() => handleViewDetails(review.id)}
                                                className="flex items-center space-x-2">
                                            <Eye className="h-4 w-4" />
                                            <span>Review Documents</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </LandlordLayout>
    );
}
