<?php

namespace App\Domains\Course\Actions;

use App\Domains\Course\Models\Course;
use App\Domains\Shared\Traits\Newable;

class UpdateCourseAction
{
    use Newable;

    public function execute(array $data, Course $course): Course
    {
        $course->update([
            'title' => data_get($data, 'title'),
            'description' => data_get($data, 'description'),
            'expired_at' => data_get($data, 'expiredAt'),
        ]);

        return $course;
    }
}
