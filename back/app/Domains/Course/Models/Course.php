<?php

namespace App\Domains\Course\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'expired_at'
    ];
}
