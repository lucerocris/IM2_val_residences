
interface LeaseDetailsInfoProps{
    title: string;
    info: string;
}

const LeaseDetailsInfo = ({ title, info }: LeaseDetailsInfoProps) => {
    return(
        <>
            <div>
                <p className = "text-sm text-gray-600">{title}</p>
                <p className = "font-semibold">{info}</p>
            </div>
        </>
    );
}

export default LeaseDetailsInfo;