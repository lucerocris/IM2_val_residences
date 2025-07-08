<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainSection;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LandlordAdmin\DashboardController;
use App\Http\Controllers\LandlordAdmin\RentalUnitController;
use App\Http\Controllers\LandlordAdmin\TenantLandlordController;
use App\Http\Controllers\LandlordAdmin\FinanceController;
use App\Http\Controllers\LandlordAdmin\MaintenanceController;
use App\Http\Controllers\LandlordAdmin\RentalApplicationController;
use App\Http\Controllers\LandlordAdmin\LeaseController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);

//Auth pages
Route::get('/login', [AuthenticatedSessionController::class, 'create']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/register', [RegisteredUserController::class, 'create']);
Route::post('/register', [RegisteredUserController::class, 'store']);

// Tenant User
Route::get('/tenant/dashboard', [TenantController::class, 'index']);
Route::get('/tenant/listings', [TenantController::class, 'listings']);

// Prospective Tenant
Route::get('/user',[UserController::class, 'index'])->name('user.dashboard');
Route::get('/user/listings', [UserController::class, 'listings']);


// Landlord Dashboard
Route::get('/landlord/dashboard', [DashboardController::class, 'index']);

// Landlord Rental Unit
Route::get('/landlord/properties', [RentalUnitController::class, 'index'])->name('landlord.properties');
Route::post('/landlord/properties', [RentalUnitController::class, 'store']);
Route::get('/landlord/properties/create', [RentalUnitController::class, 'create']);

// Landlord Tenants
Route::get('/landlord/tenants', [TenantLandlordController::class, 'index']);
Route::get('/landlord/tenants/create', [TenantLandlordController::class, 'create']);

// Landlord applications
Route::get('/landlord/applications', [RentalApplicationController::class, 'index']);

// Landlord leases
Route::get('/landlord/leases', [LeaseController::class, 'index'])->name('leases.index');
Route::get('/landlord/leases/create', [LeaseController::class, 'create']);
Route::post('/landlord/leases', [LeaseController::class, 'store']);

// Landlord payments
Route::get('/landlord/payments/rent-collection', [FinanceController::class, 'rent']);
Route::get('/landlord/payments/report', [FinanceController::class, 'report']);

// Landlord maintenance requests
Route::get('/landlord/maintenance/requests', [MaintenanceController::class, 'index']);
