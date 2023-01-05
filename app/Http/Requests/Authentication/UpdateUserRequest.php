<?php

namespace App\Http\Requests\Authentication;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this
            ->user()
            ->can('update', $this->route('user'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['sometimes', 'string'],
            'surname' => ['sometimes', 'string'],
            'password' => ['sometimes', 'string', 'min:6'],
            'email' => ['sometimes', 'email:rfc,dns', Rule::unique('users', 'email')->ignore($this->user->id)],
            'rfid_card' => ['sometimes', 'string'],
            'admin' => ['sometimes', 'boolean'],
            'level_authorization' => ['sometimes', 'integer']
        ];
    }
}
