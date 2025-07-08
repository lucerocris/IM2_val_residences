import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LeaseDetailsInfo from "./lease-details-info";

interface LeaseData {
    apartment: string;
    unitNo: string;
    totalFloors: string;
    livingArea: string;
    bedrooms: string;
    toiletBaths: string;
    balcony: string;
    parkingSpace: string;
    petFriendly: string;
    furnished: string;
    leaseTerm: string;
    rentPrice: string;
    deposit: string;
    advance: string;
    startDate: string;
    endDate: string;
    status: string;
}

interface LeaseDetailsProps {
    leaseData: LeaseData;
}

const LeaseDetails = ({ leaseData }: LeaseDetailsProps) => {
    return(
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Lease Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className = "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <LeaseDetailsInfo title = "Apartment" info = {leaseData.apartment} />
                        <LeaseDetailsInfo title = "Unit No." info = {leaseData.unitNo} />
                        <LeaseDetailsInfo title = "Total Floors" info = {leaseData.totalFloors} />
                        <LeaseDetailsInfo title = "Living Area (sqm)" info = {leaseData.livingArea} />
                        <LeaseDetailsInfo title = "Bedrooms" info = {leaseData.bedrooms} />                        
                        <LeaseDetailsInfo title = "Toilet & Baths" info = {leaseData.toiletBaths} />
                        <LeaseDetailsInfo title = "Balcony" info = {leaseData.balcony} />
                        <LeaseDetailsInfo title = "Parking Space" info = {leaseData.parkingSpace} />
                    </div>

                    <Separator className = "my-4" />
                    
                    <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
                            <LeaseDetailsInfo title = "Lease Term (months)" info = {leaseData.leaseTerm} />
                            <LeaseDetailsInfo title = "Rent Price (Php)" info = {leaseData.rentPrice} />
                            <LeaseDetailsInfo title = "Deposit (Months)" info = {leaseData.deposit} />
                            <LeaseDetailsInfo title = "Advance (Months)" info = {leaseData.advance} />
                    </div>
                    
                </CardContent>
            </Card>
        </>
    );
}

export default LeaseDetails;