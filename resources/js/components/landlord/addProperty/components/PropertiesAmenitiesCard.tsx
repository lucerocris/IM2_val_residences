import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Home } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type React from 'react';
import type { PropertyFormData } from '@/types/propertyFormData.types';


const availableAmenities = ['Covered Parking', 'Dirty Kitchen', 'Pet Friendly', 'Tile Floors', 'Balcony'];

interface PropertiesAmenitiesCardProps {
    selectedAmenities: Array<string>;
    onAmenityToggle: (amenity: string) => void;
    errors: Partial<Record<keyof PropertyFormData, string>>;
}
const PropertiesAmenitiesCard = ({selectedAmenities, onAmenityToggle, errors}: PropertiesAmenitiesCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Amenities & Features
                </CardTitle>
                <CardDescription>Select all amenities available in this property</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {availableAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                                id={amenity}
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={() => onAmenityToggle(amenity)}
                            />
                            <Label htmlFor={amenity} className="cursor-pointer text-sm font-normal">
                                {amenity}
                            </Label>
                        </div>
                    ))}
                </div>

                {selectedAmenities.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <p className="mb-2 text-sm font-medium text-gray-700">Selected Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedAmenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                                    <Check className="h-3 w-3" />
                                    {amenity}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {errors.amenities && <p className="text-sm text-red-500">{errors.amenities}</p>}
            </CardContent>
        </Card>
    )
}

export default PropertiesAmenitiesCard;
