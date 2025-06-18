<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LandingController;

Route::get('/', [LandingController::class, 'index']);



