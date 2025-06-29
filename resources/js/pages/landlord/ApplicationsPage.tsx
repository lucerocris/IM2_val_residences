
import MetricCard from '@/components/landlord/ui/MetricCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import LandlordLayout from '@/layout/LandlordLayout';
import {
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
    TrendingUp,
    User,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface RentalApplication {
    id: string;
    prospective_tenant_id: string;
    unit_id: string;
    application_date: string | null;
    preferred_move_in_date: string;
    application_status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
    additional_notes: string;
    reviewed_date: string | null;
    review_notes: string | null;
    created_at: string;
    updated_at: string;
    prospective_tenant: {
        id: string;
        user_name: string;
        email: string;
        user_contact_number: string;
        monthly_income: number;
        current_address: string;
        employment_status: string;
    };
    unit: {
        id: string;
        address: string;
        unit_number: string;
        property_type: 'duplex' | 'triplex';
        rent_price: number;
        availability_status: 'available' | 'occupied' | 'maintenance' | 'unavailable';
        landlord: {
            id: string;
            user_name: string;
        };
    };
}

// Mock data based on the provided interface
const mockApplications: RentalApplication[] = [
    {
        id: '1',
        prospective_tenant_id: 'pt1',
        unit_id: 'u1',
        application_date: '2024-06-15',
        preferred_move_in_date: '2024-07-01',
        application_status: 'pending',
        additional_notes: 'Looking for a quiet place to work from home',
        reviewed_date: null,
        review_notes: null,
        created_at: '2024-06-15T09:30:00Z',
        updated_at: '2024-06-15T09:30:00Z',
        prospective_tenant: {
            id: 'pt1',
            user_name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            user_contact_number: '+1234567890',
            monthly_income: 4500.0,
            current_address: '789 Current St, City A',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u1',
            address: '123 Main Street',
            unit_number: 'A',
            property_type: 'duplex',
            rent_price: 1200.0,
            availability_status: 'available',
            landlord: {
                id: 'l1',
                user_name: 'Jane Smith',
            },
        },
    },
    {
        id: '2',
        prospective_tenant_id: 'pt2',
        unit_id: 'u2',
        application_date: '2024-06-10',
        preferred_move_in_date: '2024-06-25',
        application_status: 'approved',
        additional_notes: 'Excellent credit score and references',
        reviewed_date: '2024-06-12',
        review_notes: 'Strong application, approved for lease',
        created_at: '2024-06-10T14:15:00Z',
        updated_at: '2024-06-12T16:30:00Z',
        prospective_tenant: {
            id: 'pt2',
            user_name: 'Bob Wilson',
            email: 'bob.wilson@example.com',
            user_contact_number: '+1234567891',
            monthly_income: 5200.0,
            current_address: '456 Previous Ave, City B',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u2',
            address: '456 Oak Avenue',
            unit_number: 'B',
            property_type: 'duplex',
            rent_price: 1500.0,
            availability_status: 'occupied',
            landlord: {
                id: 'l1',
                user_name: 'Jane Smith',
            },
        },
    },
    {
        id: '3',
        prospective_tenant_id: 'pt3',
        unit_id: 'u3',
        application_date: '2024-06-20',
        preferred_move_in_date: '2024-07-15',
        application_status: 'rejected',
        additional_notes: 'First-time renter, eager to learn',
        reviewed_date: '2024-06-22',
        review_notes: 'Insufficient income documentation',
        created_at: '2024-06-20T11:45:00Z',
        updated_at: '2024-06-22T10:20:00Z',
        prospective_tenant: {
            id: 'pt3',
            user_name: 'Carol Davis',
            email: 'carol.davis@example.com',
            user_contact_number: '+1234567892',
            monthly_income: 2800.0,
            current_address: '321 Old Road, City C',
            employment_status: 'Part-time',
        },
        unit: {
            id: 'u3',
            address: '789 Pine Boulevard',
            unit_number: 'C',
            property_type: 'triplex',
            rent_price: 1800.0,
            availability_status: 'available',
            landlord: {
                id: 'l2',
                user_name: 'Robert Wilson',
            },
        },
    },
    {
        id: '4',
        prospective_tenant_id: 'pt4',
        unit_id: 'u4',
        application_date: '2024-06-18',
        preferred_move_in_date: '2024-07-01',
        application_status: 'pending',
        additional_notes: 'Professional couple, no pets',
        reviewed_date: null,
        review_notes: null,
        created_at: '2024-06-18T13:20:00Z',
        updated_at: '2024-06-18T13:20:00Z',
        prospective_tenant: {
            id: 'pt4',
            user_name: 'David Martinez',
            email: 'david.martinez@example.com',
            user_contact_number: '+1234567893',
            monthly_income: 6500.0,
            current_address: '654 Living St, City D',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u4',
            address: '321 Cedar Lane',
            unit_number: 'D',
            property_type: 'duplex',
            rent_price: 1100.0,
            availability_status: 'available',
            landlord: {
                id: 'l1',
                user_name: 'Jane Smith',
            },
        },
    },
    {
        id: '5',
        prospective_tenant_id: 'pt5',
        unit_id: 'u5',
        application_date: '2024-06-25',
        preferred_move_in_date: '2024-08-01',
        application_status: 'withdrawn',
        additional_notes: 'Looking for pet-friendly unit',
        reviewed_date: null,
        review_notes: null,
        created_at: '2024-06-25T10:00:00Z',
        updated_at: '2024-06-26T09:15:00Z',
        prospective_tenant: {
            id: 'pt5',
            user_name: 'Emma Thompson',
            email: 'emma.thompson@example.com',
            user_contact_number: '+1234567894',
            monthly_income: 4200.0,
            current_address: '987 Present Blvd, City E',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u5',
            address: '654 Maple Drive',
            unit_number: 'E',
            property_type: 'triplex',
            rent_price: 1350.0,
            availability_status: 'available',
            landlord: {
                id: 'l2',
                user_name: 'Robert Wilson',
            },
        },
    },
    {
        id: '6',
        prospective_tenant_id: 'pt6',
        unit_id: 'u6',
        application_date: '2024-06-28',
        preferred_move_in_date: '2024-07-20',
        application_status: 'pending',
        additional_notes: 'Recent graduate, starting new job',
        reviewed_date: null,
        review_notes: null,
        created_at: '2024-06-28T15:45:00Z',
        updated_at: '2024-06-28T15:45:00Z',
        prospective_tenant: {
            id: 'pt6',
            user_name: 'Frank Rodriguez',
            email: 'frank.rodriguez@example.com',
            user_contact_number: '+1234567895',
            monthly_income: 3800.0,
            current_address: '159 Student Ave, City F',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u6',
            address: '987 Elm Street',
            unit_number: 'F',
            property_type: 'duplex',
            rent_price: 1000.0,
            availability_status: 'available',
            landlord: {
                id: 'l3',
                user_name: 'Maria Garcia',
            },
        },
    },
    {
        id: '7',
        prospective_tenant_id: 'pt7',
        unit_id: 'u7',
        application_date: '2024-06-05',
        preferred_move_in_date: '2024-06-30',
        application_status: 'approved',
        additional_notes: 'Excellent references from previous landlord',
        reviewed_date: '2024-06-07',
        review_notes: 'Background check passed, income verified',
        created_at: '2024-06-05T12:30:00Z',
        updated_at: '2024-06-07T14:45:00Z',
        prospective_tenant: {
            id: 'pt7',
            user_name: 'Grace Lee',
            email: 'grace.lee@example.com',
            user_contact_number: '+1234567896',
            monthly_income: 5800.0,
            current_address: '753 Former St, City G',
            employment_status: 'Full-time',
        },
        unit: {
            id: 'u7',
            address: '159 Birch Road',
            unit_number: 'G',
            property_type: 'triplex',
            rent_price: 1250.0,
            availability_status: 'occupied',
            landlord: {
                id: 'l1',
                user_name: 'Jane Smith',
            },
        },
    },
    {
        id: '8',
        prospective_tenant_id: 'pt8',
        unit_id: 'u8',
        application_date: '2024-06-12',
        preferred_move_in_date: '2024-07-05',
        application_status: 'rejected',
        additional_notes: 'Looking for long-term rental',
        reviewed_date: '2024-06-14',
        review_notes: 'Credit score below requirements',
        created_at: '2024-06-12T16:20:00Z',
        updated_at: '2024-06-14T11:10:00Z',
        prospective_tenant: {
            id: 'pt8',
            user_name: 'Henry Kim',
            email: 'henry.kim@example.com',
            user_contact_number: '+1234567897',
            monthly_income: 3200.0,
            current_address: '852 Temp Lane, City H',
            employment_status: 'Contract',
        },
        unit: {
            id: 'u8',
            address: '753 Willow Avenue',
            unit_number: 'H',
            property_type: 'duplex',
            rent_price: 1650.0,
            availability_status: 'available',
            landlord: {
                id: 'l2',
                user_name: 'Robert Wilson',
            },
        },
    },
];

export default function TenantApplicationsPage() {
    const [applications, setApplications] = useState<RentalApplication[]>(mockApplications);
    const [selectedApplication, setSelectedApplication] = useState<RentalApplication | null>(null);
    const [reviewNotes, setReviewNotes] = useState('');
    const [messageText, setMessageText] = useState('');
    const [activeTab, setActiveTab] = useState('pending');

    const handleApplicationAction = (applicationId: string, action: 'approved' | 'rejected', notes: string) => {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === applicationId
                    ? {
                          ...app,
                          application_status: action,
                          reviewed_date: new Date().toISOString().split('T')[0],
                          review_notes: notes,
                          updated_at: new Date().toISOString(),
                      }
                    : app,
            ),
        );
        setSelectedApplication(null);
        setReviewNotes('');
    };

    const sendMessage = (applicationId: string, message: string) => {
        // In a real app, this would send a message to the prospective tenant
        console.log(`Sending message to application ${applicationId}: ${message}`);
        setMessageText('');
    };

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

    const getAvailabilityBadge = (status: string) => {
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

    const filteredApplications = applications.filter((app) => {
        if (activeTab === 'all') return true;
        return app.application_status === activeTab;
    });

    const totalApplications = applications.length;
    const pendingApplications = applications.filter((app) => app.application_status === 'pending').length;
    const approvedApplications = applications.filter((app) => app.application_status === 'approved').length;
    const rejectedApplications = applications.filter((app) => app.application_status === 'rejected').length;

    const needingReview = applications.filter((app) => app.application_status === 'pending' && !app.reviewed_date).length;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentApplications: number = applications
        .filter((app: RentalApplication) => app.application_date !== null)
        .filter((app: RentalApplication) => new Date(app.application_date!) >= sevenDaysAgo).length;

    return (
        <LandlordLayout>
            <div className="container mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                        <p className="mt-1 text-gray-600">Review and manage rental applications for your properties</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <MetricCard
                        className="flex-1"
                        title={'Total Applications'}
                        metric={totalApplications.toString()}
                        metricDescription={`${pendingApplications} pending, ${approvedApplications} approved, ${rejectedApplications} rejected`}
                        Icon={<FileText className="h-4 w-4 text-muted-foreground" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title={'Pending Review'}
                        metric={pendingApplications.toString()}
                        metricDescription={`${needingReview} awaiting initial review`}
                        Icon={<Clock className="h-4 w-4 text-orange-600" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title={'Approved'}
                        metric={approvedApplications.toString()}
                        metricDescription={'Ready for lease agreements'}
                        Icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                    />

                    <MetricCard
                        className="flex-1"
                        title={'Recent (7 days)'}
                        metric={recentApplications.toString()}
                        metricDescription={`${Math.round((recentApplications / totalApplications) * 100)}% of total applications`}
                        Icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                    />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                            filteredApplications.map((application) => (
                                <Card key={application.id} className="transition-shadow hover:shadow-md">
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
                                                        {application.unit.address} {application.unit.unit_number}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CalendarDays className="h-4 w-4" />
                                                        Applied:{' '}
                                                        {application.application_date
                                                            ? new Date(application.application_date).toLocaleDateString()
                                                            : 'N/A'}
                                                    </span>
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(application.application_status)}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2">
                                                                <Avatar>
                                                                    <AvatarFallback>
                                                                        {application.prospective_tenant.user_name
                                                                            .split(' ')
                                                                            .map((n) => n[0])
                                                                            .join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                Application from {application.prospective_tenant.user_name}
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Application for {application.unit.address} {application.unit.unit_number} | ID:{' '}
                                                                {application.id}
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                            {/* Applicant Information */}
                                                            <div className="space-y-4">
                                                                <h3 className="text-lg font-semibold">Applicant Information</h3>
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Name:</span>
                                                                        <span>{application.prospective_tenant.user_name}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Email:</span>
                                                                        <span>{application.prospective_tenant.email}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Phone:</span>
                                                                        <span>{application.prospective_tenant.user_contact_number}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Monthly Income:</span>
                                                                        <span>${application.prospective_tenant.monthly_income.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Current Address:</span>
                                                                        <span>{application.prospective_tenant.current_address}</span>
                                                                    </div>
                                                                    <div className="flex items-start gap-2">
                                                                        <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Employment:</span>
                                                                        <span>{application.prospective_tenant.employment_status}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Property Information */}
                                                            <div className="space-y-4">
                                                                <h3 className="text-lg font-semibold">Property Information</h3>
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <Home className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Address:</span>
                                                                        <span>
                                                                            {application.unit.address} {application.unit.unit_number}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Monthly Rent:</span>
                                                                        <span>${application.unit.rent_price.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Home className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Property Type:</span>
                                                                        <span className="capitalize">{application.unit.property_type}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium">Availability:</span>
                                                                        {getAvailabilityBadge(application.unit.availability_status)}
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Preferred Move-in:</span>
                                                                        <span>
                                                                            {new Date(application.preferred_move_in_date).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="font-medium">Landlord:</span>
                                                                        <span>{application.unit.landlord.user_name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Application Details */}
                                                        <div className="space-y-4">
                                                            <Separator />
                                                            <h3 className="text-lg font-semibold">Application Details</h3>
                                                            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                                                <div>
                                                                    <span className="font-medium">Application ID:</span> {application.id}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">Created:</span>{' '}
                                                                    {new Date(application.created_at).toLocaleString()}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">Last Updated:</span>{' '}
                                                                    {new Date(application.updated_at).toLocaleString()}
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">Status:</span>{' '}
                                                                    {getStatusBadge(application.application_status)}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Application Notes */}
                                                        {application.additional_notes && (
                                                            <div className="space-y-2">
                                                                <h3 className="text-lg font-semibold">Additional Notes</h3>
                                                                <p className="rounded-md bg-muted p-3 text-sm">{application.additional_notes}</p>
                                                            </div>
                                                        )}

                                                        {/* Review Section */}
                                                        {application.application_status === 'pending' && (
                                                            <div className="space-y-4">
                                                                <Separator />
                                                                <h3 className="text-lg font-semibold">Review Application</h3>
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <Label htmlFor="review-notes">Review Notes</Label>
                                                                        <Textarea
                                                                            id="review-notes"
                                                                            placeholder="Add your review notes here..."
                                                                            value={reviewNotes}
                                                                            onChange={(e) => setReviewNotes(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleApplicationAction(application.id, 'approved', reviewNotes)
                                                                            }
                                                                            className="bg-green-600 hover:bg-green-700"
                                                                        >
                                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                                            Approve Application
                                                                        </Button>
                                                                        <Button
                                                                            variant="destructive"
                                                                            onClick={() =>
                                                                                handleApplicationAction(application.id, 'rejected', reviewNotes)
                                                                            }
                                                                        >
                                                                            <XCircle className="mr-2 h-4 w-4" />
                                                                            Reject Application
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Communication Section */}
                                                        <div className="space-y-4">
                                                            <Separator />
                                                            <h3 className="text-lg font-semibold">Communication</h3>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <Label htmlFor="message">Send Message to Applicant</Label>
                                                                    <Textarea
                                                                        id="message"
                                                                        placeholder="Type your message here..."
                                                                        value={messageText}
                                                                        onChange={(e) => setMessageText(e.target.value)}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    onClick={() => sendMessage(application.id, messageText)}
                                                                    disabled={!messageText.trim()}
                                                                >
                                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                                    Send Message
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {/* Review History */}
                                                        {application.review_notes && (
                                                            <div className="space-y-2">
                                                                <Separator />
                                                                <h3 className="text-lg font-semibold">Review History</h3>
                                                                <div className="rounded-md bg-muted p-3">
                                                                    <p className="text-sm font-medium">
                                                                        Reviewed on:{' '}
                                                                        {application.reviewed_date
                                                                            ? new Date(application.reviewed_date).toLocaleDateString()
                                                                            : 'N/A'}
                                                                    </p>
                                                                    <p className="mt-1 text-sm">{application.review_notes}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
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
                                                <span>Rent: ${application.unit.rent_price.toLocaleString()}/mo</span>
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
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </LandlordLayout>
    );
}
