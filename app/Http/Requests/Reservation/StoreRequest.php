<?php

namespace App\Http\Requests\Reservation;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            ->can('create', [Reservation::class, $this->route('machine')]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'hour' => ['required', 'integer'],
            'day' => ['required', 'date:Y-m-d'],
        ];
    }
}
