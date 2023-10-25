<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;

class CourseRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|min:5|max:255',
            'description' => 'required|string|min:5|max:255',
            'video' => 'required|file|mimes:mp4,mov',
            'expiredAt' => 'required|date',
        ];

        if ($this->method() === 'PUT') {
            $rules['video'] = 'nullable|file|mimes:mp4';
        }

        return $rules;
    }
}
