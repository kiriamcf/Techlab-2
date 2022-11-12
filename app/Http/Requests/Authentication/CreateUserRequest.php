<?php

namespace App\Http\Requests\Authentication;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'surname' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', 'min:6'],
            'email' => ['required', 'email:rfc,dns', 'unique:users,email'],
        ];
    }
}
