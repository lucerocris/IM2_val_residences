<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


use Illuminate\Validation\Rules\Password;


class RegisterRequest extends FormRequest
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
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'user_contact_number' => 'required|string|max:20',
            'monthly_income' => 'nullable|numeric|min:0|max:999999.99',
            'current_address' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'user_name.required' => 'Full name is required.',
            'email.unique' => 'This email is already registered.',
            'user_contact_number.required' => 'Contact number is required.',
            'monthly_income.numeric' => 'Monthly income must be a valid number.',
            'monthly_income.min' => 'Monthly income cannot be negative.',
        ];
    }
}
