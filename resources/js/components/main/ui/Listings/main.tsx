import { useMemo, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import ApplyModal from './apply-modal';
import ListingsFilter from './Filter';
import ListingsGrid from './listing-grid';
import { ViewDetailsModal } from './view-details-modal';

interface Listing {
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
}
interface ListingsMainProps {
    ListingsData?: Listing[];
    redirectToLoginIfUnauthenticated?: boolean;
}

const ListingsMain = ({ ListingsData, redirectToLoginIfUnauthenticated = false }: ListingsMainProps) => {
    console.log('ListingsData:', ListingsData);

    const { props } = usePage();
    const user = (props as any).auth?.user;

    // Debug: Check first item structure
    if (ListingsData && ListingsData.length > 0) {
        console.log('First listing structure:', {
            id: ListingsData[0].id,
            unit_photos_type: typeof ListingsData[0].unit_photos,
            unit_photos_value: ListingsData[0].unit_photos,
            amenities_type: typeof ListingsData[0].amenities,
            amenities_value: ListingsData[0].amenities,
        });
    }
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
    const [maxRentFilter, setMaxRentFilter] = useState('all');
    const [sortBy, setSortBy] = useState('price_low');

    const filteredAndSortedListings = useMemo(() => {
        const filtered = (ListingsData || []).filter((listing) => {
            const matchesPropertyType = propertyTypeFilter === 'all' || listing.property_type === propertyTypeFilter;

            const matchesMaxRent =
                maxRentFilter === 'all' ||
                (maxRentFilter === '20000' && listing.rent_price <= 20000) ||
                (maxRentFilter === '25000' && listing.rent_price <= 25000) ||
                (maxRentFilter === '30000' && listing.rent_price <= 30000);

            return matchesPropertyType && matchesMaxRent;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price_low':
                    return a.rent_price - b.rent_price;
                case 'price_high':
                    return b.rent_price - a.rent_price;
                case 'area_large':
                    return b.floor_area - a.floor_area;
                case 'area_small':
                    return a.floor_area - b.floor_area;
                default:
                    return 0;
            }
        });
        return filtered;
    }, [propertyTypeFilter, maxRentFilter, sortBy]);

    const handleViewDetails = (listing: Listing) => {
        setSelectedListing(listing);
        setViewDetailsModalOpen(true);
    };

    const handleApply = (listing: Listing) => {
        // Check if we should redirect unauthenticated users to login
        if (redirectToLoginIfUnauthenticated && !user) {
            router.visit('/login');
            return;
        }

        setSelectedListing(listing);
        setApplyModalOpen(true);
    };

    return (
        <>
            <ListingsFilter
                propertyTypeFilter={propertyTypeFilter}
                setPropertyTypeFilter={setPropertyTypeFilter}
                maxRentFilter={maxRentFilter}
                setMaxRentFilter={setMaxRentFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onSubscriptionClick={() => setSubscriptionModalOpen(true)}
                resultCount={filteredAndSortedListings.length}
            />

            <ListingsGrid listings={filteredAndSortedListings} onViewDetails={handleViewDetails} onApply={handleApply} />
            <ViewDetailsModal open={viewDetailsModalOpen} onOpenChange={setViewDetailsModalOpen} listing={selectedListing} />
            <ApplyModal open={applyModalOpen} onOpenChange={setApplyModalOpen} listing={selectedListing} />
        </>
    );
};

export default ListingsMain;
