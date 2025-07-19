import { CheckCircle } from "lucide-react";

interface additionalInfoProps {
    date?: string;
    notes?: string;
    remarks?: string;
}

export const CompletionDate = ({ date }:additionalInfoProps) => {
    return(
        <div className = "flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className = "size-4" />
            <span>Completed on {date}</span>
        </div>
    )
}

export const LandlordNotes = ({ notes }:additionalInfoProps) => {
    return(
        <div className = "bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className = "text-sm font-medium text-blue-900 mb-1">Landlord Notes:</p>
            <p className = "text-sm text-blue-800">{notes}</p>
        </div>
    )
}

export const TenantRemarks = ({ remarks }:additionalInfoProps) => {
    return(
        <div className = "bg-gray-50 p-3 rounded-md">
            <p className = "text-sm font-medium text-gray-900 mb-1">Your Notes:</p>
            <p className = "text-sm text-gray-600">{remarks}</p>
        </div>
    )
}