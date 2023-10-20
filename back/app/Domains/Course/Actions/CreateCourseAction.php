<?php

namespace App\Domains\Course\Actions;

use App\Domains\Course\Models\Course;
use App\Domains\Shared\Traits\Newable;

class CreateCourseAction
{
    use Newable;

    public function execute(array $data): Course
    {
        $course = app(Course::class)->create([
            'title' => data_get($data, 'title'),
            'description' => data_get($data, 'description'),
            'expired_at' => data_get($data, 'expiredAt'),
        ]);

        if ($video = data_get($data, 'video')) {
            $course->addMedia($video)->toMediaCollection('video');
        }

        return $course;
    }
}
