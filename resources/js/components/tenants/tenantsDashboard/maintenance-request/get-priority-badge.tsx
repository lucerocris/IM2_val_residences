import { Badge } from "@/components/ui/badge"

interface priorityBadgeInterface {
    priority: "urgent" | "high" | "medium" | "low" | string;
}

const GetPriorityBadge = ({ priority }:priorityBadgeInterface) => {
    switch(priority) {
        case "urgent":
            return(
                <Badge variant = "destructive" className = "text-xs">
                    Urgent
                </Badge>
            )

        case "high":
            return(
                <Badge variant = "secondary" className = "bg-red-100 text-red-800 hover:text-red-100 text-xs">
                    High
                </Badge>
            )
        
        case "medium":
            return(
                <Badge variant = "secondary" className = "bg-orange-100 text-orange-800 hover:text-orange-100 text-xs">
                    Medium
                </Badge>
            )

        case "low":
            return(
                <Badge variant = "secondary" className = "bg-green-100 text-green-800 hover:text-green-100 text-xs">
                    Low
                </Badge>
            )

        default:
            return(
                <Badge variant = "outline" className = "text-xs">
                    {priority}
                </Badge>
            )
    }
}

export default GetPriorityBadge;