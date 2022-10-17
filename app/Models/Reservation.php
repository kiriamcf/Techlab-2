<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'hour',
        'day',
    ];

    protected $casts = [
        'hour' => 'integer',
        'day' => 'date'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function machine() {
        return $this->belongsTo(Machine::class);
    }
}
