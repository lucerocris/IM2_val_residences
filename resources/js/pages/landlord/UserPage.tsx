import LandlordLayout from '@/layout/LandlordLayout';
import LandlordPageHeaderSection from '@/components/landlord/ui/LandlordPageHeaderSection';
import { Users, UserCheck, UserPlus} from 'lucide-react';
import { UsersDataTable } from '@/components/landlord/users/usersTable/users-data-table';
import { usersColumns, User } from '@/components/landlord/users/usersTable/usersColumn';


type Metrics = {
    numberOfUsers: number;
    numberOfTenant: number;
    numberOfProspectiveTenant: number;
    numberOfNewUsers: number;
};

interface UserPageProps {
    userList: User[];
    metrics: Metrics;
}

const UserPage = ({userList, metrics}: UserPageProps) => {

    const metricData = [
        {
            title: 'Total Users',
            metric: metrics.numberOfUsers,
            metricDescription: 'All registered users',
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
        },
        {
            title: 'Active Tenants',
            metric: metrics.numberOfTenant,
            metricDescription: 'Current tenant accounts',
            icon: <UserCheck className="h-4 w-4 text-green-600" />,
        },
        {
            title: 'Prospective Tenants',
            metric: metrics.numberOfProspectiveTenant,
            metricDescription: 'Potential tenant applications',
            icon: <UserPlus className="h-4 w-4 text-blue-600" />,
        },
        {
            title: 'New This Month',
            metric: metrics.numberOfNewUsers,
            metricDescription: 'Users registered this month',
            icon: <UserPlus className="h-4 w-4 text-orange-600" />,
        },
    ];
    return (
        <LandlordLayout>
            <LandlordPageHeaderSection title={"Users"} subtitle={"Manage tenants and prospective tenants in your rental system"} metric={metricData} />
            <UsersDataTable columns={usersColumns} data={userList} />
        </LandlordLayout>
    )
}

export default UserPage;
