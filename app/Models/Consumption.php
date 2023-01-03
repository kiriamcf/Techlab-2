<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consumption extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
    ];

    protected $casts = [
        'value' => 'float',
    ];

    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }
}
