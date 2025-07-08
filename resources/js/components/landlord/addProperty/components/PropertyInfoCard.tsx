import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhilippinePeso, MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type React from 'react';
import type { PropertyFormData } from '@/types/propertyFormData.types';


interface PropertyFormProps  {
    onInputChange: (field: keyof PropertyFormData, value: string | string[]) => void;
    data: PropertyFormData;
    errors: Partial<Record<keyof PropertyFormData, string>>;
}

const PropertyInfoCard = ({data, errors, onInputChange}: PropertyFormProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Property Information
                </CardTitle>
                <CardDescription>Basic details about the rental property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="address">Property Address *</Label>
                        <Input
                            id="address"
                            placeholder="123 Main Street, City, State"
                            value={data.address}
                            onChange={(e) => onInputChange('address', e.target.value)}
                            className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unit_number">Unit Number</Label>
                        <Input
                            id="unit_number"
                            placeholder="1A, 2B, etc. (optional)"
                            value={data.unit_number}
                            onChange={(e) => onInputChange('unit_number', e.target.value)}
                        />
                        {errors.unit_number && <p className="text-sm text-red-500">{errors.unit_number}</p>}
                    </div>
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex flex-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="property_type">Property Type *</Label>
                            <Select value={data.property_type} onValueChange={(value) => onInputChange('property_type', value)}>
                                <SelectTrigger className={errors.property_type ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="duplex">Duplex</SelectItem>
                                    <SelectItem value="triplex">Triplex</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.property_type && <p className="text-sm text-red-500">{errors.property_type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rent_price">Monthly Rent *</Label>
                            <div className="relative">
                                <PhilippinePeso className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    id="rent_price"
                                    type="number"
                                    placeholder="1800"
                                    value={data.rent_price}
                                    onChange={(e) => onInputChange('rent_price', e.target.value)}
                                    className={`pl-10 ${errors.rent_price ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.rent_price && <p className="text-sm text-red-500">{errors.rent_price}</p>}
                        </div>
                    </div>

                    <div className="flex flex-1 gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="floor_area">Floor Area (sq ft) *</Label>
                            <Input
                                id="floor_area"
                                type="number"
                                placeholder="850"
                                value={data.floor_area}
                                onChange={(e) => onInputChange('floor_area', e.target.value)}
                                className={errors.floor_area ? 'border-red-500' : ''}
                            />
                            {errors.floor_area && <p className="text-sm text-red-500">{errors.floor_area}</p>}
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="availability_status">Availability Status</Label>
                            <Select
                                value={data.availability_status}
                                onValueChange={(value) => onInputChange('availability_status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="occupied">Occupied</SelectItem>
                                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.availability_status && <p className="text-sm text-red-500">{errors.availability_status}</p>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyInfoCard;
