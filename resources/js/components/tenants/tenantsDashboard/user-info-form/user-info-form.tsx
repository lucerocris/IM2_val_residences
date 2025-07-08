import { User, Phone, Mail, Calendar, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import UserInfo from './user-info'

const UserInfoForm = () => {
    const tenantData = {
        name: "Jose",
        email: "jose@email.com",
        contactNumber: "+63 912 345 6789",
        moveInDate: "2024-01-15",
        occupation: "Software Engineer",
        apartment: "Ph. 4, Lot 6, Block 6",
        unitNo: "3"
    };

    return(
        <>
            <div className = "space-y-6">
                <div className = "flex items-center space-x-4 p-4 bg-gradien-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className = "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className = "h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <h3 className = "font-semibold text-xl text-gray-900">{tenantData.name}</h3>
                        <Badge variant = "outline" className = "mt-1">
                            <Calendar className = "size-3 mr-1" />
                            Tenance since {new Date(tenantData.moveInDate).toLocaleDateString()}
                        </Badge>
                    </div>
                </div>

                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardContent className = "p-4 space-y-3">
                            <h4 className = "font-semibold text-gray-900 mb-3">Contact Information</h4>
                            <UserInfo icon = {<Mail className = "size-4 text-gray-500"/>} title = "Email" tenantInfo = {tenantData.email} />
                            <UserInfo icon = {<Phone className = "size-4 text-gray-500" />} title = "Phone Number" tenantInfo = {tenantData.contactNumber} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className = "p-4 space-y-3">
                            <h4 className = "font-semibold text-gray-900 mb-3">Personal Information</h4>

                            <UserInfo icon = {<Briefcase className = "size-4 text-gray-500"/>} title = "Occupation" tenantInfo = {tenantData.occupation} />
                            <UserInfo icon = {<Calendar className = "size-4 text-gray-500" />} title = "Move-in Date" tenantInfo = {tenantData.moveInDate} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default UserInfoForm;