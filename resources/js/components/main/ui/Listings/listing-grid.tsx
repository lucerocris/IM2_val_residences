import { Home } from "lucide-react";
import ListingCard from "./listing-card";

export type Listing = {
    id: number;
    address: string;
    unit_number: string;
    availability_status: string;
    floor_area: number;
    rent_price: number;
    property_type: string;
    description: string;
    amenities: string[];
    unit_photos: string[];
};

interface ListingsGridProps {
    listings: Listing[];
    onViewDetails?: (listing: Listing) => void;
    onApply?: (listing: Listing) => void;
}

const ListingsGrid = ({ listings, onViewDetails, onApply }: ListingsGridProps) => {
    if (listings.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <Home className="mx-auto size-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Properties Found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                </div>
            </div>
        );
    }

    const featuredListing = listings[0];
    const regularListings = listings.slice(1);

    return (
        <>
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Signature Residences</h2>
                    <ListingCard
                        listing={featuredListing}
                        onViewDetails={onViewDetails || (() => { })}
                        onApply={onApply || (() => { })}
                        featured={true}
                    />
                </div>

                {regularListings.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Collection</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularListings.map((listing) => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    onViewDetails={onViewDetails || (() => { })}
                                    onApply={onApply || (() => { })}
                                    featured={false}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListingsGrid;
