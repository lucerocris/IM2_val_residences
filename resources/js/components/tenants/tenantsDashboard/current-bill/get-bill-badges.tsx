import { Badge } from "@/components/ui/badge";

interface GetBillStatusProps {
    status: "paid" | "pending" | "overdue" | "partial" | string;
}

export const GetBillStatus = ({ status }:GetBillStatusProps) => {
    switch(status) {
        case "paid":
            return(
                <Badge variant = "secondary" className = "bg-green-100 text-green-800 hover:text-green-100">
                    Paid
                </Badge>
            )

        case "pending":
            return(
                <Badge variant = "secondary" className = "bg-yellow-100 text-yellow-800 hover:text-yellow-100">
                    Pending
                </Badge>
            )
        
        case "overdue":
            return(
                <Badge variant = "destructive">
                    Overdue
                </Badge>
            )
        
        case "partial":
            return(
                <Badge variant = "secondary" className = "bg-blue-100 text-blue-800 hover:text-blue-100">
                    Partial
                </Badge>
            )
        
        default:
            return <Badge variant = "outline">{status}</Badge>
    }
}