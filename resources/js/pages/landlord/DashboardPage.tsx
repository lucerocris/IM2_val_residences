import DashboardCardContent from '@/components/landlord/dashboard/ui/DashboardCardContent';
import DashboardCardHeader from '@/components/landlord/dashboard/ui/DashboardCardHeader';
import QuickActionsButtons from '@/components/landlord/dashboard/ui/QuickActionsButtons';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import MetricGrid from '@/components/landlord/ui/MetricGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandlordLayout from '@/layout/LandlordLayout';
import { Link } from '@inertiajs/react';
import { AlertCircle, Building2, Calendar, DollarSign, Eye, FileText, Plus, TrendingUp, Users, Wrench } from 'lucide-react';

type MaintenanceRequest = {
    id: number;
    unit_number: string;
    request_status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority_level: string;
    maintenance_description: string;
    request_date: string;
};

type RecentActivities = {
    id: number;
    type: string;
    description: string;
    time: string;
    tenant?: string;
    amount?: number;
    applicant?: string;
};

type UpcomingExpirations = {
    id: number;
    unit: string;
    tenant: string;
    endDate: string;
    daysLeft: number;
};

const upcomingExpirations: UpcomingExpirations[] = [
    { id: 1, unit: 'Unit 7A', tenant: 'Mike Wilson', endDate: '2024-02-15', daysLeft: 18 },
    { id: 2, unit: 'Unit 12C', tenant: 'Lisa Brown', endDate: '2024-02-28', daysLeft: 31 },
    { id: 3, unit: 'Unit 4B', tenant: 'David Lee', endDate: '2024-03-10', daysLeft: 41 },
    { id: 4, unit: 'Unit 9A', tenant: 'Emma Davis', endDate: '2024-03-22', daysLeft: 53 },
];

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'urgent':
            return 'bg-red-500';
        case 'high':
            return 'bg-orange-500';
        case 'medium':
            return 'bg-yellow-500';
        case 'low':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

interface DashboardPageProps {
    numberOfUnits: number;
    numberOfOccupiedUnits: number;
    numberOfAvailableUnits: number;
    paidRentalBillsThisMonth: number;
    numberOfMaintenanceRequest: number;
    maintenanceRequests: MaintenanceRequest[];
}

const DashboardPage = ({
    numberOfUnits,
    numberOfAvailableUnits,
    numberOfOccupiedUnits,
    paidRentalBillsThisMonth,
    numberOfMaintenanceRequest,
    maintenanceRequests,
}: DashboardPageProps) => {
    const metricData = [
        {
            title: 'Total Units',
            metric: numberOfUnits,
            metricDescription: `${numberOfOccupiedUnits} occupied, ${numberOfAvailableUnits} available`,
            icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Monthly Revenue',
            metric: paidRentalBillsThisMonth,
            metricDescription: (
                <p className="mt-1 flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +8.2% from last month
                </p>
            ),
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
        },

        {
            title: 'Pending Requests',
            metric: numberOfMaintenanceRequest,
            metricDescription: 'Maintenance requests',
            icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
        },
    ];

    return (
        <>
            <LandlordLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <LandlordPageHeader
                        title={'Dashboard'}
                        subtitle={'Overview of your rental properties and operations'}
                        actions={
                            <Button size="sm" asChild>
                                <Link href="/landlord/properties/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Property
                                </Link>
                            </Button>
                        }
                    />

                    {/* Key Metrics */}
                    <div className="flex w-full gap-5">
                        <MetricGrid metrics={metricData} className={'grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1'} />
                        {/* Recent Activities */}
                        <div className="flex-1">
                            <Card>
                                <DashboardCardHeader
                                    icon={<Calendar className="h-5 w-5" />}
                                    cardTitle={'Quick Actions'}
                                    cardDescription={'Latest updates across your properties'}
                                />
                                <div className="grid grid-cols-2 gap-4 px-4 pt-4 md:grid-cols-4 lg:grid-cols-2">
                                    <QuickActionsButtons icon={<Plus className="h-5 w-5" />} buttonTitle={'Add Unit'} />
                                    <QuickActionsButtons icon={<Users className="h-5 w-5" />} buttonTitle={'New Tenant'} />
                                    <QuickActionsButtons icon={<FileText className="h-5 w-5" />} buttonTitle={'Create Lease'} />
                                    <QuickActionsButtons icon={<DollarSign className="h-5 w-5" />} buttonTitle={'Record Payment'} />
                                    <QuickActionsButtons icon={<Wrench className="h-5 w-5" />} buttonTitle={'Maintenance'} />
                                    <QuickActionsButtons icon={<Eye className="h-5 w-5" />} buttonTitle={'View Reports'} />
                                </div>
                                <DashboardCardContent
                                    items={[]}
                                    getKey={(activity) => activity.id}
                                    renderItems={(activity: RecentActivities) => (
                                        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                                            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{activity.description}</p>
                                                <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Upcoming Lease Expirations */}
                        <Card>
                            <DashboardCardHeader
                                icon={<Calendar className="h-5 w-5" />}
                                cardTitle={'Upcoming Lease Expirations'}
                                cardDescription={'Leases expiring in the next 60 days'}
                            />
                            <DashboardCardContent
                                items={upcomingExpirations}
                                renderItems={(lease: UpcomingExpirations) => (
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">{lease.unit}</p>
                                            <p className="text-sm text-gray-600">{lease.tenant}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant={lease.daysLeft <= 30 ? 'destructive' : 'secondary'}>{lease.daysLeft} days</Badge>
                                            <p className="mt-1 text-xs text-gray-500">{lease.endDate}</p>
                                        </div>
                                    </div>
                                )}
                                getKey={(lease) => lease.id}
                            />
                        </Card>

                        {/* Maintenance Requests */}
                        <Card>
                            <DashboardCardHeader
                                icon={<Wrench className="h-5 w-5" />}
                                cardTitle={'Maintenance Requests'}
                                cardDescription={'Current maintenance and repair requests'}
                            />
                            <DashboardCardContent
                                items={maintenanceRequests}
                                renderItems={(request: MaintenanceRequest) => (
                                    <div key={request.id} className="flex items-start gap-3 rounded-lg border p-3">
                                        <div className={`mt-1 h-3 w-3 rounded-full ${getPriorityColor(request.priority_level)}`}></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">{request.unit_number}</p>
                                                <Badge className={getStatusColor(request.request_status)}>
                                                    {request.request_status.replace('_', ' ').charAt(0).toUpperCase() +
                                                        request.request_status.replace('_', ' ').slice(1)}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">{request.maintenance_description}</p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Priority: {request.priority_level} • {request.request_date}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                getKey={(request) => request.id}
                            />
                        </Card>
                    </div>
                </div>
            </LandlordLayout>
        </>
    );
};

export default DashboardPage;
