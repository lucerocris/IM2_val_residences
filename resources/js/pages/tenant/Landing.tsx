"use client"

import Header from "@/components/main/ui/Header"
import ButtonSection from "@/components/tenants/tenantsDashboard/button-section"
import CurrentBill from "@/components/tenants/tenantsDashboard/current-bill"
import LeaseDetails from "@/components/tenants/tenantsDashboard/lease-details"
import MaintenanceRequestComponent from "@/components/tenants/tenantsDashboard/maintenance-request"
import TenantProfileModal from "@/components/tenants/tenantsDashboard/tenant-profile-modal"
import { Button } from "@/components/ui/button"
import TenantLayout from "@/layout/TenantLayout"
import type { TenantDashboardProps } from "@/types/tenantDashboard.types"
import { User } from "lucide-react"
import { useState } from "react"
import OnboardingAlert from "@/pages/tenant/OnboardingAlert"

interface ExtendedTenantDashboardProps extends TenantDashboardProps {
    onboardingLease?: {
        id: number
        completion_percentage: number
        onboarding_steps: any
        required_fees_amount: number
        monthly_rent: number
        deposit_amount: number
        pending_requirements: string[]
    } | null
}

const TenantDashboard = ({
                             tenantData,
                             leaseData,
                             rentalBill,
                             maintenanceRequests,
                             onboardingLease,
                             tenantID,
                             unitID,
                             userInfo,
                             leaseID,
                         }: ExtendedTenantDashboardProps) => {
    const [profileModalOpen, setProfileModalOpen] = useState(false)
    const [showAllLeases, setShowAllLeases] = useState(false)

    const displayedLeases = showAllLeases ? leaseData : [leaseData[0]]

    return (
        <>
            <Header
                links={[
                    { label: "VIEW LISTINGS", href: "/tenant/listings" },
                    { label: "TENANT DASHBOARD", href: "/tenant/dashboard" },
                ]}
                links2={[{ label: "LOG OUT", href: "/logout", method: "post" }]}
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
                <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Welcome back, {userInfo[0].user_name || "Tenant"}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Manage your rental payments, lease information, and maintenance requests
                            </p>
                        </div>

                        {/* Onboarding Alert */}
                        {onboardingLease && (
                            <div className="mb-8">
                                <OnboardingAlert lease={onboardingLease} />
                            </div>
                        )}

                        {/* Main Dashboard Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Left Column - Bills and Lease Info */}
                            <div className="space-y-6 lg:col-span-8">
                                {/* Current Bills Section */}
                                <CurrentBill currentBill={rentalBill} leaseData={leaseData[0]} leaseID={leaseID} />

                                {/* Lease Information */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Lease Information</h2>
                                        <Button
                                            onClick={() => setShowAllLeases(!showAllLeases)}
                                            variant={showAllLeases ? "outline" : "default"}
                                            size="sm"
                                        >
                                            {showAllLeases ? "Show Current Lease" : `Show All Leases (${leaseData.length})`}
                                        </Button>
                                    </div>
                                    {displayedLeases.map((lease) => (
                                        <LeaseDetails key={lease.id} leaseData={lease} rentalBill={rentalBill} />
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Quick Actions and Maintenance */}
                            <div className="space-y-6 lg:col-span-4">
                                {/* Quick Actions */}
                                <div>
                                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
                                    <ButtonSection
                                        leaseData={leaseData[0]}
                                        currentBill={rentalBill}
                                        tenantID={tenantID}
                                        unitID={unitID}
                                        leaseID={leaseID}
                                    />
                                </div>

                                {/* Maintenance Requests */}
                                <MaintenanceRequestComponent maintenanceRequests={maintenanceRequests} />
                            </div>
                        </div>
                    </div>
                </div>
            </TenantLayout>
            <TenantProfileModal
                open={profileModalOpen}
                onOpenChange={setProfileModalOpen}
                tenantData={tenantData}
                userInfo={userInfo}
            />
        </>
    )
}

export default TenantDashboard
