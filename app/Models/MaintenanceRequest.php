<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'unit_id',
        'lease_id',
        'request_date',
        'maintenance_description',
        'request_status',
        'priority_level',
        'scheduled_date',
        'completion_date',
        'tenant_remarks',
        'landlord_notes',
        'estimated_cost',
        'actual_cost'
    ];

    protected $casts = [
        'request_date' => 'date',
        'scheduled_date' => 'date',
        'completion_date' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }

    public function unit()
    {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public static function getMonthlyExpenses($monthsBack = 6) {
        $data = [];

        for($i = $monthsBack - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);

            $expenses = self::whereMonth('completion_date', $date->month)
                ->whereYear('completion_date', $date->year)
                ->where('request_status', 'completed')
                ->sum('actual_cost');

            $data[] = [
                'month' => $date->format('M Y'),
                'expenses' => (float) $expenses,
                'date' => $date
            ];
        }
        return $data;
    }

    public static function getFinancialReportExpenses() {
        return self::with([
            'units:id,address,unit_number'
        ])
        ->where('request_status', 'completed')
        ->whereNotNull('actual_cost')
        ->whereYear('completion_date', Carbon::now()->year)
        ->get()
        ->map(function ($request) {
            if (!$request->units) {
                return null;
            }

            return [
                'id' => $request->id,
                'date' => $request->completion_date->format('Y-m-d'),
                'property' => $request->units->address,
                'unit_number' => $request->units->unit_number,
                'description' => $request->maintenance_description,
                'cost' => (float) $request->actual_cost,
                'category' => ucfirst($request->priority_level),
                'completion_date' => $request->completion_date->format('Y-m-d'),
            ];
        })
        ->filter()
        ->values()
        ->sortByDesc('completion_date')
        ->toArray();
    }

    public static function getYearlyExpensesByProperty($year = null) {
        $year = $year ?: Carbon::now()->year;

        return self::with('units:id,address')
            ->whereYear('completion_date', $year)
            ->where('request_status', 'completed')
            ->whereNotNull('actual_cost')
            ->get()
            ->groupBy(function($request) {
                return $request->units ? $request->units->address : 'Unknown Property';
            })
            ->map(function($requests, $address) {
                return [
                    'address' => $address,
                    'yearly_expenses' => (float) $requests->sum('actual_cost')
                ];
            })
            ->values()
            ->toArray();
    }

    public static function getRecentExpenses($limit = 20) {
        return self::with('units:id,address,unit_number')
            ->where('request_status', 'completed')
            ->whereNotNull('actual_cost')
            ->orderBy('completion_date', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($expense) {
                if (!$expense->units) {
                    return null;
                }

                return [
                    'date' => $expense->completion_date->format('Y-m-d'),
                    'property' => $expense->units->address,
                    'description' => $expense->maintenance_description,
                    'cost' => (float) $expense->actual_cost,
                    'category' => ucfirst($expense->priority_level),
                ];
            })
            ->filter()
            ->values()
            ->toArray();
    }

    public static function getLimitedMaintenanceRequestsWithUnits($limit) {
        return DB::table('maintenance_requests')
            ->join('rental_units', 'maintenance_requests.unit_id', '=', 'rental_units.id')
            ->select('maintenance_requests.id', 'rental_units.unit_number', 'maintenance_requests.request_status', 'maintenance_requests.priority_level', 'maintenance_requests.maintenance_description', 'maintenance_requests.request_date')
            ->limit($limit)
            ->get();
    }

    public static function getNumberOfMaintenanceRequests() {
        return MaintenanceRequest::all()->count();
    }

    public static function getTableData() {
        return MaintenanceRequest::with([
            'tenant:id,user_name,email,user_contact_number',
            'unit:id,address,unit_number,property_type,landlord_id',
            'unit.landlord:id,user_name',
            'lease:id,start_date,end_date,lease_status',
        ])->get()->toArray();
    }

    public static function getMaintenanceRequests(int $tenant_id) {
        return DB::table('maintenance_requests')
            ->where('tenant_id', '=', $tenant_id)
            ->select('id', 'tenant_id', 'unit_id', 'lease_id', 'request_date', 'maintenance_description', 'request_status', 'priority_level', 'completion_date', 'tenant_remarks', 'completion_date')
            ->get();

    }
}

