import FormAction from '@/components/landlord/addProperty/components/FormAction';
import PropertiesAmenitiesCard from '@/components/landlord/addProperty/components/PropertiesAmenitiesCard';
import PropertiesPhotosCard from '@/components/landlord/addProperty/components/PropertiesPhotosCard';
import PropertyDescriptionCard from '@/components/landlord/addProperty/components/PropertyDescriptionCard';
import PropertyInfoCard from '@/components/landlord/addProperty/components/PropertyInfoCard';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import LandlordLayout from '@/layout/LandlordLayout';
import type { PropertyFormData } from '@/types/propertyFormData.types';
import { router, useForm } from '@inertiajs/react';
import type React from 'react';
import { toast } from 'sonner';

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

    // this is triggered everytime you type in the input fields
    const handleInputChange = (field: keyof PropertyFormData, value: string | string[]) => {
        setData(field, value);
    };

    const handleAmenityToggle = (amenity: string) => {
        //this gets the current ammenities from the data array (from the useForm)
        const currentAmenities = data.amenities;
        const updatedAmenities = currentAmenities.includes(amenity) ? currentAmenities.filter((a) => a !== amenity) : [...currentAmenities, amenity];

        setData('amenities', updatedAmenities);
    };

    const handlePhotoUpload = (validFiles: File[]) => {
        // Update form data
        setData('photos', [...data.photos, ...validFiles]);
    };

    const removePhoto = (index: number) => {
        setData(
            'photos',
            data.photos.filter((_, i) => i !== index),
        );
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

        // Append amenities as an array
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
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        // Navigate back to a property list
        router.visit('/landlord/properties');
    };

    return (
        <LandlordLayout>
            <div className="space-y-6">
                {/* Header */}
                <LandlordPageHeader title={'Add Property'} subtitle={'Create a new rental unit listing'} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <PropertyInfoCard onInputChange={handleInputChange} data={data} errors={errors} />

                    {/* Photos */}
                    <PropertiesPhotosCard photos={data.photos} onPhotoUpload={handlePhotoUpload} onPhotoRemove={removePhoto} errors={errors} />

                    {/* Amenities */}
                    <PropertiesAmenitiesCard selectedAmenities={data.amenities} onAmenityToggle={handleAmenityToggle} errors={errors} />

                    {/* Description */}
                    <PropertyDescriptionCard description={data.description} onInputChange={handleInputChange} errors={errors} />

                    {/* Submit Buttons */}
                    <FormAction processing={processing} onCancel={handleCancel} />
                </form>
            </div>
        </LandlordLayout>
    );
}
