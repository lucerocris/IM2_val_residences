interface TenantInfoProps {
    icon: React.ElementType;
    label: string;
    data: string;
}

const TenantInfo = ({ icon: Icon, label, data }:TenantInfoProps) => {
    return(
        <>
            <div className = "flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Icon className = "size-4 text-gray-500" />
                <div>
                    <p className = "text-sm font-medium text-gray-700">{label}</p>
                    <p className = "text-sm text-gray-900">{data}</p>
                </div>
            </div>
        </>
    );
}

export default TenantInfo