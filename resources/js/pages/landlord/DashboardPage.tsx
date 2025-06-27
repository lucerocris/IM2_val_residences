import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandlordLayout from '@/layout/LandlordLayout';
import { AlertCircle, Building2, Calendar, DollarSign, Eye, FileText, Plus, TrendingUp, Users, Wrench } from 'lucide-react';

const mockData = {
    metrics: {
        totalUnits: 24,
        occupiedUnits: 18,
        availableUnits: 6,
        monthlyRevenue: 20000,
        occupancyRate: 75,
    },
    recentActivities: [
        {
            id: 1,
            type: 'lease_signed',
            description: 'New lease signed for Unit 12A',
            time: '2 hours ago',
            tenant: 'John Smith',
        },
        {
            id: 2,
            type: 'payment_received',
            description: 'Rent payment received from Unit 8B',
            time: '4 hours ago',
            amount: 1800,
        },
        {
            id: 3,
            type: 'maintenance_completed',
            description: 'Plumbing repair completed in Unit 5C',
            time: '1 day ago',
        },
        {
            id: 4,
            type: 'application_submitted',
            description: 'New rental application for Unit 15A',
            time: '2 days ago',
            applicant: 'Sarah Johnson',
        },
        { id: 5, type: 'lease_renewal', description: 'Lease renewal signed for Unit 3B', time: '3 days ago' },
    ],
    upcomingExpirations: [
        { id: 1, unit: 'Unit 7A', tenant: 'Mike Wilson', endDate: '2024-02-15', daysLeft: 18 },
        { id: 2, unit: 'Unit 12C', tenant: 'Lisa Brown', endDate: '2024-02-28', daysLeft: 31 },
        { id: 3, unit: 'Unit 4B', tenant: 'David Lee', endDate: '2024-03-10', daysLeft: 41 },
        { id: 4, unit: 'Unit 9A', tenant: 'Emma Davis', endDate: '2024-03-22', daysLeft: 53 },
    ],
    maintenanceRequests: [
        {
            id: 1,
            unit: 'Unit 6B',
            issue: 'Leaky faucet in kitchen',
            priority: 'medium',
            status: 'pending',
            requestDate: '2024-01-25',
        },
        {
            id: 2,
            unit: 'Unit 11A',
            issue: 'Heating system not working',
            priority: 'high',
            status: 'in_progress',
            requestDate: '2024-01-24',
        },
        {
            id: 3,
            unit: 'Unit 2C',
            issue: 'Broken window lock',
            priority: 'low',
            status: 'pending',
            requestDate: '2024-01-23',
        },
        {
            id: 4,
            unit: 'Unit 14B',
            issue: 'Electrical outlet not working',
            priority: 'urgent',
            status: 'pending',
            requestDate: '2024-01-26',
        },
    ],
    financialData: {
        monthlyRevenue: [38000, 42000, 45600, 44200, 46800, 45600],
        months: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    },
};

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
const DashboardPage = () => {
    return (
        <>
            <LandlordLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="mt-1 text-gray-600">Overview of your rental properties and operations</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Reports
                            </Button>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Unit
                            </Button>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="flex w-full gap-5">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 flex-1">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{mockData.metrics.totalUnits}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {mockData.metrics.occupiedUnits} occupied, {mockData.metrics.availableUnits} available
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₱{mockData.metrics.monthlyRevenue.toLocaleString()}</div>
                                    <p className="mt-1 flex items-center text-xs text-green-600">
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                        +8.2% from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {mockData.maintenanceRequests.filter((req) => req.status === 'pending').length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Maintenance requests</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activities */}
                        <div className="flex-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Recent Activities
                                    </CardTitle>
                                    <CardDescription>Latest updates across your properties</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockData.recentActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                                                <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{activity.description}</p>
                                                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Upcoming Lease Expirations */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Upcoming Lease Expirations
                                </CardTitle>
                                <CardDescription>Leases expiring in the next 60 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.upcomingExpirations.map((lease) => (
                                        <div key={lease.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <p className="font-medium">{lease.unit}</p>
                                                <p className="text-sm text-gray-600">{lease.tenant}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={lease.daysLeft <= 30 ? 'destructive' : 'secondary'}>{lease.daysLeft} days</Badge>
                                                <p className="mt-1 text-xs text-gray-500">{lease.endDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Maintenance Requests */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wrench className="h-5 w-5" />
                                    Maintenance Requests
                                </CardTitle>
                                <CardDescription>Current maintenance and repair requests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.maintenanceRequests.map((request) => (
                                        <div key={request.id} className="flex items-start gap-3 rounded-lg border p-3">
                                            <div className={`mt-1 h-3 w-3 rounded-full ${getPriorityColor(request.priority)}`}></div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{request.unit}</p>
                                                    <Badge className={getStatusColor(request.status)}>{request.status.replace('_', ' ')}</Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">{request.issue}</p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Priority: {request.priority} • {request.requestDate}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <Plus className="h-5 w-5" />
                                    <span className="text-xs">Add Unit</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <Users className="h-5 w-5" />
                                    <span className="text-xs">New Tenant</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <FileText className="h-5 w-5" />
                                    <span className="text-xs">Create Lease</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <DollarSign className="h-5 w-5" />
                                    <span className="text-xs">Record Payment</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <Wrench className="h-5 w-5" />
                                    <span className="text-xs">Maintenance</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                                    <Eye className="h-5 w-5" />
                                    <span className="text-xs">View Reports</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </LandlordLayout>
        </>
    );
};

export default DashboardPage;
