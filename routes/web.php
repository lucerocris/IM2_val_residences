<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MainSection;
use App\Http\Controllers\TenantController;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);

Route::get('/tenant', [TenantController::class, 'index']);

