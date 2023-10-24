<?php

namespace App\Http\Controllers\Api;

use App\Domains\Course\Actions\UpdateCourseAction;
use App\Domains\Course\Models\Course;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Domains\Course\Actions\CreateCourseAction;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $queryBuilder = Course::query();

        if ($query = $request->query('query')) {
            $queryBuilder
                ->where('title', 'ilike', "%$query")
                ->orWhere('description', 'ilike', "%$query");
        }

        if ($status = $request->query('status')) {
            if ($status === 'active')
                $queryBuilder->where('expired_at', '>=', now());
            if ($status === 'inactive') {
                $queryBuilder->where('expired_at', '<', now());
            }
        }

        $courses = $queryBuilder->paginate(5);

        return CourseResource::collection($courses);
    }

    public function store(CourseRequest $request): CourseResource
    {
        $data = $request->validated();
        $course = CreateCourseAction::new()->execute($data);
        return CourseResource::make($course);
    }

    public function show(Course $course): CourseResource
    {
        return CourseResource::make($course);
    }

    public function video(Course $course)
    {
        $path = $course->getFirstMedia('video')->getPath();
        return response()->file($path, ['Content-Type' => 'video/mp4']);
    }

    public function update(CourseRequest $request, Course $course): CourseResource
    {
        $data = $request->validated();
        $course = UpdateCourseAction::new()->execute($data, $course);
        return CourseResource::make($course);
    }

    public function destroy(Course $course): CourseResource
    {
        $course->delete();
        return CourseResource::make($course);
    }
}
