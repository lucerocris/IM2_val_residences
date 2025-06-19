<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MainSection;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);



