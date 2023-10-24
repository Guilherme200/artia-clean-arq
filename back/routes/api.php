<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
Route::get('/courses/{course}/video', [CourseController::class, 'video']);
Route::put('/courses/{course}', [CourseController::class, 'update']);
Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
