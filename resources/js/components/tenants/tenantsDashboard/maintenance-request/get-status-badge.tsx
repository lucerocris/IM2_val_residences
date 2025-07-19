import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface getStatusBadgeProps {
    status: "pending" | "in_progress" | "completed" | "cancelled" | string;
}

const GetStatusBadge = ({ status }:getStatusBadgeProps) => {
    switch(status) {
        case "pending":
            return(
                <Badge variant = "secondary" className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Clock className = "size-3 mr-1" />
                    Pending
                </Badge>
            )
        
        case "in_progress":
            return(
                <Badge variant = "secondary" className = "bg-blue-100 text-blue-800 hover:text-blue-100">
                    <AlertCircle className = "size-3 mr-1"/>
                    In Progress
                </Badge>
            )
        
        case "completed":
            return(
                <Badge variant = "secondary" className = "bg-green-100 text-green-800 hover:text-green-100">
                    <CheckCircle className = "size-3 mr-1" />
                    Completed
                </Badge>
            )
        
        case "cancelled":
            return(
                <Badge variant = "secondary" className = "bg-gray-100 text-gray-800 hover:text-gray-100">
                    <XCircle className = "size-3 mr-1" />
                    Cancelled
                </Badge>
            )
    }
}

export default GetStatusBadge;