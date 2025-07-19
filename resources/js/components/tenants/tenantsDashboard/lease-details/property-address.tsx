
interface PropertyAddressProps {
    address: string;
    unit_number: string;
}

const PropertyAddress = ({ address, unit_number }:PropertyAddressProps) => {
    return(
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-1">Property Address</h3>
            <p className="text-blue-800">
                {address}
                {unit_number && ` - Unit ${unit_number}`}
            </p>
        </div>
    )
}

export default PropertyAddress;