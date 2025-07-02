'use client';

import type React from 'react';

import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import LandlordLayout from '@/layout/LandlordLayout';
import { router, useForm } from '@inertiajs/react';
import { Camera, Check, DollarSign, Home, MapPin, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';

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
    [key: string]: string | string[] | File[];
}

const availableAmenities = ['Covered Parking', 'Dirty Kitchen', 'Pet Friendly', 'Tile Floors', 'Balcony'];

interface AddPropertyProps {
    landlord_id?: number;
}

export default function AddProperty({ landlord_id = 1 }: AddPropertyProps) {
    const { data, setData, post, processing, errors, reset } = useForm<PropertyFormData>({
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

    const handleInputChange = (field: keyof PropertyFormData, value: string | string[]) => {
        setData(field, value);
    };

    const handleAmenityToggle = (amenity: string) => {
        const currentAmenities = data.amenities;
        const updatedAmenities = currentAmenities.includes(amenity) ? currentAmenities.filter((a) => a !== amenity) : [...currentAmenities, amenity];

        setData('amenities', updatedAmenities);
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
        setData('photos', [...data.photos, ...validFiles]);

        // Create preview URLs
        const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
        setPhotoPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    };

    const removePhoto = (index: number) => {
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(photoPreviewUrls[index]);

        setData(
            'photos',
            data.photos.filter((_, i) => i !== index),
        );
        setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Create FormData for file upload
        const formData = new FormData();

        // Append landlord_id
        formData.append('landlord_id', landlord_id.toString());

        // Append regular form fields
        formData.append('address', data.address);
        formData.append('unit_number', data.unit_number);
        formData.append('property_type', data.property_type);
        formData.append('floor_area', data.floor_area);
        formData.append('rent_price', data.rent_price);
        formData.append('availability_status', data.availability_status);
        formData.append('description', data.description);

        // Append amenities as array
        data.amenities.forEach((amenity, index) => {
            formData.append(`amenities[${index}]`, amenity);
        });

        // Append photos
        data.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        // Submit using Inertia with file upload
        router.post('/landlord/properties', formData, {
            forceFormData: true,
            onSuccess: () => {
                // Clean up preview URLs
                photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
                setPhotoPreviewUrls([]);

                // Navigate back to properties list
                router.visit('/landlord/properties');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        // Clean up preview URLs before navigating
        photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setPhotoPreviewUrls([]);

        // Navigate back to properties list
        router.visit('/landlord/properties');
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
                                        value={data.address}
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
                                        value={data.unit_number}
                                        onChange={(e) => handleInputChange('unit_number', e.target.value)}
                                    />
                                    {errors.unit_number && <p className="text-sm text-red-500">{errors.unit_number}</p>}
                                </div>
                            </div>

                            <div className="flex w-full gap-4">
                                <div className="flex flex-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="property_type">Property Type *</Label>
                                        <Select value={data.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
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
                                                value={data.rent_price}
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
                                            value={data.floor_area}
                                            onChange={(e) => handleInputChange('floor_area', e.target.value)}
                                            className={errors.floor_area ? 'border-red-500' : ''}
                                        />
                                        {errors.floor_area && <p className="text-sm text-red-500">{errors.floor_area}</p>}
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="availability_status">Availability Status</Label>
                                        <Select
                                            value={data.availability_status}
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
                                        {errors.availability_status && <p className="text-sm text-red-500">{errors.availability_status}</p>}
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

                            {errors.photos && <p className="text-sm text-red-500">{errors.photos}</p>}
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
                                            checked={data.amenities.includes(amenity)}
                                            onCheckedChange={() => handleAmenityToggle(amenity)}
                                        />
                                        <Label htmlFor={amenity} className="cursor-pointer text-sm font-normal">
                                            {amenity}
                                        </Label>
                                    </div>
                                ))}
                            </div>

                            {data.amenities.length > 0 && (
                                <div className="mt-4 border-t pt-4">
                                    <p className="mb-2 text-sm font-medium text-gray-700">Selected Amenities:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.amenities.map((amenity) => (
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
                                    value={data.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-32">
                            {processing ? (
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
