<?php

namespace App\Http\Controllers\Api;

use App\Domains\Course\Actions\UpdateCourseAction;
use App\Domains\Course\Models\Course;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Domains\Course\Actions\CreateCourseAction;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(['status' => 'index']);
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
