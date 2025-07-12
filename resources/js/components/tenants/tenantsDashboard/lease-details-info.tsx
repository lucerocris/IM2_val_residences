
interface LeaseDetailsInfoProps{
    title: string;
    data: string;
    className?: string
}

const LeaseDetailsInfo = ({ title, data }: LeaseDetailsInfoProps) => {
    return(
        <>
            <div className = "space-y-1">
                <p className = "text-sm text-gray-600">{title}</p>
                <p className = "text-md font-semibold text-gray-900">{data}</p>
            </div>
        </>
    );
}

export default LeaseDetailsInfo;