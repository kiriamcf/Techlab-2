<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string'
    ];

    public function laboratory() {
        return $this->belongsTo(Laboratory::class);
    }

    public function reservation() {
        return $this->hasMany(Reservation::class);
    }
}
