import { MapPin, Home, Wifi, Car, Dumbbell, Waves, Wind, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

{/* NOTE TO SELF: MAKE THIS INTERFACE A TYPE FOR REUSABILITY */}
export type Listing = {
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
};

interface ListingCardProps {
    listing: Listing;
    onViewDetails: (listing: Listing) => void;
    onApply: (listing: Listing) => void;
    featured?: boolean
}

const ListingCard = ({ listing, onViewDetails, onApply, featured=false}:ListingCardProps) => {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    const formatArea = (area: number) => {
        return `${area.toLocaleString()} sq ft`
    }

  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: Car,
    gym: Dumbbell,
    pool: Waves,
    air_conditioning: Wind,
    security: Shield,
  };

  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity.toLowerCase()];
    return IconComponent ? <IconComponent className = "size-3" />: null;
  };

    if(featured) {
        return(
            <>
                <Card className = "overflow-hidden border-gray-200 bg-white">
                    <div className = "flex flex-col lg:flex-row">
                        <div className = "lg:w-1/2 relative">
                        {/* Image */}
                            <img 
                              src = {listing.unit_photos[0] || "/placeholder.svg"}
                              alt = {`${listing.address} - Unit ${listing.unit_number}`}
                              className = "w-full h-64 lg:h-full object-cover"
                            />

                        {/* Badges on the image */}
                            <Badge className = "absolute top-3 left-3 bg-emerald-600 text-white">
                                {listing.availability_status}
                            </Badge>

                            <Badge className = "absolute top-3 right-3 bg-blue-600 text-white">
                                {listing.property_type}
                            </Badge>
                        </div>

                        {/* Rent price */}
                        <div className = "lg:w-1/2 p-6">
                            <div className = "mb-4">
                                <p className = "text-3xl font-bold text-orange-500">
                                    {formatPrice(listing.rent_price)}
                                    <span className = "text-sm font-normal text-gray-500">/month</span>
                                </p>
                            </div>

                        {/* unit No. */}
                            <div className = "flex items-start gap-2 mb-3">
                                <MapPin className = "size-4 text-gray-400 mt-0.5 shrink-0" />
                                <span className = "text-sm text-gray-600">
                                    {listing.address}, Unit {listing.unit_number}
                                </span>
                            </div>

                        {/* floor area */}
                            <div className = "flex items-center gap-2 mb-4">
                                <Home className = "size-4 text-gray-400" />
                                <span className = "text-sm text-gray-600">
                                    Floor Area: {formatArea(listing.floor_area)}
                                </span>
                            </div>

                        {/* unit description */}
                            <p className = "text-sm text-gray-700 mb-6 line-clamp-3">
                                {listing.description}
                            </p>

                        {/* amenities */}
                            <div>
                                <h4 className = "text-sm font-semibold text-gray-900 mb-3">Premium Amenities</h4>
                                <div className = "grid grid-cols-3 gap-2">
                                    {listing.amenities.slice(0, 6).map((amenity, idx) => (
                                        <div 
                                          key = {idx} 
                                          className = "flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
                                        >
                                            {getAmenityIcon(amenity)}
                                            <span className = "capitalize">{amenity.replace(/_/g, " ")}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className = "flex gap-2 mt-6">
                                <Button 
                                  onClick={() => onViewDetails(listing)}
                                  variant="outline" 
                                  className="flex-1"
                                >
                                    View Details
                                </Button>
                                <Button 
                                  onClick={() => onApply(listing)}
                                  className="flex-1"
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </>
        );
    }

    // Regular listing card
    return (
        <Card className = "overflow-hidden border-gray-200 bg-white hover:shadow-lg transition-shadow">
            <div className = "relative">
                <img 
                  src = {listing.unit_photos[0] || "/placeholder.svg"}
                  alt = {`${listing.address} - Unit ${listing.unit_number}`}
                  className = "w-full h-48 object-cover"
                />
                <Badge className = "absolute top-3 left-3 bg-emerald-600 text-white">
                    {listing.availability_status}
                </Badge>
                <Badge className = "absolute top-3 right-3 bg-blue-600 text-white">
                    {listing.property_type}
                </Badge>
            </div>
            
            <div className = "p-4">
                <div className = "mb-3">
                    <p className = "text-2xl font-bold text-orange-500">
                        {formatPrice(listing.rent_price)}
                        <span className = "text-sm font-normal text-gray-500">/month</span>
                    </p>
                </div>

                <div className = "flex items-start gap-2 mb-2">
                    <MapPin className = "size-4 text-gray-400 mt-0.5 shrink-0" />
                    <span className = "text-sm text-gray-600">
                        {listing.address}, Unit {listing.unit_number}
                    </span>
                </div>

                <div className = "flex items-center gap-2 mb-3">
                    <Home className = "size-4 text-gray-400" />
                    <span className = "text-sm text-gray-600">
                        {formatArea(listing.floor_area)}
                    </span>
                </div>

                <p className = "text-sm text-gray-700 mb-4 line-clamp-2">
                    {listing.description}
                </p>

                <div className = "mb-4">
                    <div className = "flex flex-wrap gap-1">
                        {listing.amenities.slice(0, 4).map((amenity, idx) => (
                            <div 
                              key = {idx} 
                              className = "flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
                            >
                                {getAmenityIcon(amenity)}
                                <span className = "capitalize">{amenity.replace(/_/g, " ")}</span>
                            </div>
                        ))}
                        {listing.amenities.length > 4 && (
                            <div className = "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                +{listing.amenities.length - 4} more
                            </div>
                        )}
                    </div>
                </div>

                <div className = "flex gap-2">
                    <Button 
                      onClick={() => onViewDetails(listing)}
                      variant="outline" 
                      className="flex-1"
                    >
                        View Details
                    </Button>
                    <Button 
                      onClick={() => onApply(listing)}
                      className="flex-1"
                    >
                        Apply Now
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ListingCard;