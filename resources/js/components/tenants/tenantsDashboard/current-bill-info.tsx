
interface currentBillInfoProps {
    title: string;
    info: string | number;
}

const CurrentBillInfo = ({ title, info }:currentBillInfoProps) => {
    return(
        <>
            <div>
                <p className = "text-sm text-gray-600">{title}</p>
                <p className = "font-semibold">{info}</p>
            </div>
        </>
    );
}

export default CurrentBillInfo;
