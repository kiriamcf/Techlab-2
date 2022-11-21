<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::name('api.')->group(function () {
    Route::apiResource('laboratories', LaboratoryController::class);
    Route::apiResource('laboratories.machines', MachineController::class)->shallow();
    Route::apiResource('machines.reservations', ReservationController::class)->shallow();
    Route::post('/signin', [AuthenticationController::class, 'login']);
    Route::post('/signup', [AuthenticationController::class, 'register']);
    Route::post('/signout', [AuthenticationController::class, 'signOut']);
    Route::get('/user', [AuthenticationController::class, 'showUser']);
    Route::get('/get-available-hours', [ReservationController::class, 'getAvailableHours']);
});