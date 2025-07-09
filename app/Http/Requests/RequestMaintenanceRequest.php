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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tenant_id' => 'required|string',
            'lease_id' => 'required|string',
            'unit_id' => 'required|string',
            'request_date' => 'required|date',
            'maintenance_description' => 'required|string',
            'request_status' => 'required|string',
            'priority_level' => 'required|string',
            'tenant_remarks' => 'nullable|string',
        ];
    }
}
