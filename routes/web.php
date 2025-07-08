<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);



// Tenant User


Route::get('/tenant/dashboard', [TenantController::class, 'index']);

Route::get('/tenant/listings', [TenantController::class, 'listings']);

Route::get('/tenant/payments/gcash', [TenantController::class, 'gcash']);
Route::get('/tenant/payments/paymaya', [TenantController::class, 'paymaya']);
Route::get('/tenant/payments/bankTransfer', [TenantController::class, 'bank']);

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
