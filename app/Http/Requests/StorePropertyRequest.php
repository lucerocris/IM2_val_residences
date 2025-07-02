<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        // You can adjust this to restrict access based on roles if needed
        return true;
    }

    public function rules(): array
    {
        return [
            'address' => 'required|string|max:255',
            'unit_number' => 'nullable|string|max:50',
            'availability_status' => 'required|in:available,occupied,maintenance,unavailable',
            'floor_area' => 'nullable|numeric|min:0',
            'rent_price' => 'required|numeric|min:0',
            'property_type' => 'required|in:duplex,triplex',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string|max:100',
            'unit_photos' => 'nullable|array',
            'unit_photos.*' => 'url', // or use 'image' if you upload files
        ];
    }

    public function messages(): array
    {
        return [
            'landlord_id.required' => 'The landlord is required.',
            'address.required' => 'The address is required.',
            'rent_price.required' => 'Rent price is required.',
            'property_type.in' => 'The property type must be either duplex or triplex.',
            'availability_status.in' => 'Invalid availability status.',
        ];
    }
}

