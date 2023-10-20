<?php

namespace App\Domains\Course\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Course extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'description',
        'expired_at'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('video')->singleFile();
    }

    public function getVideoAttribute()
    {
        return optional($this->getFirstMedia('video'))->getFullUrl();
    }
}
