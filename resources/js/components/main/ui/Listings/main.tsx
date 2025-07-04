import { useState, useMemo } from "react";
// COMPONENTS HERE ( TO BE MADE )
import ListingsFilter from "./Filter";

const mockListings = [
  {
    id: 1,
    landlord_id: 1,
    address: "123 Oak Street, Downtown",
    unit_number: "A1",
    availability_status: "available",
    floor_area: 850.5,
    rent_price: 1200.0,
    property_type: "duplex",
    description:
      "Beautiful duplex unit with modern amenities and great location. Perfect for young professionals or small families.",
    amenities: ["parking", "laundry", "air_conditioning", "internet", "furnished"],
    unit_photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    landlord_name: "John Smith",
  },
  {
    id: 2,
    landlord_id: 2,
    address: "456 Pine Avenue, Midtown",
    unit_number: "B2",
    availability_status: "available",
    floor_area: 1200.75,
    rent_price: 1800.0,
    property_type: "triplex",
    description: "Spacious triplex unit with 3 bedrooms and 2 bathrooms. Great for families with children.",
    amenities: ["parking", "garden", "air_conditioning", "heating", "pet_friendly"],
    unit_photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    landlord_name: "Sarah Johnson",
  },
  {
    id: 3,
    landlord_id: 1,
    address: "789 Maple Drive, Suburbs",
    unit_number: "C1",
    availability_status: "available",
    floor_area: 950.0,
    rent_price: 1400.0,
    property_type: "duplex",
    description: "Cozy duplex in quiet neighborhood. Recently renovated with modern fixtures and appliances.",
    amenities: ["parking", "laundry", "heating", "internet"],
    unit_photos: ["/placeholder.svg?height=200&width=300"],
    landlord_name: "John Smith",
  },
  {
    id: 4,
    landlord_id: 3,
    address: "321 Cedar Lane, Uptown",
    unit_number: "D3",
    availability_status: "available",
    floor_area: 1100.25,
    rent_price: 1600.0,
    property_type: "triplex",
    description: "Modern triplex unit with excellent city views. Close to public transportation and shopping centers.",
    amenities: ["parking", "balcony", "air_conditioning", "heating", "internet", "gym"],
    unit_photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    landlord_name: "Mike Davis",
  },
  {
    id: 5,
    landlord_id: 2,
    address: "654 Birch Street, Downtown",
    unit_number: "E1",
    availability_status: "available",
    floor_area: 750.0,
    rent_price: 1000.0,
    property_type: "duplex",
    description: "Affordable duplex unit perfect for students or young professionals. Walking distance to university.",
    amenities: ["laundry", "internet", "furnished"],
    unit_photos: ["/placeholder.svg?height=200&width=300"],
    landlord_name: "Sarah Johnson",
  },
  {
    id: 6,
    landlord_id: 3,
    address: "987 Elm Court, Midtown",
    unit_number: "F2",
    availability_status: "available",
    floor_area: 1350.0,
    rent_price: 2000.0,
    property_type: "triplex",
    description: "Luxury triplex unit with premium finishes and amenities. Perfect for executives and professionals.",
    amenities: ["parking", "balcony", "air_conditioning", "heating", "internet", "gym", "pool", "security"],
    unit_photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    landlord_name: "Mike Davis",
  },
]

interface Listing {
    id: number;
    landlord_id: number;
    address: string;
    unit_number: string;
    availability_status: string;
    floor_area: number;
    rent_price: number;
    property_type: string;
    description: string;
    amenities: string[];
    unit_photos: string[];
    landlord_name: string;
}

const ListingsMain = () => {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false)
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Listing | null > (null)
    const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
    const [maxRentFilter, setMaxRentFilter] = useState("all");
    const [sortBy, setSortBy] = useState("price_low");

    const filteredAndSortedListings = useMemo(() => {
        const filtered = mockListings.filter((listing) => {
            const matchesPropertyType = propertyTypeFilter === "all" || listing.property_type === propertyTypeFilter

            const matchesMaxRent = 
                maxRentFilter === "all" ||
                (maxRentFilter === "1000" && listing.rent_price <= 1000) ||
                (maxRentFilter === "1500" && listing.rent_price <= 1500) ||
                (maxRentFilter === "2000" && listing.rent_price <= 2000)

            return matchesPropertyType && matchesMaxRent;
        })

        filtered.sort((a, b) => {
            switch(sortBy) {
                case "price_low":
                    return a.rent_price - b.rent_price
                case "price_high":
                    return b.rent_price - a.rent_price
                case "area_large":
                    return b.floor_area - a.floor_area
                case "area_small":
                    return a.floor_area - b.floor_area
                default:
                    return 0;
            }
        })
        return filtered
    }, [propertyTypeFilter, maxRentFilter, sortBy])

    const handleViewDetails = (listing: Listing) => {
        setSelectedListing(listing)
        setViewDetailsModalOpen(true)
    }

    const handleApply = (listing: Listing) => {
        setSelectedListing(listing)
        setApplyModalOpen(true)
    }

    return(
        <>
            <ListingsFilter
               propertyTypeFilter = {propertyTypeFilter}
               setPropertyTypeFilter={setPropertyTypeFilter}
               maxRentFilter= {maxRentFilter}
               setMaxRentFilter = {setMaxRentFilter}
               sortBy = {sortBy}
               setSortBy = {setSortBy}
               onSubscriptionClick = {() => setSubscriptionModalOpen(true)}
               resultCount = {filteredAndSortedListings.length}
               />
        </>
    );
}

export default ListingsMain