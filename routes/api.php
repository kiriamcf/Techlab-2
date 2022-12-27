<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RFIDPetitionController;
use App\Http\Controllers\HardwareController;

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

Route::name('api.')->group(function () {
    Route::apiResource('laboratories', LaboratoryController::class);
    Route::apiResource('laboratories.machines', MachineController::class)->shallow();
    Route::apiResource('machines.reservations', ReservationController::class)->shallow();
    Route::apiResource('rfid_petitions', RFIDPetitionController::class)->shallow()->except('destroy');
    Route::match(['put', 'patch'], '/rfid_petitions/{rfid_petition}/solve', [RFIDPetitionController::class, 'destroy'])->name('rfid_petitions.destroy');
    Route::post('/signin', [AuthenticationController::class, 'login'])->name('auth.login');
    Route::post('/signup', [AuthenticationController::class, 'register'])->name('auth.register');
    Route::post('/signout', [AuthenticationController::class, 'signOut'])->name('auth.sign_out');
    Route::get('/user', [AuthenticationController::class, 'showUser'])->name('auth.show_user');
    Route::match(['put', 'patch'], '/users/{user}', [AuthenticationController::class, 'updateUser'])->name('auth.update_user');
    Route::get('/user/reservations', [ReservationController::class, 'userIndex'])->name('reservations.user_index');
    // Route::delete('/user/{user}', [AuthenticationController::class, 'deleteUser']);
    Route::get('/get-available-hours', [ReservationController::class, 'getAvailableHours'])->name('get_available_hours');
    Route::post('/status', [HardwareController::class,'status'])->name('status');
    Route::match(['put', 'patch'], '/diagnostic', [HardwareController::class,'diagnostic'])->name('diagnostic');
    Route::get('/machines', [MachineController::class,'indexAll'])->name('machines.index');
});