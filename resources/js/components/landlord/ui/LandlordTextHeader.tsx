
interface LandlordTextHeaderProps {
    title: string,
    subtitle: string
};

const LandlordTextHeader = ({title, subtitle}: LandlordTextHeaderProps) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-gray-600">Overview of your rental properties and operations</p>
        </div>
    );
}

export default LandlordTextHeader;
