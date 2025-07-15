<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestMaintenanceRequest extends FormRequest
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
            'tenant_id' => 'required|numeric',
            'unit_id' => 'required|numeric',
            'request_date' => 'required|date',
            'maintenance_description' => 'required|string',
            'priority_level' => 'required|string',
            'tenant_remarks' => 'nullable|string',
        ];
    }
}
