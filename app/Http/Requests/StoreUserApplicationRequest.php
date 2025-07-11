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
            'prospective_tenant_id' => 'required|int',
            'unit_id' => 'required|int',
            'application_date' => 'required|date',
            'preferred_move_in_date' => 'nullable|date',
            'application_status' => 'required|enum',
            'additional_notes' => 'nullable|string',
        ];
    }
}
