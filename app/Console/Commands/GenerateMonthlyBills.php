<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RentalBill;
use Carbon\Carbon;
use App\Models\Lease;

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
        $activeLeases = Lease::where('lease_status', 'active')->get();

        $count = 0;

        foreach ($activeLeases as $lease) {
            $existingBill = RentalBill::where('lease_id', $lease->id)
                ->whereMonth('billing_date', $today->month)
                ->whereYear('billing_date', $today->year)
                ->first();

            if (!$existingBill) {
                RentalBill::create([
                    'lease_id' => $lease->id,
                    'billing_date' => $today->startOfMonth(),
                    'rent_amount' => $lease->monthly_rent,
                    'due_date' => $today->startOfMonth()->addDays(15),
                    'payment_status' => 'pending',
                    'amount_paid' => 0,
                ]);

                $count++;
            }
        }

        $this->info("Generated {$count} new bills");
        return Command::SUCCESS;
    }
}
