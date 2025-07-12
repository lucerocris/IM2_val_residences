<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTenantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'user_name' => 'required|string',
        'email' => 'required|string',
        'password' => 'nullable|string',
        'user_contact_number' => 'required|string',
        'employment_status' => 'required|string',
        'emergency_contact' => 'required|string',
        'tenant_occupation' => 'required|string',
        'monthly_income' => 'required|string',
        ];
    }
}
