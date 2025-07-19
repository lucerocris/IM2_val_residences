import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

const NoMaintenanceRequest = () => {
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

export default NoMaintenanceRequest;