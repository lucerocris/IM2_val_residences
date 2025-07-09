import ApplicationMain from '@/components/prospective-tenant/application-status/application-main';

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
}

interface ApplicationStatusProps {
  applications: RentalApplication[];
}

export default function ApplicationStatus({ applications }: ApplicationStatusProps) {
  return <ApplicationMain applications={applications} />;
}
