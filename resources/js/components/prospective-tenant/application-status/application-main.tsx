import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Eye, X, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NoApplication from "./no-application";
import TitleCard from "./title-card";

interface RentalApplication {
  id: number
  unit: {
    id: number
    address: string
    unit_number?: string
    rent_price: number
    property_type: "duplex" | "triplex"
    floor_area?: number
  }
  application_date: string
  preferred_move_in_date?: string
  application_status: "pending" | "approved" | "rejected" | "withdrawn"
  additional_notes?: string
  reviewed_date?: string
  review_notes?: string
}

const mockApplications: RentalApplication[] = [
  {
    id: 1,
    unit: {
      id: 101,
      address: "123 Oak Street",
      unit_number: "A",
      rent_price: 1200,
      property_type: "duplex",
      floor_area: 850,
    },
    application_date: "2024-01-15",
    preferred_move_in_date: "2024-02-01",
    application_status: "pending",
    additional_notes: "Looking for a quiet place to work from home.",
  },
  {
    id: 2,
    unit: {
      id: 102,
      address: "456 Pine Avenue",
      unit_number: "B",
      rent_price: 1500,
      property_type: "triplex",
      floor_area: 1200,
    },
    application_date: "2024-01-10",
    preferred_move_in_date: "2024-01-25",
    application_status: "approved",
    reviewed_date: "2024-01-18",
    review_notes: "Excellent references and stable income. Approved for lease.",
  },
  {
    id: 3,
    unit: {
      id: 103,
      address: "789 Maple Drive",
      rent_price: 1000,
      property_type: "duplex",
      floor_area: 750,
    },
    application_date: "2024-01-05",
    preferred_move_in_date: "2024-01-20",
    application_status: "rejected",
    reviewed_date: "2024-01-12",
    review_notes: "Income requirements not met for this property.",
  },
]

const ApplicationMain = () => {
    const [applications, setApplications] = useState<RentalApplication[]>(mockApplications)

    const getStatusIcon = (status: string) => {
        switch(status) {
            case "pending":
                return <Clock className = "size-4"/>
            case "approved":
                return <CheckCircle className = "size-4"/>
            case "rejected":
                return <XCircle className = "size-4"/>
            case "withdrawn":
                return <AlertCircle className = "size-4"/>
            default:
                return <Clock className = "size-4"/>
        }
    }

    const getStatusColor = (status:string) => {
        switch(status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "approved":
                return "bg-green-100 text-green-800 border-green-200"
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200"
            case "withdrawn":
                return "bg-gray-100 text-gray-800 border-gray-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (applications.length === 0) {
        return (
            <>
               <NoApplication />
            </>
        )
    }

    return(
        <>
            <div className = "w-full max-w-4xl mx-auto p-6 space-y-6">
                <TitleCard />

                <div className = "space-y-4">
                    {applications.map((application) => (
                        <Card key ={application.id} className = "w-full">


                            {/* HEAD OF CARD --START */}

                            <CardHeader className = "pb-3">
                                <div className = "flex items-start justify-between">
                                    <div className = "space-y-1">
                                        {/* Address - START */}
                                        <CardTitle className = "text-lg flex items-center gap-2">
                                            <MapPin className = "size-4 text-gray-500" />
                                            {application.unit.address}
                                            {application.unit.unit_number && (
                                                <span className = "text-sm font-normal text-gray-500">Unit {application.unit.unit_number}</span>
                                            )}
                                        </CardTitle>
                                        {/* Address - END */}

                                        {/* Unit Info - START */}
                                        <CardDescription className = "flex items-center gap-4">
                                            <span className = "flex items-center gap-1">
                                                <DollarSign className = "size-3"/>
                                                ${application.unit.rent_price}/month
                                            </span>
                                            <span className = "capitalize">
                                                {application.unit.property_type}
                                            </span>
                                            {application.unit.floor_area && <span>{application.unit.floor_area} sq ft</span>}
                                        </CardDescription>
                                        {/* Unit Info - END */}
                                    </div>

                                    {/* Status Badge - START */}
                                    <Badge
                                      variant = "outline"
                                      className = {`flex items-center gap-1 ${getStatusColor(application.application_status)}`}
                                    >
                                        {getStatusIcon(application.application_status)}
                                        <span className = "capitalize">{application.application_status}</span>
                                    </Badge>
                                    {/* Status Badge - END */}
                                </div>
                            </CardHeader>
                            {/* HEAD OF CARD --END  */}
                            
                            
                            <CardContent className = "pt-0">

                                {/* DATES - START */}
                                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className = "text-sm text-gray-600">Application Date</p>
                                        <p className = "font-medium">{formatDate(application.application_date)}</p>
                                    </div>
                                    {application.preferred_move_in_date && (
                                        <div>
                                            <p className = "text-sm text-gray-600">Preferred Move-in Date</p>
                                            <p className = "font-medium">{formatDate(application.preferred_move_in_date)}</p>
                                        </div>
                                    )}
                                </div>
                                {/* DATES - END */}

                                {/* APPROVED STATUS ALERT - START */}
                                {application.application_status === "approved" && (
                                    <Alert className = "mb-4 border-green-200 bg-green-50">
                                        <CheckCircle className = "size-4 text-green-600"/>
                                        <AlertDescription className = "text-green-800">
                                            Congratulations! Your applicaton has been approved.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* APPROVED STATUS ALERT - END */}

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ApplicationMain;