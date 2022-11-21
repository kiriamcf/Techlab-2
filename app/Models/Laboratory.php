<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'room_number',
    ];

    protected $casts = [
        'name' => 'string',
        'room_number' => 'string'
    ];

    public function machines()
    {
        return $this->hasMany(Machine::class);
    }
}
