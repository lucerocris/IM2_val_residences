<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RentalBill extends Model
{
    use HasFactory;

    protected $fillable = [
        'lease_id',
        'billing_date',
        'rent_amount',
        'due_date',
        'paid_date',
        'amount_paid',
        'payment_status',
        'proof_of_payment_path',
    ];

    protected $casts = [
        'billing_date' => 'date',
        'due_date' => 'date',
        'paid_date' => 'date',
    ];

    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }

    public static function getPaidRevenueThisMonth($startOfMonth, $endOfMonth)
    {
        return DB::table('rental_bills')
            ->whereIn('payment_status', ['partial', 'paid'])
            ->whereBetween('paid_date', [$startOfMonth, $endOfMonth])
            ->sum('rent_amount');
    }

    public static function getMonthlyRevenue($monthsBack = 6)
    {
        $data = [];

        for ($i = $monthsBack - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthYear = $date->format('M Y');

            $revenue = self::whereMonth('paid_date', $date->month)
                ->whereYear('paid_date', $date->year)
                ->where('payment_status', 'paid')
                ->sum('amount_paid');

            $data[] = [
                'month' => $monthYear,
                'revenue' => (float)$revenue,
                'date' => $date
            ];
        }
        return $data;
    }

    public static function getFinancialReportData()
    {
        return self::with([
            'lease:id,tenant_id,unit_id',
            'lease.units:id,address,unit_number,rent_price',
            'lease.tenant:id,user_name,user_contact_number'
        ])
            ->whereHas('lease')
            ->whereYear('paid_date', Carbon::now()->year)
            ->where('payment_status', 'paid')
            ->get()
            ->map(function ($bill) {
                if (!$bill->lease || !$bill->lease->tenant || !$bill->lease->units) {
                    return null;
                }

                return [
                    'id' => $bill->id,
                    'lease' => [
                        'id' => $bill->lease->id,
                        'tenant' => [
                            'id' => $bill->lease->tenant->id,
                            'user_name' => $bill->lease->tenant->user_name,
                            'user_contact_number' => $bill->lease->tenant->user_contact_number,
                        ],
                        'units' => [
                            'id' => $bill->lease->units->id,
                            'address' => $bill->lease->units->address,
                            'unit_number' => $bill->lease->units->unit_number,
                            'rent_price' => (float)$bill->lease->units->rent_price,
                        ]
                    ],
                    'billing_date' => $bill->billing_date->format('Y-m-d'),
                    'due_date' => $bill->due_date->format('Y-m-d'),
                    'rent_amount' => (float)$bill->rent_amount,
                    'paid_date' => $bill->paid_date ? $bill->paid_date->format('Y-m-d') : null,
                    'amount_paid' => (float)$bill->amount_paid,
                    'payment_status' => $bill->payment_status,
                    'month' => $bill->paid_date ? $bill->paid_date->format('M Y') : null,
                ];
            })
            ->filter()
            ->values()
            ->toArray();
    }

    public static function getYearlyRevenueByProperty($year = null)
    {
        $year = $year ?: Carbon::now()->year;

        return self::with([
            'lease:id,unit_id',
            'lease.units:id,address'
        ])
            ->whereYear('paid_date', $year)
            ->where('payment_status', 'paid')
            ->get()
            ->groupBy(function ($bill) {
                return $bill->lease && $bill->lease->units ? $bill->lease->units->address : 'Unknown Property';
            })
            ->map(function ($bills, $address) {
                return [
                    'address' => $address,
                    'yearly_revenue' => (float)$bills->sum('amount_paid')
                ];
            })
            ->values()
            ->toArray();
    }

    public static function getTableData()
    {
        return RentalBill::with([
            'lease:id,tenant_id,unit_id',
            'lease.units:id,address,unit_number',
            'lease.tenant:id,user_name,user_contact_number'
        ])
            ->whereHas('lease')
            ->get()
            ->map(function ($bill) {

                if (!$bill->lease || !$bill->lease->tenant || !$bill->lease->units) {
                    return null; // Null check, skip this if empty
                }

                return [
                    'id' => $bill->id,
                    'lease' => [
                        'id' => $bill->lease->id,
                        'tenant' => [
                            'id' => $bill->lease->tenant->id,
                            'user_name' => $bill->lease->tenant->user_name,
                            'user_contact_number' => $bill->lease->tenant->user_contact_number,
                        ],
                        'units' => [
                            'id' => $bill->lease->units->id,
                            'address' => $bill->lease->units->address,
                            'unit_number' => $bill->lease->units->unit_number,
                        ]
                    ],
                    'billing_date' => $bill->billing_date->format('Y-m-d'),
                    'due_date' => $bill->due_date->format('Y-m-d'),
                    'proof_of_payment_path' => $bill->proof_of_payment_path,
                    'rent_amount' => (float)$bill->rent_amount,
                    'paid_date' => $bill->paid_date ? $bill->paid_date->format('Y-m-d') : null,
                    'amount_paid' => (float)$bill->amount_paid,
                    'payment_status' => $bill->payment_status,
                ];
            })
            ->filter()
            ->values()
            ->toArray();
    }

    public static function getOwnBills(int $lease_id)
    {
        return DB::table('rental_bills')
            ->where('lease_id', $lease_id)
            ->where(function ($query) {
                $query->where('payment_status', 'pending')
                    ->orWhere('payment_status', 'overdue');
            })
            ->select(
                'lease_id',
                DB::raw('SUM(rent_amount) as rent_amount'),
                DB::raw('SUM(amount_paid) AS amount_paid'),
                DB::raw('MIN(payment_status) as payment_status'),
                DB::raw('SUM(rent_amount) - SUM(amount_paid) AS balance'),
                DB::raw('MIN(due_date) AS due_date'),
            )
            ->groupBy('lease_id')
            ->get();
    }

    public static function getBills(int $lease_id) {
        return DB::table('rental_bills')->where('lease_id', $lease_id)->where(function ($query) {
            $query->where('payment_status', 'pending')
                ->orWhere('payment_status', 'overdue');
        })->select('id', 'lease_id', 'billing_date', 'rent_amount', 'due_date', 'payment_status')->get()->toArray();
    }
    public static function getOverdue()
    {
        return DB::table('rental_bills')
            ->where('rental_bills.payment_status', '=', 'overdue')
            ->join('leases', 'rental_bills.lease_id', '=', 'leases.id')
            ->join('users', 'leases.tenant_id', '=', 'users.id')
            ->select(
                'rental_bills.lease_id',
                'users.user_name',
                DB::raw('SUM(rental_bills.rent_amount) - SUM(rental_bills.amount_paid) AS balance'),
                DB::raw('MIN(rental_bills.due_date) AS due_date')
            )
            ->groupBy('rental_bills.lease_id', 'users.user_name')
            ->having('balance', '>', 0)
            ->get();
    }

    public static function getNumberOfOverdue() {
        return DB::table('rental_bills')->where('payment_status', '=', 'overdue')->count();
    }
}




//export interface RentalBill {
//id: number,
//lease_id: number,
//billing_date: string,
//rent_amount: string,
//due_date: string,
//paid_date: string,
//amount_paid: number,
//payment_status: 'pending' | 'paid' | 'overdue' | 'partial',
//}
