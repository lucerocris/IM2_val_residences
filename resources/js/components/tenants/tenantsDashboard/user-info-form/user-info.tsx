interface UserInfoProps {
    icon: React.ReactNode;
    title: string;
    tenantInfo: string;
}

const UserInfo = ({ icon, title, tenantInfo }:UserInfoProps) => {
    return(
        <>
            <div className = "flex items-center space-x-3">
                {icon}
                <div>
                    <p className = "text-sm text-gray-600">{title}</p>
                    <p className = "font-medium">{tenantInfo}</p>
                </div>
            </div>
        </>
    );
}

export default UserInfo;