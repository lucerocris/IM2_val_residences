<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'user_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'user_contact_number' => ['required', 'string', 'max:20'],
            'current_address' => ['nullable', 'string', 'max:500'],
            'emergency_contact' => ['nullable', 'string', 'max:255'],
            'tenant_occupation' => ['nullable', 'string', 'max:255'],
            'employment_status' => ['nullable', 'string', 'max:255'],
            'monthly_income' => ['nullable', 'string', 'max:255'],
            'move_in_date' => ['nullable', 'date'],
            'user_type' => ['required', 'string', 'in:tenant'],
        ];

        // For creating new tenants, email must be unique
        if ($this->isMethod('post')) {
            $rules['email'][] = Rule::unique('users', 'email');
        }

        // For updating existing tenants, email must be unique except for current tenant
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['email'][] = Rule::unique('users', 'email')->ignore($this->route('tenant'));
        }

        return $rules;
    }
}
