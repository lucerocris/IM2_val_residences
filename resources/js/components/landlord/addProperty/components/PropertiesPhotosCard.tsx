import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PropertyFormData } from '@/types/propertyFormData.types';
import { Camera, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

interface PropertiesPhotosCardProps {
    photos: File[];
    onPhotoUpload: (validFiles: File[]) => void;
    onPhotoRemove: (index: number) => void;
    errors: Partial<Record<keyof PropertyFormData, string>>;
}
const PropertiesPhotosCard = ({ photos, onPhotoUpload, onPhotoRemove, errors }: PropertiesPhotosCardProps) => {
    const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        // Validate files
        const validFiles = files.filter((file) => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            alert('Some files were skipped. Please upload only images under 5MB.');
        }

        // Call parent function
        onPhotoUpload(validFiles);

        // Create preview URLs
        const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
        setPhotoPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    };

    const removePhoto = (index: number) => {
        // Clean up URL
        URL.revokeObjectURL(photoPreviewUrls[index]);
        // Update previews
        setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
        // Call parent function
        onPhotoRemove(index);
    };

    return (
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
    );
};

export default PropertiesPhotosCard;
