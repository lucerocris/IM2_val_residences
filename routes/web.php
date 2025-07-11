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
use App\Http\Controllers\RequestMaintenanceController;

Route::get('/', [MainSection::class, 'home']);
Route::get('/about', [MainSection::class, 'about']);
Route::get('/contact', [MainSection::class, 'contact']);


//Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

//Tenant Routes
Route::middleware('auth', 'user.type:tenant')->group(function () {
    Route::get('/tenant/dashboard', [TenantController::class, 'index']);
    Route::get('/tenant/listings', [TenantController::class, 'listings']);


// Tenant Maintenance Request
    Route::post('/tenant/maintenanceRequest', [RequestMaintenanceController::class, 'store']);

// Tenant Payment Upload
    Route::get('/tenant/payments/gcash', [TenantController::class, 'gcash']);
    Route::get('/tenant/payments/paymaya', [TenantController::class, 'paymaya']);
    Route::get('/tenant/payments/bankTransfer', [TenantController::class, 'bank']);
});

//Prospective Routes
Route::middleware('auth', 'user.type:prospective_tenant')->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/user/listings', [UserController::class, 'index'])->name('user.listings');
    Route::post('/user/application', [UserController::class, 'storeApplication'])->name('user.applications.store');
});


Route::middleware('auth', 'user.type:landlord')->group(function () {
    // Landlord Dashboard
    Route::get('/landlord/dashboard', [DashboardController::class, 'index']);


// Landlord Rental Unit
    Route::get('/landlord/properties', [RentalUnitController::class, 'index'])->name('landlord.properties');
    Route::post('/landlord/properties', [RentalUnitController::class, 'store']);
    Route::get('/landlord/properties/create', [RentalUnitController::class, 'create']);
    Route::get('/landlord/properties/{id}/edit', [RentalUnitController::class, 'edit']);
    Route::put('/landlord/properties/{id}', [RentalUnitController::class, 'update']);
    Route::delete('/landlord/properties/{id}', [RentalUnitController::class, 'destroy'])->name('unit.destroy');

// Landlord Tenants
    Route::get('/landlord/tenants', [TenantLandlordController::class, 'index'])->name('tenants.index');
    Route::get('/landlord/tenants/create', [TenantLandlordController::class, 'create']);
    Route::get('/landlord/tenants/{id}/edit', [TenantLandlordController::class, 'edit']);
    Route::put('/landlord/tenants/{id}', [TenantLandlordController::class, 'update']);
    Route::delete('/landlord/tenants/{id}', [TenantLandlordController::class, 'destroy'])->name('tenants.destroy');

// Landlord applications
    Route::get('/landlord/applications', [RentalApplicationController::class, 'index']);

// Landlord leases
    Route::get('/landlord/leases', [LeaseController::class, 'index'])->name('leases.index');
    Route::get('/landlord/leases/create', [LeaseController::class, 'create']);
    Route::get('/landlord/leases/{lease_id}/{unit_id}/{tenant_id}/edit', [LeaseController::class, 'edit']);
    Route::post('/landlord/leases', [LeaseController::class, 'store']);
    Route::put('/landlord/leases/{id}', [LeaseController::class, 'update']);

// Landlord payments
    Route::get('/landlord/payments/rent-collection', [FinanceController::class, 'rent']);
    Route::get('/landlord/payments/report', [FinanceController::class, 'report']);
// Landlord Delete Lease
    Route::delete('/landlord/leases/{id}', [LeaseController::class, 'destroy'])->name('leases.destroy');



// Landlord maintenance requests
    Route::get('/landlord/maintenance/requests', [MaintenanceController::class, 'index'])->name('maintenance.index');
    Route::delete('/landlord/maintenance/{id}', [MaintenanceController::class, 'destroy']);
    Route::patch('/landlord/maintenance/{id}/complete', [MaintenanceController::class, 'completeMaintenance']);
    Route::patch('/landlord/maintenance/{id}/start', [MaintenanceController::class, 'startMaintenance']);


// Landlord Update Prospective to Tenant && Delete Applications of the same unit && Send Message
    Route::get('/landlord/applications', [RentalApplicationController::class, 'index'])->name('landlord.applications.index');
    Route::patch('/landlord/applications/{application}/status', [RentalApplicationController::class, 'updateStatus'])->name('landlord.applications.update-status');
    Route::post('/landlord/applications/{application}/message', [RentalApplicationController::class, 'sendMessage'])->name('landlord.applications.send-message');
});
