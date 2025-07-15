import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Home, MapPin } from 'lucide-react';

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

interface ViewDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listing: Listing | null;
}

export function ViewDetailsModal({ open, onOpenChange, listing }: ViewDetailsModalProps) {
    if (!listing) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatArea = (area: number) => {
        return `${area.toLocaleString()} sq ft`;
    };

    // Safely handle unit_photos - ensure it's an array
    const photos = Array.isArray(listing.unit_photos) ? listing.unit_photos : [];

    // Safely handle amenities - ensure it's an array
    const amenities = Array.isArray(listing.amenities) ? listing.amenities : [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Property Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Property Images */}
                    <div className="grid grid-cols-2 gap-2">
                        {photos.length > 0 ? (
                            photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Property ${index + 1}`} className="h-40 w-full rounded-lg object-cover" />
                            ))
                        ) : (
                            <div className="col-span-2 flex h-40 items-center justify-center rounded-lg bg-gray-100">
                                <Home className="h-8 w-8 text-gray-400" />
                                <span className="ml-2 text-gray-500">No photos available</span>
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div>
                        <h3 className="text-xl font-semibold">{listing.address}</h3>
                        <p className="text-gray-600">Unit {listing.unit_number}</p>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                <span>{formatArea(listing.floor_area)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span className="capitalize">{listing.availability_status}</span>
                            </div>
                            <Badge variant="secondary">{listing.property_type}</Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* Price */}
                    <div>
                        <h4 className="mb-2 font-semibold">Rent</h4>
                        <p className="text-2xl font-bold text-[#3b3b3b]">{formatPrice(listing.rent_price)} / month</p>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h4 className="mb-2 font-semibold">Description</h4>
                        <p className="text-gray-700">{listing.description}</p>
                    </div>

                    <Separator />

                    {/* Amenities */}
                    <div>
                        <h4 className="mb-2 font-semibold">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                            {amenities.length > 0 ? (
                                amenities.map((amenity) => (
                                    <Badge key={amenity} variant="outline">
                                        {amenity.replace('_', ' ')}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-500">No amenities listed</span>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
