import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MaintenanceRequest } from '@/types/tenantDashboard.types';

interface MaintenanceRequestProps {
    maintenanceRequests: MaintenanceRequest[];
}

const MaintenanceRequestComponent = ({ maintenanceRequests }: MaintenanceRequestProps) => {

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
            in_progress: { color: "bg-blue-100 text-blue-800", icon: Clock },
            completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
            cancelled: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
        }

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
        const Icon = config.icon

        return (
            <Badge className={`${config.color} flex items-center gap-1`}>
                <Icon className="w-3 h-3" />
                {status.replace("_", " ").toUpperCase()}
            </Badge>
        )
    }

    const getPriorityBadge = (priority: string) => {
        const priorityConfig = {
            low: "bg-gray-100 text-gray-800",
            medium: "bg-yellow-100 text-yellow-800",
            high: "bg-orange-100 text-orange-800",
            urgent: "bg-red-100 text-red-800",
        }

        return (
            <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>
                {priority.toUpperCase()}
            </Badge>
        )
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5"/>
                    Maintenance Requests
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {maintenanceRequests.length > 0 ? (
                        maintenanceRequests.map((request) => (
                            <div key={request.id} className="border rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-2">{request.maintenance_description}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {getStatusBadge(request.request_status)}
                                            {getPriorityBadge(request.priority_level)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Requested:</span> {new Date(request.request_date).toLocaleDateString()}
                                    </div>
                                    {request.scheduled_date && (
                                        <div>
                                            <span className="font-medium">Scheduled:</span> {new Date(request.scheduled_date).toLocaleDateString()}
                                        </div>
                                    )}
                                    {request.completion_date && (
                                        <div>
                                            <span className="font-medium">Completed:</span> {new Date(request.completion_date).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No maintenance requests yet</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default MaintenanceRequestComponent;
