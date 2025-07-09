interface PaymentInfoProps {
    label: string;
    value: string;
}

interface BankTransferInfoProps {
    label: string;
    value: string;
    button: React.ReactNode;
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

export const BankTransferInfo = ({label, value, button}:BankTransferInfoProps) => {
    return(
        <>
            <div className = "flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className = "flex-1">
                    <span className = "font-medium text-sm">{label}</span>
                    <p className = "font-medium">{value}</p>
                </div>
                {button}
            </div>
        </>
    );
}

export default PaymentInfo;