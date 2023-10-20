<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'video' => 'url',
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'expiredAt' => $this->expired_at,
        ];
    }
}
