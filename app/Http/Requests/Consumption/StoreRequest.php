<?php

namespace App\Http\Requests\Consumption;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            ?->can('create', [Consumption::class, $this->route('machine')]) ?? true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'value' => ['required', 'decimal:0,2'],
        ];
    }
}
