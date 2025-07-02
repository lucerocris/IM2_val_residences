<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MainSection;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LandlordAdmin\DashboardController;
use App\Http\Controllers\LandlordAdmin\PropertiesController;
use App\Http\Controllers\LandlordAdmin\TenantLandlordController;
use App\Http\Controllers\LandlordAdmin\FinanceController;
use App\Http\Controllers\LandlordAdmin\MaintenanceController;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);

Route::get('/tenant', [TenantController::class, 'index']);
Route::get('/tenant/listings', [TenantController::class, 'listings']);

Route::get('/user',[UserController::class, 'index']);
Route::get('/user/listings', [UserController::class, 'listings']);


Route::get('/landlord/dashboard', [DashboardController::class, 'index']);
Route::get('/landlord/properties', [PropertiesController::class, 'index']);
Route::get('/landlord/properties/create', [PropertiesController::class, 'create']);
Route::get('/landlord/tenants', [TenantLandlordController::class, 'index']);
Route::get('/landlord/applications', [TenantLandlordController::class, 'applications']);
Route::get('/landlord/leases', [TenantLandlordController::class, 'leases']);
Route::get('/landlord/payments/rent-collection', [FinanceController::class, 'rent']);
Route::get('/landlord/payments/report', [FinanceController::class, 'report']);
Route::get('/landlord/maintenance/requests', [MaintenanceController::class, 'index']);