'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import LandlordLayout from '@/layout/LandlordLayout';
import { Camera, Check, DollarSign, Home, MapPin, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';
import LandlordTextHeader from '@/components/landlord/ui/LandlordTextHeader';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';

interface PropertyFormData {
    address: string;
    unit_number: string;
    property_type: string;
    floor_area: string;
    rent_price: string;
    availability_status: string;
    description: string;
    amenities: string[];
    photos: File[];
}

const availableAmenities = [
    'Covered Parking',
    'Dirty Kitchen',
    'Pet Friendly',
    'Tile Floors',
    'Balcony'
];

interface AddPropertyProps {
    onBack: () => void;
    onSave: (data: PropertyFormData) => void;
}

export default function AddProperty({ onBack, onSave }: AddPropertyProps) {
    const [formData, setFormData] = useState<PropertyFormData>({
        address: '',
        unit_number: '',
        property_type: '',
        floor_area: '',
        rent_price: '',
        availability_status: 'available',
        description: '',
        amenities: [],
        photos: [],
    });

    const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof PropertyFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity) ? prev.amenities.filter((a) => a !== amenity) : [...prev.amenities, amenity],
        }));
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        // Validate file types and sizes
        const validFiles = files.filter((file) => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            alert('Some files were skipped. Please upload only images under 5MB.');
        }

        // Update form data
        setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, ...validFiles],
        }));

        // Create preview URLs
        const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
        setPhotoPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    };

    const removePhoto = (index: number) => {
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(photoPreviewUrls[index]);

        setFormData((prev) => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        }));
        setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.property_type) {
            newErrors.property_type = 'Property type is required';
        }

        if (!formData.floor_area.trim()) {
            newErrors.floor_area = 'Floor area is required';
        } else if (isNaN(Number(formData.floor_area)) || Number(formData.floor_area) <= 0) {
            newErrors.floor_area = 'Please enter a valid floor area';
        }

        if (!formData.rent_price.trim()) {
            newErrors.rent_price = 'Rent price is required';
        } else if (isNaN(Number(formData.rent_price)) || Number(formData.rent_price) <= 0) {
            newErrors.rent_price = 'Please enter a valid rent price';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onSave(formData);
        } catch (error) {
            console.error('Error saving property:', error);
            alert('Failed to save property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LandlordLayout>
            <div className="space-y-6">
                {/* Header */}
                <LandlordPageHeader title={'Add Property'} subtitle={'Create a new rental unit listing'} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
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
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_number">Unit Number</Label>
                                    <Input
                                        id="unit_number"
                                        placeholder="1A, 2B, etc. (optional)"
                                        value={formData.unit_number}
                                        onChange={(e) => handleInputChange('unit_number', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full gap-4">
                                <div className="flex flex-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="property_type">Property Type *</Label>
                                        <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
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
                                            <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input
                                                id="rent_price"
                                                type="number"
                                                placeholder="1800"
                                                value={formData.rent_price}
                                                onChange={(e) => handleInputChange('rent_price', e.target.value)}
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
                                            value={formData.floor_area}
                                            onChange={(e) => handleInputChange('floor_area', e.target.value)}
                                            className={errors.floor_area ? 'border-red-500' : ''}
                                        />
                                        {errors.floor_area && <p className="text-sm text-red-500">{errors.floor_area}</p>}
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="availability_status">Availability Status</Label>
                                        <Select
                                            value={formData.availability_status}
                                            onValueChange={(value) => handleInputChange('availability_status', value)}
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
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Photos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Property Photos
                            </CardTitle>
                            <CardDescription>Upload photos to showcase your property (max 5MB each)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
                                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                                <label htmlFor="photo-upload" className="cursor-pointer">
                                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="mb-2 text-lg font-medium text-gray-900">Upload Property Photos</p>
                                    <p className="text-gray-500">Click to browse or drag and drop images here</p>
                                    <p className="mt-2 text-sm text-gray-400">PNG, JPG, GIF up to 5MB each</p>
                                </label>
                            </div>

                            {photoPreviewUrls.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {photoPreviewUrls.map((url, index) => (
                                        <div key={index} className="group relative">
                                            <img
                                                src={url || '/placeholder.svg'}
                                                alt={`Property photo ${index + 1}`}
                                                className="h-32 w-full rounded-lg border object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Amenities */}
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
                                            checked={formData.amenities.includes(amenity)}
                                            onCheckedChange={() => handleAmenityToggle(amenity)}
                                        />
                                        <Label htmlFor={amenity} className="cursor-pointer text-sm font-normal">
                                            {amenity}
                                        </Label>
                                    </div>
                                ))}
                            </div>

                            {formData.amenities.length > 0 && (
                                <div className="mt-4 border-t pt-4">
                                    <p className="mb-2 text-sm font-medium text-gray-700">Selected Amenities:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.amenities.map((amenity) => (
                                            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                                                <Check className="h-3 w-3" />
                                                {amenity}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Property Description</CardTitle>
                            <CardDescription>Provide additional details about the property</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the property, neighborhood, special features, etc."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="min-w-32">
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Saving...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Property
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </LandlordLayout>
    );
}
