<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'landlord_id' => 'required|exists:users,id',
            'address' => 'required|string|max:255',
            'unit_number' => 'nullable|string|max:50',
            'availability_status' => 'required|in:available,occupied,maintenance,unavailable',
            'floor_area' => 'nullable|numeric|min:0',
            'rent_price' => 'required|numeric|min:0',
            'property_type' => 'required|in:duplex,triplex',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string|max:100',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,jpg,png,gif|max:5120', // 5MB max per image
        ];
    }

    public function messages(): array
    {
        return [
            'landlord_id.required' => 'The landlord is required.',
            'landlord_id.exists' => 'The selected landlord does not exist.',
            'address.required' => 'The address is required.',
            'rent_price.required' => 'Rent price is required.',
            'rent_price.numeric' => 'Rent price must be a valid number.',
            'property_type.in' => 'The property type must be either duplex or triplex.',
            'availability_status.in' => 'Invalid availability status.',
            'photos.*.image' => 'Each photo must be a valid image file.',
            'photos.*.mimes' => 'Photos must be in JPEG, JPG, PNG, or GIF format.',
            'photos.*.max' => 'Each photo must not exceed 5MB.',
            'floor_area.numeric' => 'Floor area must be a valid number.',
            'amenities.array' => 'Amenities must be provided as a list.',
            'amenities.*.string' => 'Each amenity must be a valid text.',
        ];
    }
}
