<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MainSection;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);

Route::get('/tenant', [TenantController::class, 'index']);
Route::get('/tenant/listings', [TenantController::class, 'listings']);

Route::get('/user',[UserController::class, 'index']);
Route::get('/user/listings', [UserController::class, 'listings']);