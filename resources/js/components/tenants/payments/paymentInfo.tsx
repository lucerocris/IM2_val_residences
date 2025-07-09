interface PaymentInfoProps {
    label: string;
    value: string;
}

const PaymentInfo = ({ label, value }:PaymentInfoProps) => {
    return(
        <>
            <div className = "flex justify-between">
                <span className = "font-medium">{label}</span>
                <span className = "text-md">{value}</span>
            </div>
        </>
    );
}

export default PaymentInfo;