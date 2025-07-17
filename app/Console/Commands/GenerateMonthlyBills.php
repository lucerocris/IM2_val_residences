<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RentalBill;
use Carbon\Carbon;
use App\Models\Lease;
use App\Notifications\RentalBillGenerated;

class GenerateMonthlyBills extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bills:generate';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate monthly rental bills';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::now();
        $activeLeases = Lease::with(['tenant', 'units'])->where('lease_status', 'active')->get();

        $count = 0;

        foreach($activeLeases as $lease) {
            $existingBill = RentalBill::where('lease_id', $lease->id)
                ->whereMonth('billing_date', $today->month)
                ->whereYear('billing_date', $today->year)
                ->first();

            if(!$existingBill) {
                $startDate = $today->copy()->startOfMonth();
                $dueDate = $today->copy()->startOfMonth()->addDays($lease->start_date->day - 1);

                $bill = RentalBill::create([
                    'lease_id' => $lease->id,
                    'billing_date' => $startDate,
                    'rent_amount' => $lease->monthly_rent,
                    'due_date' => $dueDate,
                    'payment_status' => 'pending',
                    'amount_paid' => 0
                ]);

                if($lease->tenant) {
                    $lease->tenant->notify(new RentalBillGenerated($bill));
                }
                $count++;
            }
        }

        $this->info("Generated {$count} new bills and sent notifications");
        return Command::SUCCESS;
    }

        // $this->info("Generated {$count} new bills");
        // return Command::SUCCESS;
}

