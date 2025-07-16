import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Eye, X, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NoApplication from "./no-application";
import TitleCard from "./title-card";
import { Button } from "@/components/ui/button";
import { ApplicationData, UserApplicationProps } from "@/types/application.types";

const ApplicationMain = ({ applicationData }:UserApplicationProps) => {

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

    console.log(applicationData);

    if (!applicationData || applicationData.length === 0) {
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
                    {applicationData.map((application) => (
                        <Card key ={application.application_id} className = "w-full">


                            {/* HEAD OF CARD --START */}

                            <CardHeader className = "pb-3">
                                <div className = "flex items-start justify-between">
                                    <div className = "space-y-1">
                                        {/* Address - START */}
                                        <CardTitle className = "text-lg flex items-center gap-2">
                                            <MapPin className = "size-4 text-gray-500" />
                                            {application.address}
                                            {application.unit_number && (
                                                <span className = "text-sm font-normal text-gray-500">Unit {application.unit_number}</span>
                                            )}
                                        </CardTitle>
                                        {/* Address - END */}

                                        {/* Unit Info - START */}
                                        <CardDescription className = "flex items-center gap-4">
                                            <span className = "flex items-center gap-1">
                                                <DollarSign className = "size-3"/>
                                                ${application.rent_price}/month
                                            </span>
                                            <span className = "capitalize">
                                                {application.property_type}
                                            </span>
                                            {application.floor_area && <span>{application.floor_area} sq ft</span>}
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

                                {/* ADDITIONAL NOTES - START */}
                                {application.additional_notes && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">Additional Notes</p>
                                        <p className="text-sm">{application.additional_notes}</p>
                                    </div>
                                )}
                                {/* ADDITIONAL NOTES - END */}

                                {/* APPROVED STATUS ALERT - START */}
                                {application.application_status === "approved" && (
                                    <Alert className = "mb-4 border-green-200 bg-green-50">
                                        <CheckCircle className = "size-4 text-green-600"/>
                                        <AlertDescription className = "text-green-800">
                                            Congratulations! Your application has been approved.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* APPROVED STATUS ALERT - END */}

                                {/* REJECTED STATUS ALERT - START */}
                                {application.application_status === "rejected" && application.review_notes && (
                                    <Alert className = "mb-4 border-red-200 bg-red-50">
                                        <XCircle className = "size-4 text-red-600"/>
                                        <AlertDescription className = "text-red-800">
                                            Your application was rejected. Reason: {application.review_notes}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* REJECTED STATUS ALERT - END */}

                                {application.application_status === "pending" && (
                                    <Button
                                      variant = "outline"
                                      size = "sm"
                                      className = "text-red-600"
                                    >
                                        <X className = "size-4 mr-1"/>
                                        Withdraw
                                    </Button>
                                )}

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ApplicationMain;