<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserApplicationRequest extends FormRequest
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
            'prospective_tenant_id'   => 'required|exists:Users,id',
            'unit_id'                 => 'required|exists:rental_units,id',
            'application_date'     => 'required|date',
            'application_status'  => 'required|string|max:1000',
            'preferred_move_in_date'  => 'required|date|after:today',
            'additional_notes'        => 'nullable|string|max:1000',
            'monthly_income'           => 'nullable|numeric|min:0',
            'employment_status'       => 'nullable|in:employed,self-employed,unemployed,student',
        ];
    }
}
