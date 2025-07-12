import FormAction from '@/components/landlord/addProperty/components/FormAction';
import PropertiesAmenitiesCard from '@/components/landlord/addProperty/components/PropertiesAmenitiesCard';
import PropertiesPhotosCard from '@/components/landlord/addProperty/components/PropertiesPhotosCard';
import PropertyDescriptionCard from '@/components/landlord/addProperty/components/PropertyDescriptionCard';
import PropertyInfoCard from '@/components/landlord/addProperty/components/PropertyInfoCard';
import LandlordPageHeader from '@/components/landlord/ui/LandlordPageHeader';
import LandlordLayout from '@/layout/LandlordLayout';
import type { PropertyFormData } from '@/types/propertyFormData.types';
import { router, useForm, usePage } from '@inertiajs/react';
import type React from 'react';

interface AddPropertyProps {
    unit?: PropertyFormData;
    isEditing?: boolean;
}

export default function AddProperty({ unit, isEditing }: AddPropertyProps) {
    const { props } = usePage();
    const auth = (props as any).auth;

    const { data, setData, post, processing, errors, reset } = useForm<PropertyFormData>({
        address: unit?.address || '',
        unit_number: unit?.unit_number || '',
        property_type: unit?.property_type || '',
        floor_area: unit?.floor_area || '',
        rent_price: unit?.rent_price || '',
        availability_status: unit?.availability_status || 'available',
        description: unit?.description || '',
        amenities: Array.isArray(unit?.amenities) ? unit.amenities : [],
        photos: [] as File[],
    });

    // Debug logging
    console.log('Form data:', data);
    console.log('Landlord ID:', auth?.user?.id);

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
        // Update form data with File objects
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

        console.log('Submitting:', data);

        // Create submission data with landlord_id
        const submissionData = {
            ...data,
            landlord_id: auth.user.id,
        };

        console.log('Final submission data:', submissionData);

        if (isEditing && unit) {
            // For updates, use router.post with _method override
            router.post(
                `/landlord/properties/${unit.id}`,
                {
                    forceFormData: true,
                    ...submissionData,
                    _method: 'PUT',
                },
                {
                    forceFormData: true,
                    onError: (errors) => {
                        console.error('Edit form errors:', errors);
                    },
                },
            );
        } else {
            // For new properties, use the form helper's post method
            // Use router.post to include landlord_id
            router.post('/landlord/properties', submissionData, {
                forceFormData: true,
                onError: (errors) => {
                    console.error('Form submission errors:', errors);
                },
            });
        }
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
