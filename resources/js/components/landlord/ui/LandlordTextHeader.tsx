
interface LandlordTextHeaderProps {
    title: string,
    subtitle: string
};

const LandlordTextHeader = ({title, subtitle}: LandlordTextHeaderProps) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="mt-1 text-gray-600">{subtitle}</p>
        </div>
    );
}

export default LandlordTextHeader;
