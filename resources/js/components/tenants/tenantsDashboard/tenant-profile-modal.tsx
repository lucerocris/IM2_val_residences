import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, Briefcase, Contact, Shield  } from "lucide-react";
import TenantInfo from "./tenant-info";

interface TenantData {
  user_name: string;
  email: string;
  user_contact_number: string;
  user_type: string;
  move_in_date?: string;
  employment_status?: string;
  emergency_contact?: string;
  tenant_occupation?: string;
}

interface TenantProfileModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tenantData: TenantData;
}

const TenantProfileModal = ({ open, onOpenChange, tenantData }:TenantProfileModalProps) => {
    const formatDate = (dateString: string | undefined) => {
        if(!dateString) return 'Not Specified';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return(
        <>
            <Dialog open = {open} onOpenChange = {onOpenChange}>
                <DialogContent className = "max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className = "flex items-center gap-2 text-xl">
                            <User className = "size-5" />
                            Tenant Profile
                        </DialogTitle>
                    </DialogHeader>

                    <div className = "space-y-6">
                        {/* Basic Information */}
                        <div className = "space-y-4">
                            <div className = "flex items-center justify-between">
                                <h3 className = "text-lg font-semibold">Basic Information</h3>
                                <Badge variant = "secondary" className = "capitalize">
                                    {tenantData.user_type}
                                </Badge>
                            </div>

                            <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TenantInfo 
                                    icon = {User}
                                    label = "Full Name"
                                    data = {tenantData.user_name}
                                />

                                <TenantInfo 
                                    icon = {Mail}
                                    label = "Email"
                                    data = {tenantData.email}
                                />

                                <TenantInfo 
                                    icon = {Phone}
                                    label = "Contact Number"
                                    data = {tenantData.user_contact_number}
                                />

                                <TenantInfo 
                                    icon = {Calendar}
                                    label = "Move-in Date"
                                    data = {formatDate(tenantData.move_in_date)}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Employment Information */}
                        <div className = "space-y-4">
                            <h3 className = "text-lg font-semibold">Employment Information</h3>

                            <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TenantInfo 
                                    icon = {Briefcase}
                                    label = "Occupation"
                                    data = {tenantData.tenant_occupation || 'Not specified'}
                                />

                                <TenantInfo 
                                    icon = {Shield}
                                    label = "Employment Status"
                                    data = {tenantData.employment_status || 'Not specified'}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Emergency Contact */}
                        <div className = "space-y-4">
                            <h3 className = "text-lg font-semibold">Emergency Contact</h3>
                            
                            <TenantInfo 
                                icon = {Contact}
                                label = "Emergency Contact"
                                data = {tenantData.emergency_contact || 'Not specified'}
                            />
                        </div>

                        {/* Close Button */}
                        <div className = "flex justify-end pt-4">
                            <Button onClick={() => onOpenChange(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TenantProfileModal;