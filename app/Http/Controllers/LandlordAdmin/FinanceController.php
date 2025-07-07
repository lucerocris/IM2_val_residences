<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\RentalBill;
use App\Models\RentalUnit;
use App\Models\MaintenanceRequest;

class FinanceController extends Controller
{
    public function rent() {
        $rentData = RentalBill::getTableData();
        return Inertia::render('landlord/RentCollection', [
            'rentData' => $rentData,
            'rents' => $rentData,
        ]);
    }

    public function report() {
        $financialData = $this->getFinancialReportData();

        return Inertia::render('landlord/FinancialReport', $financialData);
    }

    private function getFinancialReportData()
    {
        $monthlyRevenue = $this->getMonthlyRevenue();
        $propertyPerformance = RentalUnit::getPropertyPerformanceData();
        $maintenanceExpenses = MaintenanceRequest::getFinancialReportExpenses();
        $metrics = $this->calculateMetrics($monthlyRevenue, $propertyPerformance);

        return [
            'monthlyRevenue' => $monthlyRevenue,
            'propertyPerformance' => $propertyPerformance,
            'maintenanceExpenses' => $maintenanceExpenses,
            'metrics' => $metrics
        ];
    }

    private function getMonthlyRevenue()
    {
        $revenueData = RentalBill::getMonthlyRevenue();
        $expenseData = MaintenanceRequest::getMonthlyExpenses();

        // Combine revenue and expense data
        $monthlyData = [];
        foreach ($revenueData as $index => $revenue) {
            $expenses = $expenseData[$index]['expenses'] ?? 0;
            $profit = $revenue['revenue'] - $expenses;

            $monthlyData[] = [
                'month' => $revenue['month'],
                'revenue' => (float) $revenue['revenue'],
                'expenses' => (float) $expenses,
                'profit' => (float) $profit,
            ];
        }

        return $monthlyData;
    }

    private function calculateMetrics($monthlyRevenue, $propertyPerformance)
    {
        $totalMonthlyRevenue = collect($propertyPerformance)->sum('monthlyRevenue');
        $totalMaintenanceCosts = collect($propertyPerformance)->sum('maintenanceCosts');
        $totalNetIncome = collect($propertyPerformance)->sum('netIncome');
        $averageOccupancy = collect($propertyPerformance)->avg('occupancy');

        // Calculate revenue change from previous month
        $revenueChange = 0;
        if (count($monthlyRevenue) >= 2) {
            $current = $monthlyRevenue[count($monthlyRevenue) - 1]['revenue'];
            $previous = $monthlyRevenue[count($monthlyRevenue) - 2]['revenue'];

            if ($previous > 0) {
                $revenueChange = (($current - $previous) / $previous) * 100;
            }
        }

        return [
            'totalMonthlyRevenue' => (float) $totalMonthlyRevenue,
            'totalMaintenanceCosts' => (float) $totalMaintenanceCosts,
            'totalNetIncome' => (float) $totalNetIncome,
            'averageOccupancy' => (float) round($averageOccupancy ?: 0, 1),
            'revenueChange' => (float) round($revenueChange, 1),
        ];
    }
}
?>
