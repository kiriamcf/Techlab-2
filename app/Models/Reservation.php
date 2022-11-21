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
        'day' => 'date:Y-m-d',
        // 'updated_at' => 'datetime:d-m-Y',
        // 'created_at' => 'datetime:d-m-Y',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }
}
