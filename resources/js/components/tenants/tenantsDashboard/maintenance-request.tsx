import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Calendar, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"
import GetStatusBadge from "./maintenance-request/get-status-badge"
import GetPriorityBadge from "./maintenance-request/get-priority-badge"

interface MaintenanceRequest {
    id: number
    maintenance_description: string
    request_status: "pending" | "in_progress" | "completed" | "cancelled"
    priority_level: "low" | "medium" | "high" | "urgent"
    request_date: string
    completion_date?: string
    tenant_remarks?: string
    landlord_notes?: string
}

interface MaintenanceRequestComponentProps {
    maintenanceRequests: MaintenanceRequest[]
}

const MaintenanceRequestComponent = ({ maintenanceRequests }: MaintenanceRequestComponentProps) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    if (!maintenanceRequests || maintenanceRequests.length === 0) {
        return (
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Wrench className="w-5 h-5 text-orange-600" />
                        Maintenance Requests
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-4">
                            <Wrench className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests yet</h3>
                        <p className="text-gray-500 text-sm">When you submit maintenance requests, they'll appear here.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Wrench className="w-5 h-5 text-orange-600" />
                    Maintenance Requests
                    <Badge variant="secondary" className="ml-auto">
                        {maintenanceRequests.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                        <div key={request.id} className="p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow">
                            <div className="space-y-3">
                                {/* Header with status and priority */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 line-clamp-2">{request.maintenance_description}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">Requested on {formatDate(request.request_date)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 ml-4">
                                        <GetStatusBadge status = {request.request_status} />
                                        <GetPriorityBadge priority = {request.priority_level} />
                                    </div>
                                </div>

                                {/* Additional information */}
                                {request.completion_date && (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Completed on {formatDate(request.completion_date)}</span>
                                    </div>
                                )}

                                {request.landlord_notes && (
                                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                                        <p className="text-sm font-medium text-blue-900 mb-1">Landlord Notes:</p>
                                        <p className="text-sm text-blue-800">{request.landlord_notes}</p>
                                    </div>
                                )}

                                {request.tenant_remarks && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Your Notes:</p>
                                        <p className="text-sm text-gray-600">{request.tenant_remarks}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default MaintenanceRequestComponent
