<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RFIDPetition extends Model
{
    use HasFactory;

    protected $table = 'rfid_petitions';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
