import Header from '@/components/main/ui/Header';
import ButtonSection from '@/components/tenants/tenantsDashboard/button-section';
import CurrentBill from '@/components/tenants/tenantsDashboard/current-bill';
import LeaseDetails from '@/components/tenants/tenantsDashboard/lease-details';
import MaintenanceRequestComponent from '@/components/tenants/tenantsDashboard/maintenance-request';
import TenantProfileModal from '@/components/tenants/tenantsDashboard/tenant-profile-modal';
import { Button } from '@/components/ui/button';
import TenantLayout from '@/layout/TenantLayout';
import { TenantDashboardProps } from '@/types/tenantDashboard.types';
import { User } from 'lucide-react';
import { useState } from 'react';
import OnboardingAlert from '@/pages/tenant/OnboardingAlert';

interface ExtendedTenantDashboardProps extends TenantDashboardProps {
    onboardingLease?: {
        id: number;
        completion_percentage: number;
        onboarding_steps: any;
        required_fees_amount: number;
        monthly_rent: number;
        deposit_amount: number;
        pending_requirements: string[];
    } | null;
}

const TenantDashboard = ({ tenantData, leaseData, rentalBill, maintenanceRequests, onboardingLease, tenantID, unitID, userInfo }: ExtendedTenantDashboardProps) => {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [showAllLeases, setShowAllLeases] = useState(false);

    const displayedLeases = showAllLeases ? leaseData : [leaseData[0]];

    return (
        <>
            <Header
                links={[
                    { label: 'VIEW LISTINGS', href: '/tenant/listings' },
                    { label: 'TENANT DASHBOARD', href: '/tenant/dashboard' },
                ]}
                links2={[{ label: 'LOG OUT', href: '/logout', method: 'post' }]}
                actions={
                    <Button
                        variant="outline"
                        onClick={() => setProfileModalOpen(true)}
                        className="flex items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-white transition-colors hover:bg-white/90 hover:text-black"
                    >
                        <User className="h-4 w-4" />
                    </Button>
                }
            />
            <TenantLayout>
                <div className="px-12 py-8">
                    {onboardingLease && (<div className="mb-8">
                        <OnboardingAlert lease={onboardingLease} />
                    </div>)}
                    <div className="grid grid-cols-1 gap-8  lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <CurrentBill currentBill={rentalBill} />

                            {/* Lease Details with Toggle Button */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Button onClick={() => setShowAllLeases(!showAllLeases)} variant={showAllLeases ? 'outline' : 'default'}>
                                        {showAllLeases ? 'Show Single Lease' : `Show All Leases (${leaseData.length})`}
                                    </Button>
                                </div>

                                {displayedLeases.map((leaseData) => (
                                    <LeaseDetails key={leaseData.id} leaseData={leaseData} />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <ButtonSection leaseData={leaseData[0]} currentBill={rentalBill} tenantID={tenantID} unitID={unitID}/>
                            <MaintenanceRequestComponent maintenanceRequests={maintenanceRequests} />
                        </div>
                    </div>

                </div>

            </TenantLayout>

            <TenantProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} tenantData={tenantData} userInfo = {userInfo} />
        </>
    );
};

export default TenantDashboard;
