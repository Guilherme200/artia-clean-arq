<?php

namespace App\Domains\Course\Actions;

use App\Domains\Course\Models\Course;
use App\Domains\Shared\Traits\Newable;

class CreateCourseAction
{
    use Newable;

    public function execute(array $data): Course
    {
        return app(Course::class)->create([
            'title' => data_get($data, 'title'),
            'description' => data_get($data, 'description'),
            'expired_at' => data_get($data, 'expiredAt'),
        ]);
    }
}
