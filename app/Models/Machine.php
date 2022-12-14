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
        'active',
        'level_required',
        'url',
        'laboratory_id'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'active' => 'boolean',
        'level_required' => 'integer',
        'url' => 'string',
        'laboratory_id' => 'integer',
    ];

    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function deactivate()
    {
        $this->update(['active' => false]);
    }

    public function consumptions()
    {
        return $this->hasMany(Consumption::class);
    }
}
